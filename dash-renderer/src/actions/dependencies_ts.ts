import {
    all,
    assoc,
    concat,
    difference,
    filter,
    flatten,
    forEach,
    isEmpty,
    isNil,
    keys,
    map,
    mergeWith,
    partition,
    pickBy,
    props,
    reduce,
    zipObj
} from 'ramda';
import { ICallback, ICallbackProperty, ICallbackDefinition, ILayoutCallbackProperty, ICallbackTemplate } from '../types/callbacks';
import { addAllResolvedFromOutputs, splitIdAndProp, stringifyId, getUnfilteredLayoutCallbacks, isMultiValued, idMatch } from './dependencies';
import { getPath } from './paths';

export const DIRECT = 2;
export const INDIRECT = 1;
export const mergeMax = mergeWith(Math.max);

export const combineIdAndProp = ({
    id,
    property
}: ICallbackProperty) => `${stringifyId(id)}.${property}`;

export function getCallbacksByInput(
    graphs: any,
    paths: any,
    id: any,
    prop: any,
    changeType?: any,
    withPriority: boolean = true
): ICallback[] {
    const matches: ICallback[] = [];
    const idAndProp = combineIdAndProp({ id, property: prop });

    if (typeof id === 'string') {
        // standard id version
        const callbacks = (graphs.inputMap[id] || {})[prop];
        if (!callbacks) {
            return [];
        }

        callbacks.forEach(
            addAllResolvedFromOutputs(resolveDeps(), paths, matches)
        );
    } else {
        // wildcard version
        const _keys = Object.keys(id).sort();
        const vals = props(_keys, id);
        const keyStr = _keys.join(',');
        const patterns: any[] = (graphs.inputPatterns[keyStr] || {})[prop];
        if (!patterns) {
            return [];
        }
        patterns.forEach(pattern => {
            if (idMatch(_keys, vals, pattern.values)) {
                pattern.callbacks.forEach(
                    addAllResolvedFromOutputs(
                        resolveDeps(_keys, vals, pattern.values),
                        paths,
                        matches
                    )
                );
            }
        });
    }
    matches.forEach(match => {
        match.changedPropIds[idAndProp] = changeType || DIRECT;
        if (withPriority) {
            match.priority = getPriority(graphs, paths, match)
        }
    });
    return matches;
}

/*
 * Builds a tree of all callbacks that can be triggered by the provided callback.
 * Uses the number of callbacks at each tree depth and the total depth of the tree
 * to create a sortable priority hash.
 */
export function getPriority(graphs: any, paths: any, callback: ICallback): string {
    let callbacks: ICallback[] = [callback];
    let touchedOutputs: { [key: string]: boolean } = {};
    let priority: number[] = [];

    while (callbacks.length) {
        const outputs = filter(
            o => !touchedOutputs[combineIdAndProp(o)],
            flatten(map(
                cb => flatten(cb.getOutputs(paths)),
                callbacks
            ))
        );

        touchedOutputs = reduce(
            (touched, o) => assoc(combineIdAndProp(o), true, touched),
            touchedOutputs,
            outputs
        );

        callbacks = flatten(map(
            ({ id, property }: any) => getCallbacksByInput(
                graphs,
                paths,
                id,
                property,
                INDIRECT,
                false
            ),
            outputs
        ));

        if (callbacks.length) {
            priority.push(callbacks.length);
        }
    }

    priority.unshift(priority.length);

    return map(i => Math.min(i, 35).toString(36), priority).join('');
}

export const getReadyCallbacks = (
    paths: any,
    candidates: ICallback[],
    callbacks: ICallback[] = candidates
): ICallback[] => {
    if (!candidates.length) {
        return [];
    }

    const outputs = flatten(map(cb => cb.getOutputs(paths), callbacks));

    const [
        resolvedStandardOutputs,
        resolvedMutationOutputs
    ] = map(map(combineIdAndProp), partition(output => isNil(output.mutation), outputs));

    // Make a map of all the standard outputs (to be used against mutation outputs)
    const standardOutputsMap: { [key: string]: boolean } = {};
    forEach(output => standardOutputsMap[output] = true, resolvedStandardOutputs);

    // Make a map of all the outputs (standard+mutation) (to be used against inputs)
    const outputsMap: { [key: string]: boolean } = { ...standardOutputsMap };
    forEach(output => outputsMap[output] = true, resolvedMutationOutputs);

    // Find `requested` callbacks that do not have:
    // 1. an input depending on a listed output
    // 2. a mutation output depending on a listed standard output
    return filter(
        cb => all(
            // no input is in the outputs (both standard and mutation)
            cbp => !outputsMap[cbp],
            map<ILayoutCallbackProperty, string>(combineIdAndProp, flatten(cb.getInputs(paths)))
        ) && all(
            // no mutation output is also in the standard outputs
            cbp => !standardOutputsMap[cbp],
            map<ILayoutCallbackProperty, string>(combineIdAndProp, filter(output => !isNil(output.mutation), flatten(cb.getOutputs(paths))))
        ),
        candidates
    );
}

