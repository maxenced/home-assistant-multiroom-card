function t(t,e,n,s){var i,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(o=(r<3?i(o):r>3?i(e,n,o):i(e,n))||o);return r>3&&o&&Object.defineProperty(e,n,o),o}const e=new WeakMap,n=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,n=null)=>{for(;e!==n;){const n=e.nextSibling;t.removeChild(e),e=n}},r={},o={},a=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${c}`),h="$lit$";class d{constructor(t,e){this.parts=[],this.element=e;const n=[],s=[],i=document.createTreeWalker(e.content,133,null,!1);let r=0,o=-1,c=0;const{strings:d,values:{length:p}}=t;for(;c<p;){const t=i.nextNode();if(null!==t){if(o++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:n}=e;let s=0;for(let t=0;t<n;t++)u(e[t].name,h)&&s++;for(;s-- >0;){const e=d[c],n=f.exec(e)[2],s=n.toLowerCase()+h,i=t.getAttribute(s);t.removeAttribute(s);const r=i.split(l);this.parts.push({type:"attribute",index:o,name:n,strings:r}),c+=r.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),i.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const s=t.parentNode,i=e.split(l),r=i.length-1;for(let e=0;e<r;e++){let n,r=i[e];if(""===r)n=m();else{const t=f.exec(r);null!==t&&u(t[2],h)&&(r=r.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),n=document.createTextNode(r)}s.insertBefore(n,t),this.parts.push({type:"node",index:++o})}""===i[r]?(s.insertBefore(m(),t),n.push(t)):t.data=i[r],c+=r}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&o!==r||(o++,e.insertBefore(m(),t)),r=o,this.parts.push({type:"node",index:o}),null===t.nextSibling?t.data="":(n.push(t),o--),c++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),c++}}else i.currentNode=s.pop()}for(const t of n)t.parentNode.removeChild(t)}}const u=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},p=t=>-1!==t.index,m=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class g{constructor(t,e,n){this.__parts=[],this.template=t,this.processor=e,this.options=n}update(t){let e=0;for(const n of this.__parts)void 0!==n&&n.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],n=this.template.parts,i=document.createTreeWalker(t,133,null,!1);let r,o=0,a=0,c=i.nextNode();for(;o<n.length;)if(r=n[o],p(r)){for(;a<r.index;)a++,"TEMPLATE"===c.nodeName&&(e.push(c),i.currentNode=c.content),null===(c=i.nextNode())&&(i.currentNode=e.pop(),c=i.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(c.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(c,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class y{constructor(t,e,n,s){this.strings=t,this.values=e,this.type=n,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",n=!1;for(let s=0;s<t;s++){const t=this.strings[s],i=t.lastIndexOf("\x3c!--");n=(i>-1||n)&&-1===t.indexOf("--\x3e",i+1);const r=f.exec(t);e+=null===r?t+(n?a:c):t.substr(0,r.index)+r[1]+r[2]+h+r[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const _=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,e,n){this.dirty=!0,this.element=t,this.name=e,this.strings=n,this.parts=[];for(let t=0;t<n.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new w(this)}_getValue(){const t=this.strings,e=t.length-1;let n="";for(let s=0;s<e;s++){n+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(_(t)||!v(t))n+="string"==typeof t?t:String(t);else for(const e of t)n+="string"==typeof e?e:String(e)}}return n+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===r||_(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=r,t(this)}this.value!==r&&this.committer.commit()}}class b{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(m()),this.endNode=t.appendChild(m())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=m()),t.__insert(this.endNode=m())}insertAfterPart(t){t.__insert(this.startNode=m()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}const t=this.__pendingValue;t!==r&&(_(t)?t!==this.value&&this.__commitText(t):t instanceof y?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===o?(this.value=o,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this.__commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof g&&this.value.template===e)this.value.update(t.values);else{const n=new g(e,t.processor,this.options),s=n._clone();n.update(t.values),this.__commitNode(s),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let n,s=0;for(const i of t)void 0===(n=e[s])&&(n=new b(this.options),e.push(n),0===s?n.appendIntoPart(this):n.insertAfterPart(e[s-1])),n.setValue(i),n.commit(),s++;s<e.length&&(e.length=s,this.clear(n&&n.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class P{constructor(t,e,n){if(this.value=void 0,this.__pendingValue=void 0,2!==n.length||""!==n[0]||""!==n[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=n}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=r}}class x extends S{constructor(t,e,n){super(t,e,n),this.single=2===n.length&&""===n[0]&&""===n[1]}_createPart(){return new E(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class E extends w{}let C=!1;try{const t={get capture(){return C=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class N{constructor(t,e,n){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=n,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;n(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=r,t(this)}if(this.__pendingValue===r)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=M(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=r}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const M=t=>t&&(C?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const T=new class{handleAttributeExpressions(t,e,n,s){const i=e[0];return"."===i?new x(t,e.slice(1),n).parts:"@"===i?[new N(t,e.slice(1),s.eventContext)]:"?"===i?[new P(t,e.slice(1),n)]:new S(t,e,n).parts}handleTextExpression(t){return new b(t)}};function k(t){let e=A.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},A.set(t.type,e));let n=e.stringsArray.get(t.strings);if(void 0!==n)return n;const s=t.strings.join(a);return void 0===(n=e.keyString.get(s))&&(n=new d(t,t.getTemplateElement()),e.keyString.set(s,n)),e.stringsArray.set(t.strings,n),n}const A=new Map,D=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const O=(t,...e)=>new y(t,e,"html",T),V=133;function Y(t,e){const{element:{content:n},parts:s}=t,i=document.createTreeWalker(n,V,null,!1);let r=H(s),o=s[r],a=-1,c=0;const l=[];let h=null;for(;i.nextNode();){a++;const t=i.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&c++;void 0!==o&&o.index===a;)o.index=null!==h?-1:o.index-c,o=s[r=H(s,r)]}l.forEach(t=>t.parentNode.removeChild(t))}const R=t=>{let e=11===t.nodeType?0:1;const n=document.createTreeWalker(t,V,null,!1);for(;n.nextNode();)e++;return e},H=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const e=t[n];if(p(e))return n}return-1};const $=(t,e)=>`${t}--${e}`;let U=!0;void 0===window.ShadyCSS?U=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),U=!1);const L=t=>e=>{const n=$(e.type,t);let s=A.get(n);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},A.set(n,s));let i=s.stringsArray.get(e.strings);if(void 0!==i)return i;const r=e.strings.join(a);if(void 0===(i=s.keyString.get(r))){const n=e.getTemplateElement();U&&window.ShadyCSS.prepareTemplateDom(n,t),i=new d(e,n),s.keyString.set(r,i)}return s.stringsArray.set(e.strings,i),i},j=["html","svg"],z=new Set,F=(t,e,n)=>{z.add(n);const s=t.querySelectorAll("style"),{length:i}=s;if(0===i)return void window.ShadyCSS.prepareTemplateStyles(e.element,n);const r=document.createElement("style");for(let t=0;t<i;t++){const e=s[t];e.parentNode.removeChild(e),r.textContent+=e.textContent}(t=>{j.forEach(e=>{const n=A.get($(e,t));void 0!==n&&n.keyString.forEach(t=>{const{element:{content:e}}=t,n=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{n.add(t)}),Y(t,n)})})})(n);const o=e.element.content;!function(t,e,n=null){const{element:{content:s},parts:i}=t;if(null==n)return void s.appendChild(e);const r=document.createTreeWalker(s,V,null,!1);let o=H(i),a=0,c=-1;for(;r.nextNode();)for(c++,r.currentNode===n&&(a=R(e),n.parentNode.insertBefore(e,n));-1!==o&&i[o].index===c;){if(a>0){for(;-1!==o;)i[o].index+=a,o=H(i,o);return}o=H(i,o)}}(e,r,o.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,n);const a=o.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)t.insertBefore(a.cloneNode(!0),t.firstChild);else{o.insertBefore(r,o.firstChild);const t=new Set;t.add(r),Y(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const I={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},q=(t,e)=>e!==t&&(e==e||t==t),B={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:q},J=Promise.resolve(!0),W=1,Z=4,X=8,G=16,K=32;class Q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=J,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,n)=>{const s=this._attributeNameForProperty(n,e);void 0!==s&&(this._attributeToPropertyMap.set(s,n),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=B){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const n="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[n]},set(e){const s=this[t];this[n]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const n of e)this.createProperty(n,t[n])}}static _attributeNameForProperty(t,e){const n=e.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,n=q){return n(t,e)}static _propertyValueFromAttribute(t,e){const n=e.type,s=e.converter||I,i="function"==typeof s?s:s.fromAttribute;return i?i(t,n):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const n=e.type,s=e.converter;return(s&&s.toAttribute||I.toAttribute)(t,n)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|K,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,n){e!==n&&this._attributeToProperty(t,n)}_propertyToAttribute(t,e,n=B){const s=this.constructor,i=s._attributeNameForProperty(t,n);if(void 0!==i){const t=s._propertyValueToAttribute(e,n);if(void 0===t)return;this._updateState=this._updateState|X,null==t?this.removeAttribute(i):this.setAttribute(i,t),this._updateState=this._updateState&~X}}_attributeToProperty(t,e){if(this._updateState&X)return;const n=this.constructor,s=n._attributeToPropertyMap.get(t);if(void 0!==s){const t=n._classProperties.get(s)||B;this._updateState=this._updateState|G,this[s]=n._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~G}}_requestUpdate(t,e){let n=!0;if(void 0!==t){const s=this.constructor,i=s._classProperties.get(t)||B;s._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||this._updateState&G||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):n=!1}!this._hasRequestedUpdate&&n&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|Z;const n=this._updatePromise;this._updatePromise=new Promise((n,s)=>{t=n,e=s});try{await n}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&K}get _hasRequestedUpdate(){return this._updateState&Z}get hasUpdated(){return this._updateState&W}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&W||(this._updateState=this._updateState|W,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Z}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}Q.finalized=!0;const tt=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(n){n.createProperty(e.key,t)}}:Object.assign({},e,{finisher(n){n.createProperty(e.key,t)}}),et=(t,e,n)=>{e.constructor.createProperty(n,t)};function nt(t){return(e,n)=>void 0!==n?et(t,e,n):tt(t,e)}const st="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol();class rt{constructor(t,e){if(e!==it)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(st?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ot=(t,...e)=>{const n=e.reduce((e,n,s)=>e+(t=>{if(t instanceof rt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(n)+t[s+1],t[0]);return new rt(n,it)};(window.litElementVersions||(window.litElementVersions=[])).push("2.2.0");const at=t=>t.flat?t.flat(1/0):function t(e,n=[]){for(let s=0,i=e.length;s<i;s++){const i=e[s];Array.isArray(i)?t(i,n):n.push(i)}return n}(t);class ct extends Q{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){at(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?st?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof y&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}ct.finalized=!0,ct.render=((t,e,n)=>{const s=n.scopeName,r=D.has(e),o=U&&11===e.nodeType&&!!e.host&&t instanceof y,a=o&&!z.has(s),c=a?document.createDocumentFragment():e;if(((t,e,n)=>{let s=D.get(e);void 0===s&&(i(e,e.firstChild),D.set(e,s=new b(Object.assign({templateFactory:k},n))),s.appendInto(e)),s.setValue(t),s.commit()})(t,c,Object.assign({templateFactory:L(s)},n)),a){const t=D.get(c);D.delete(c),t.value instanceof g&&F(c,t.value.template,s),i(e,e.firstChild),e.appendChild(c),D.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)});var lt={},ht=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,dt="[^\\s]+",ut=/\[([^]*?)\]/gm,pt=function(){};function mt(t,e){for(var n=[],s=0,i=t.length;s<i;s++)n.push(t[s].substr(0,e));return n}function ft(t){return function(e,n,s){var i=s[t].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~i&&(e.month=i)}}function gt(t,e){for(t=String(t),e=e||2;t.length<e;)t="0"+t;return t}var yt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_t=["January","February","March","April","May","June","July","August","September","October","November","December"],vt=mt(_t,3),St=mt(yt,3);lt.i18n={dayNamesShort:St,dayNames:yt,monthNamesShort:vt,monthNames:_t,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10)*t%10]}};var wt={D:function(t){return t.getDate()},DD:function(t){return gt(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return t.getDay()},dd:function(t){return gt(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return t.getMonth()+1},MM:function(t){return gt(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return gt(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return gt(t.getFullYear(),4)},h:function(t){return t.getHours()%12||12},hh:function(t){return gt(t.getHours()%12||12)},H:function(t){return t.getHours()},HH:function(t){return gt(t.getHours())},m:function(t){return t.getMinutes()},mm:function(t){return gt(t.getMinutes())},s:function(t){return t.getSeconds()},ss:function(t){return gt(t.getSeconds())},S:function(t){return Math.round(t.getMilliseconds()/100)},SS:function(t){return gt(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return gt(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+gt(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)}},bt={D:["\\d\\d?",function(t,e){t.day=e}],Do:["\\d\\d?"+dt,function(t,e){t.day=parseInt(e,10)}],M:["\\d\\d?",function(t,e){t.month=e-1}],YY:["\\d\\d?",function(t,e){var n=+(""+(new Date).getFullYear()).substr(0,2);t.year=""+(e>68?n-1:n)+e}],h:["\\d\\d?",function(t,e){t.hour=e}],m:["\\d\\d?",function(t,e){t.minute=e}],s:["\\d\\d?",function(t,e){t.second=e}],YYYY:["\\d{4}",function(t,e){t.year=e}],S:["\\d",function(t,e){t.millisecond=100*e}],SS:["\\d{2}",function(t,e){t.millisecond=10*e}],SSS:["\\d{3}",function(t,e){t.millisecond=e}],d:["\\d\\d?",pt],ddd:[dt,pt],MMM:[dt,ft("monthNamesShort")],MMMM:[dt,ft("monthNames")],a:[dt,function(t,e,n){var s=e.toLowerCase();s===n.amPm[0]?t.isPm=!1:s===n.amPm[1]&&(t.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(t,e){var n,s=(e+"").match(/([+-]|\d\d)/gi);s&&(n=60*s[1]+parseInt(s[2],10),t.timezoneOffset="+"===s[0]?n:-n)}]};bt.dd=bt.d,bt.dddd=bt.ddd,bt.DD=bt.D,bt.mm=bt.m,bt.hh=bt.H=bt.HH=bt.h,bt.MM=bt.M,bt.ss=bt.s,bt.A=bt.a,lt.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},lt.format=function(t,e,n){var s=n||lt.i18n;if("number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date in fecha.format");e=lt.masks[e]||e||lt.masks.default;var i=[];return(e=(e=e.replace(ut,function(t,e){return i.push(e),"@@@"})).replace(ht,function(e){return e in wt?wt[e](t,s):e.slice(1,e.length-1)})).replace(/@@@/g,function(){return i.shift()})},lt.parse=function(t,e,n){var s=n||lt.i18n;if("string"!=typeof e)throw new Error("Invalid format in fecha.parse");if(e=lt.masks[e]||e,t.length>1e3)return null;var i={},r=[],o=[];e=e.replace(ut,function(t,e){return o.push(e),"@@@"});var a,c=(a=e,a.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(ht,function(t){if(bt[t]){var e=bt[t];return r.push(e[1]),"("+e[0]+")"}return t});c=c.replace(/@@@/g,function(){return o.shift()});var l=t.match(new RegExp(c,"i"));if(!l)return null;for(var h=1;h<l.length;h++)r[h-1](i,l[h],s);var d,u=new Date;return!0===i.isPm&&null!=i.hour&&12!=+i.hour?i.hour=+i.hour+12:!1===i.isPm&&12==+i.hour&&(i.hour=0),null!=i.timezoneOffset?(i.minute=+(i.minute||0)-+i.timezoneOffset,d=new Date(Date.UTC(i.year||u.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0))):d=new Date(i.year||u.getFullYear(),i.month||0,i.day||1,i.hour||0,i.minute||0,i.second||0,i.millisecond||0),d};(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}})(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var Pt=["closed","locked","off"],xt=function(t,e,n,s){s=s||{},n=null==n?{}:n;var i=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return i.detail=n,t.dispatchEvent(i),i},Et=function(t,e){xt(t,"haptic",e)},Ct=function(t,e,n,s,i){var r;switch(i&&n.dbltap_action?r=n.dbltap_action:s&&n.hold_action?r=n.hold_action:!s&&n.tap_action&&(r=n.tap_action),r||(r={action:"more-info"}),r.action){case"more-info":(n.entity||n.camera_image)&&(xt(t,"hass-more-info",{entityId:r.entity?r.entity:n.entity?n.entity:n.camera_image}),r.haptic&&Et(t,r.haptic));break;case"navigate":r.navigation_path&&(function(t,e,n){void 0===n&&(n=!1),n?history.replaceState(null,"",e):history.pushState(null,"",e),xt(window,"location-changed",{replace:n})}(0,r.navigation_path),r.haptic&&Et(t,r.haptic));break;case"url":r.url&&window.open(r.url),r.haptic&&Et(t,r.haptic);break;case"toggle":n.entity&&(function(t,e){(function(t,e,n){void 0===n&&(n=!0);var s,i=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===i?"homeassistant":i;switch(i){case"lock":s=n?"unlock":"lock";break;case"cover":s=n?"open_cover":"close_cover";break;default:s=n?"turn_on":"turn_off"}t.callService(r,s,{entity_id:e})})(t,e,Pt.includes(t.states[e].state))}(e,n.entity),r.haptic&&Et(t,r.haptic));break;case"call-service":if(!r.service)return;var o=r.service.split(".",2),a=o[0],c=o[1],l=Object.assign({},r.service_data);"entity"===l.entity_id&&(l.entity_id=n.entity),e.callService(a,c,l),r.haptic&&Et(t,r.haptic)}};String(Math.random()).slice(2);try{const t={get capture(){return!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");var Nt="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,Mt=function(t){function e(){t.call(this),this.holdTime=500,this.ripple=document.createElement("paper-ripple"),this.timer=void 0,this.held=!1,this.cooldownStart=!1,this.cooldownEnd=!1,this.nbClicks=0}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.connectedCallback=function(){var t=this;Object.assign(this.style,{borderRadius:"50%",position:"absolute",width:Nt?"100px":"50px",height:Nt?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none"}),this.appendChild(this.ripple),this.ripple.style.color="#03a9f4",this.ripple.style.color="var(--primary-color)",["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(function(e){document.addEventListener(e,function(){clearTimeout(t.timer),t.stopAnimation(),t.timer=void 0},{passive:!0})})},e.prototype.bind=function(t){var e=this;if(!t.longPress){t.longPress=!0,t.addEventListener("contextmenu",function(t){var e=t||window.event;return e.preventDefault&&e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0,e.returnValue=!1,!1});var n=function(n){var s,i;e.cooldownStart||(e.held=!1,n.touches?(s=n.touches[0].pageX,i=n.touches[0].pageY):(s=n.pageX,i=n.pageY),e.timer=window.setTimeout(function(){e.startAnimation(s,i),e.held=!0,t.repeat&&!t.isRepeating&&(t.isRepeating=!0,e.repeatTimeout=setInterval(function(){t.dispatchEvent(new Event("ha-hold"))},t.repeat))},e.holdTime),e.cooldownStart=!0,window.setTimeout(function(){return e.cooldownStart=!1},100))},s=function(n){e.cooldownEnd||["touchend","touchcancel"].includes(n.type)&&void 0===e.timer?t.isRepeating&&e.repeatTimeout&&(clearInterval(e.repeatTimeout),t.isRepeating=!1):(clearTimeout(e.timer),t.isRepeating&&e.repeatTimeout&&clearInterval(e.repeatTimeout),t.isRepeating=!1,e.stopAnimation(),e.timer=void 0,e.held?t.repeat||t.dispatchEvent(new Event("ha-hold")):t.hasDblClick?0===e.nbClicks?(e.nbClicks+=1,e.dblClickTimeout=window.setTimeout(function(){1===e.nbClicks&&(e.nbClicks=0,t.dispatchEvent(new Event("ha-click")))},250)):(e.nbClicks=0,clearTimeout(e.dblClickTimeout),t.dispatchEvent(new Event("ha-dblclick"))):t.dispatchEvent(new Event("ha-click")),e.cooldownEnd=!0,window.setTimeout(function(){return e.cooldownEnd=!1},100))};t.addEventListener("touchstart",n,{passive:!0}),t.addEventListener("touchend",s),t.addEventListener("touchcancel",s),t.addEventListener("mousedown",n,{passive:!0}),t.addEventListener("click",s)}},e.prototype.startAnimation=function(t,e){Object.assign(this.style,{left:t+"px",top:e+"px",display:null}),this.ripple.holdDown=!0,this.ripple.simulatedRipple()},e.prototype.stopAnimation=function(){this.ripple.holdDown=!1,this.style.display="none"},e}(HTMLElement);customElements.get("long-press-custom-card-helpers")||customElements.define("long-press-custom-card-helpers",Mt);let Tt=class extends ct{setConfig(t){if(!t||t.show_error)throw new Error("Invalid configuration");if(!t.entities)throw new Error("Please define at least one entity");this.config=t,this.config.tap_action=t.tap_action||{action:"toggle"}}shouldUpdate(t){if(t.has("config"))return!0;console.log("Check if some entity changed");const e=t.get("hass");return!!(e&&this.config&&this.config.entities)&&this.config.entities.find(t=>(console.log(`Entity ${JSON.stringify(t)} state is ${this.hass.states[t.entity]}, old was ${JSON.stringify(e.states)}`),e.states[t.entity]!==this.hass.states[t.entity]))}renderEntity(t){if(!this.config||!this.hass)return O``;const e=this.hass.states[t];return e?O`
      <div
        class="entity"
        .entityConf="${t}"
        @click="${this._handleTap}"
      >
        ${O`
              <state-badge
                .stateObj="${e}"
                overrideIcon="mdi:speaker"
              ></state-badge>
            `}
      </div>
    `:O`
       <hui-warning-element
         label=${this.hass.localize("ui.panel.lovelace.warning.entity_not_found","entity",t.entity)}
       ></hui-warning-element>
     `}render(){if(!this.config||!this.hass)return O``;const t={},e=[];this.config.entities.forEach(n=>{if(!this||!this.hass)return!1;if(this.hass.states[n].attributes&&this.hass.states[n].attributes.friendly_name){const s=this.hass.states[n].attributes.friendly_name.split("|");s[1]in t||(t[s[1]]={}),t[s[1]][s[2]]=n,e.includes(s[2])||e.push(s[2])}return!0}),e.sort();const n=[];Object.keys(t).forEach(s=>{const i=[];i.push(O`<td class="room">${s}</td>`),e.forEach(e=>{e in t[s]?i.push(O`<td class="entity">${this.renderEntity(t[s][e])}</td>`):i.push(O`<td></td>`)}),n.push(O`<tr>${i}</tr>`)});const s=[];return e.forEach(t=>{this.config&&this.config.sources&&t in this.config.sources&&"icon"in this.config.sources[t]?s.push(O`<th><ha-icon icon="${this.config.sources[t].icon}" style="${this.config.sources[t].style}"/></th>`):s.push(O`<th>${t}</th>`)}),O`
      <ha-card header="Multiroom">
        ${e.length>0?O`
                <div class="forecast clear">
    <table>
      <thead>
        <tr>
          <th></th>
                  ${s}
        </tr>
           </thead>
                  ${O`<tbody>${n}</tbody>`}
    </tbody>
          </table>
                </div>
              `:""}
      </ha-card>
    `}_handleTap(){Ct(this,this.hass,this.config,!1,!1)}_handleHold(){Ct(this,this.hass,this.config,!0,!1)}static get styles(){return ot`
      .warning {
        display: block;
        color: black;
        background-color: #fce588;
        padding: 8px;
      }
    `}};t([nt()],Tt.prototype,"hass",void 0),t([nt()],Tt.prototype,"config",void 0),Tt=t([(t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:n,elements:s}=e;return{kind:n,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e))("pa-multiroom")],Tt);
