window.dash_generator_test_component_persisted=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=window.PropTypes},function(e,t){e.exports=window.React},function(e,t,n){"use strict";var r=n(3);e.exports=function(e){var t=typeof e;if("string"===t){var n=e;if(0===(e=+e)&&r(n))return!1}else if("number"!==t)return!1;return e-e<1}},function(e,t,n){"use strict";e.exports=function(e){for(var t,n=e.length,r=0;r<n;r++)if(((t=e.charCodeAt(r))<9||t>13)&&32!==t&&133!==t&&160!==t&&5760!==t&&6158!==t&&(t<8192||t>8205)&&8232!==t&&8233!==t&&8239!==t&&8287!==t&&8288!==t&&12288!==t&&65279!==t)return!1;return!0}},function(e,t,n){"use strict";function r(e){return null!=e&&"object"==typeof e&&!0===e["@@functional/placeholder"]}function o(e){return function t(n){return 0===arguments.length||r(n)?t:e.apply(this,arguments)}}n.r(t),n.d(t,"MyPersistedComponent",(function(){return S}));var a=o((function(e){return null==e}));function u(e){return function t(n,a){switch(arguments.length){case 0:return t;case 1:return r(n)?t:o((function(t){return e(n,t)}));default:return r(n)&&r(a)?t:r(n)?o((function(t){return e(t,a)})):r(a)?o((function(t){return e(n,t)})):e(n,a)}}}var i=u((function(e,t){for(var n={},r={},o=0,a=e.length;o<a;)r[e[o]]=1,o+=1;for(var u in t)r.hasOwnProperty(u)||(n[u]=t[u]);return n})),s=n(1),p=n.n(s),l=n(0),c=n.n(l),f=n(2),y=n.n(f);function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function v(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?g(e):t}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var P=function(e){return y()(e)?+e:NaN},w=function(e,t){return e===t||isNaN(e)&&isNaN(t)},S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(s,e);var t,n,r,o,u=(t=s,function(){var e,n=_(t);if(O()){var r=_(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return v(this,e)});function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=u.call(this,e)).input=p.a.createRef(),t.onChange=t.onChange.bind(g(t)),t.onEvent=t.onEvent.bind(g(t)),t.onKeyPress=t.onKeyPress.bind(g(t)),t.setInputValue=t.setInputValue.bind(g(t)),t.setPropValue=t.setPropValue.bind(g(t)),t}return n=s,(r=[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.input.current.value,n=P(t);this.setInputValue(a(n)?t:n,e.value),"number"!==this.props.type&&this.setState({value:e.value})}},{key:"componentDidMount",value:function(){var e=this.input.current.value,t=P(e);this.setInputValue(a(t)?e:t,this.props.value)}},{key:"UNSAFE_componentWillMount",value:function(){"number"!==this.props.type&&this.setState({value:this.props.value})}},{key:"render",value:function(){var e="number"===this.props.type?{}:{value:this.state.value},t=this.props.loading_state;return p.a.createElement("input",h({"data-dash-is-loading":t&&t.is_loading||void 0,ref:this.input,onChange:this.onChange,onKeyPress:this.onKeyPress},e,i(["debounce","value","n_submit","n_submit_timestamp","selectionDirection","selectionEnd","selectionStart","setProps","loading_state"],this.props)))}},{key:"setInputValue",value:function(e,t){var n=t;e=this.input.current.checkValidity()?P(e):NaN,t=P(t),w(e,t)||(this.input.current.value=y()(t)?t:n)}},{key:"setPropValue",value:function(e,t){e=P(e),t=this.input.current.checkValidity()?P(t):NaN,w(e,t)||this.props.setProps({value:t})}},{key:"onEvent",value:function(){var e=this.input.current.value,t=P(e);"number"===this.props.type?this.setPropValue(this.props.value,a(t)?e:t):this.props.setProps({value:e})}},{key:"onKeyPress",value:function(e){return"Enter"===e.key&&(this.props.setProps({n_submit:this.props.n_submit+1,n_submit_timestamp:Date.now()}),this.input.current.checkValidity()),this.props.debounce&&"Enter"===e.key&&this.onEvent()}},{key:"onChange",value:function(){this.props.debounce?"number"!==this.props.type&&this.setState({value:this.input.current.value}):this.onEvent()}}])&&d(n.prototype,r),o&&d(n,o),s}(s.PureComponent);S.defaultProps={type:"text",n_submit:0,n_submit_timestamp:-1,debounce:!1,step:"any",persisted_props:["value"],persistence_type:"local"},S.propTypes={id:c.a.string,value:c.a.oneOfType([c.a.string,c.a.number]),style:c.a.object,className:c.a.string,debounce:c.a.bool,type:c.a.oneOf(["text","number","password","email","range","search","tel","url","hidden"]),autoComplete:c.a.string,autoFocus:c.a.oneOfType([c.a.oneOf(["autoFocus","autofocus","AUTOFOCUS"]),c.a.bool]),disabled:c.a.oneOfType([c.a.oneOf(["disabled","DISABLED"]),c.a.bool]),inputMode:c.a.oneOf(["verbatim","latin","latin-name","latin-prose","full-width-latin","kana","katakana","numeric","tel","email","url"]),list:c.a.string,max:c.a.oneOfType([c.a.string,c.a.number]),maxLength:c.a.oneOfType([c.a.string,c.a.number]),min:c.a.oneOfType([c.a.string,c.a.number]),minLength:c.a.oneOfType([c.a.string,c.a.number]),multiple:c.a.bool,name:c.a.string,pattern:c.a.string,placeholder:c.a.oneOfType([c.a.string,c.a.number]),readOnly:c.a.oneOfType([c.a.bool,c.a.oneOf(["readOnly","readonly","READONLY"])]),required:c.a.oneOfType([c.a.oneOf(["required","REQUIRED"]),c.a.bool]),selectionDirection:c.a.string,selectionEnd:c.a.string,selectionStart:c.a.string,size:c.a.string,spellCheck:c.a.oneOfType([c.a.oneOf(["true","false"]),c.a.bool]),step:c.a.oneOfType([c.a.string,c.a.number]),n_submit:c.a.number,n_submit_timestamp:c.a.number,setProps:c.a.func,loading_state:c.a.shape({is_loading:c.a.bool,prop_name:c.a.string,component_name:c.a.string}),persistence:c.a.oneOfType([c.a.bool,c.a.string,c.a.number]),persisted_props:c.a.arrayOf(c.a.oneOf(["value"])),persistence_type:c.a.oneOf(["local","session","memory"])},S.persistenceTransforms={value:{extract:function(e){return null!=e?e.toUpperCase():e},apply:function(e){return e}}}}]);