export const getLayoutCallbacks = (
    graphs: any,
    paths: any,
    layout: any,
    options: any
): ICallback[] => {
    let exclusions: string[] = [];
    let callbacks = getUnfilteredLayoutCallbacks(
        graphs,
        paths,
        layout,
        options
    );

    /*
        Remove from the initial callbacks those that are left with only excluded inputs.

        Exclusion of inputs happens when:
        - an input is missing
        - an input in the initial callback chain depends only on excluded inputs

        Further exclusion might happen after callbacks return with:
        - PreventUpdate
        - no_update
    */
    while (true) {
        // Find callbacks for which all inputs are missing or in the exclusions
        const [included, excluded] = partition(({
            callback: { inputs },
            getInputs
        }) => all(isMultiValued, inputs) ||
            !isEmpty(difference(
                map(combineIdAndProp, flatten(getInputs(paths))),
                exclusions
            )),
            callbacks
        );

        // If there's no additional exclusions, break loop - callbacks have been cleaned
        if (!excluded.length) {
            break;
        }

        callbacks = included;

        // update exclusions with all additional excluded outputs
        exclusions = concat(
            exclusions,
            map(combineIdAndProp, flatten(map(
                ({ getOutputs }) => getOutputs(paths),
                excluded
            )))
        );
    }

    /*
        Return all callbacks with an `executionGroup` to allow group-processing
    */
    const executionGroup = Math.random().toString(16);
    return map(cb => ({
        ...cb,
        executionGroup
    }), callbacks);
}

export const getUniqueIdentifier = ({
    anyVals,
    callback: {
        inputs,
        output,
        outputs,
        state
    }
}: ICallback): string => [
    output,
    ...map(combineIdAndProp, [
        ...inputs,
        ...outputs,
        ...state
    ]),
    ...(Array.isArray(anyVals) ?
        anyVals :
        anyVals === '' ? [] : [anyVals]
    )
].join(',');

export function includeObservers(id: any, properties: any, graphs: any, paths: any): ICallback[] {
    return flatten(map(
        propName => getCallbacksByInput(graphs, paths, id, propName),
        keys(properties)
    ));
}

/*
 * Create a pending callback object. Includes the original callback definition,
 * its resolved ID (including the value of all MATCH wildcards),
 * accessors to find all inputs, outputs, and state involved in this
 * callback (lazy as not all users will want all of these).
 */
export const makeResolvedCallback = (
    callback: ICallbackDefinition,
    resolve: (_: any) => (_: ICallbackProperty) => ILayoutCallbackProperty[],
    anyVals: any[] | string
): ICallbackTemplate => ({
    callback,
    anyVals,
    resolvedId: callback.output + anyVals,
    getOutputs: paths => callback.outputs.map(resolve(paths)),
    getInputs: paths => callback.inputs.map(resolve(paths)),
    getState: paths => callback.state.map(resolve(paths)),
    changedPropIds: {},
    initialCall: false
});

export function pruneCallbacks<T extends ICallback>(callbacks: T[], paths: any): {
    added: T[],
    removed: T[]
} {
    const [, removed] = partition(
        ({ getOutputs, callback: { outputs } }) => flatten(getOutputs(paths)).length === outputs.length,
        callbacks
    );

    const [, modified] = partition(
        ({ getOutputs }) => !flatten(getOutputs(paths)).length,
        removed
    );

    const added = map(
        cb => assoc('changedPropIds', pickBy(
            (_, propId) => getPath(paths, splitIdAndProp(propId).id),
            cb.changedPropIds
        ), cb),
        modified
    );

    return {
        added,
        removed
    };
}

export function resolveDeps(refKeys?: any, refVals?: any, refPatternVals?: string) {
    return (paths: any) => ({ id: idPattern, mutation, property }: ICallbackProperty) => {
        if (typeof idPattern === 'string') {
            const path = getPath(paths, idPattern);
            return path ? [{ id: idPattern, mutation, property, path }] : [];
        }
        const _keys = Object.keys(idPattern).sort();
        const patternVals = props(_keys, idPattern);
        const keyStr = _keys.join(',');
        const keyPaths = paths.objs[keyStr];
        if (!keyPaths) {
            return [];
        }
        const result: ILayoutCallbackProperty[] = [];
        keyPaths.forEach(({ values: vals, path }: any) => {
            if (
                idMatch(
                    _keys,
                    vals,
                    patternVals,
                    refKeys,
                    refVals,
                    refPatternVals
                )
            ) {
                result.push({ id: zipObj(_keys, vals), mutation, property, path });
            }
        });
        return result;
    };
}