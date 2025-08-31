function t_(){import.meta.url,import("_").catch(()=>1),(async function*(){})().next()}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const ku=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",Du=3049,Ou={API_BASE:ku?"http://localhost:".concat(Du):"https://vfied-v3.onrender.com"};var ko={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Nu=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=n[t++];e[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=n[t++],c=n[t++],u=n[t++],h=((i&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],c=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|c&63)}}return e.join("")},qa={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const o=n[i],c=i+1<n.length,u=c?n[i+1]:0,h=i+2<n.length,f=h?n[i+2]:0,_=o>>2,A=(o&3)<<4|u>>4;let S=(u&15)<<2|f>>6,C=f&63;h||(C=64,c||(S=64)),r.push(t[_],t[A],t[S],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ha(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Nu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const o=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;const f=i<n.length?t[n.charAt(i)]:64;++i;const A=i<n.length?t[n.charAt(i)]:64;if(++i,o==null||u==null||f==null||A==null)throw new Mu;const S=o<<2|u>>4;if(r.push(S),f!==64){const C=u<<4&240|f>>2;if(r.push(C),A!==64){const k=f<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Mu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Vu=function(n){const e=Ha(n);return qa.encodeByteArray(e,!0)},fr=function(n){return Vu(n).replace(/\./g,"")},za=function(n){try{return qa.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof globalThis<"u")return globalThis;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xu=()=>Lu().__FIREBASE_DEFAULTS__,Fu=()=>{if(typeof process>"u"||typeof ko>"u")return;const n=ko.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Uu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}const e=n&&za(n[1]);return e&&JSON.parse(e)},kr=()=>{try{return xu()||Fu()||Uu()}catch(n){console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(n));return}},Ga=n=>{var e,t;return(t=(e=kr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Bu=n=>{const e=Ga(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error("Invalid host ".concat(e," with no separate hostname and port!"));const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ka=()=>{var n;return(n=kr())===null||n===void 0?void 0:n.config},Wa=n=>{var e;return(e=kr())===null||e===void 0?void 0:e["_".concat(n)]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c=Object.assign({iss:"https://securetoken.google.com/".concat(r),aud:r,iat:i,exp:i+3600,auth_time:i,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[fr(JSON.stringify(t)),fr(JSON.stringify(c)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Hu(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(fe())}function qu(){var n;const e=(n=kr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(globalThis.process)==="[object process]"}catch(t){return!1}}function zu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Qa(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Gu(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ku(){const n=fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Wu(){return!qu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ja(){try{return typeof indexedDB=="object"}catch(n){return!1}}function Xa(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var o;e(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}function Qu(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju="FirebaseError";class Ce extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Ju,Object.setPrototypeOf(this,Ce.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,At.prototype.create)}}class At{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i="".concat(this.service,"/").concat(e),o=this.errors[e],c=o?Xu(o,r):"Error",u="".concat(this.serviceName,": ").concat(c," (").concat(i,").");return new Ce(i,u,r)}}function Xu(n,e){return n.replace(Yu,(t,r)=>{const i=e[r];return i!=null?String(i):"<".concat(r,"?>")})}const Yu=/\{\$([^}]+)}/g;function Zu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Tn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const o=n[i],c=e[i];if(Do(o)&&Do(c)){if(!Tn(o,c))return!1}else if(o!==c)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Do(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function eh(n,e){const t=new th(n,e);return t.subscribe.bind(t)}class th{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");nh(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=li),i.error===void 0&&(i.error=li),i.complete===void 0&&(i.complete=li);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(c){}}),this.observers.push(i),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function li(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=1e3,ih=2,sh=14400*1e3,oh=.5;function Oo(n,e=rh,t=ih){const r=e*Math.pow(t,n),i=Math.round(oh*r*(Math.random()-.5)*2);return Math.min(sh,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(n){return n&&n._delegate?n._delegate:n}class Re{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ju;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error("Service ".concat(this.name," is not available"))}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error("Mismatching Component ".concat(e.name," for Provider ").concat(this.name,"."));if(this.component)throw Error("Component for ".concat(this.name," has already been provided"));if(this.component=e,!!this.shouldAutoInitialize()){if(lh(e))try{this.getOrInitializeService({instanceIdentifier:dt})}catch(t){}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch(o){}}}}clearInstance(e=dt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dt){return this.instances.has(e)}getOptions(e=dt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error("".concat(this.name,"(").concat(r,") has already been initialized"));if(!this.isComponentSet())throw Error("Component ".concat(this.name," has not been registered yet"));const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,c]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&c.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(i,o);const c=this.instances.get(i);return c&&e(c,i),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch(o){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ch(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(i){}return r||null}normalizeInstanceIdentifier(e=dt){return this.component?this.component.multipleInstances?e:dt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ch(n){return n===dt?void 0:n}function lh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component ".concat(e.name," has already been registered with ").concat(this.name));t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ah(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(V||(V={}));const hh={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},dh=V.INFO,fh={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},ph=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=fh[e];if(i)console[i]("[".concat(r,"]  ").concat(n.name,":"),...t);else throw new Error("Attempted to log a message with an invalid logType (value: ".concat(e,")"))};class Dr{constructor(e){this.name=e,this._logLevel=dh,this._logHandler=ph,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?hh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}const gh=(n,e)=>e.some(t=>n instanceof t);let No,Mo;function mh(){return No||(No=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function yh(){return Mo||(Mo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ya=new WeakMap,bi=new WeakMap,Za=new WeakMap,ui=new WeakMap,Gi=new WeakMap;function _h(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",c)},o=()=>{t(tt(n.result)),i()},c=()=>{r(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&Ya.set(t,n)}).catch(()=>{}),Gi.set(e,n),e}function vh(n){if(bi.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",c),n.removeEventListener("abort",c)},o=()=>{t(),i()},c=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",c),n.addEventListener("abort",c)});bi.set(n,e)}let Si={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return bi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Za.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return tt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ih(n){Si=n(Si)}function Eh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(hi(this),e,...t);return Za.set(r,e.sort?e.sort():[e]),tt(r)}:yh().includes(n)?function(...e){return n.apply(hi(this),e),tt(Ya.get(this))}:function(...e){return tt(n.apply(hi(this),e))}}function Th(n){return typeof n=="function"?Eh(n):(n instanceof IDBTransaction&&vh(n),gh(n,mh())?new Proxy(n,Si):n)}function tt(n){if(n instanceof IDBRequest)return _h(n);if(ui.has(n))return ui.get(n);const e=Th(n);return e!==n&&(ui.set(n,e),Gi.set(e,n)),e}const hi=n=>Gi.get(n);function ec(n,e,{blocked:t,upgrade:r,blocking:i,terminated:o}={}){const c=indexedDB.open(n,e),u=tt(c);return r&&c.addEventListener("upgradeneeded",h=>{r(tt(c.result),h.oldVersion,h.newVersion,tt(c.transaction),h)}),t&&c.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),i&&h.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const wh=["get","getKey","getAll","getAllKeys","count"],Ah=["put","add","delete","clear"],di=new Map;function Vo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(di.get(e))return di.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=Ah.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||wh.includes(t)))return;const o=async function(c,...u){const h=this.transaction(c,i?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),i&&h.done]))[0]};return di.set(e,o),o}Ih(n=>({...n,get:(e,t,r)=>Vo(e,t)||n.get(e,t,r),has:(e,t)=>!!Vo(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sh(t)){const r=t.getImmediate();return"".concat(r.library,"/").concat(r.version)}else return null}).filter(t=>t).join(" ")}}function Sh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ri="@firebase/app",Lo="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je=new Dr("@firebase/app"),Rh="@firebase/app-compat",Ch="@firebase/analytics-compat",Ph="@firebase/analytics",kh="@firebase/app-check-compat",Dh="@firebase/app-check",Oh="@firebase/auth",Nh="@firebase/auth-compat",Mh="@firebase/database",Vh="@firebase/data-connect",Lh="@firebase/database-compat",xh="@firebase/functions",Fh="@firebase/functions-compat",Uh="@firebase/installations",Bh="@firebase/installations-compat",jh="@firebase/messaging",$h="@firebase/messaging-compat",Hh="@firebase/performance",qh="@firebase/performance-compat",zh="@firebase/remote-config",Gh="@firebase/remote-config-compat",Kh="@firebase/storage",Wh="@firebase/storage-compat",Qh="@firebase/firestore",Jh="@firebase/vertexai-preview",Xh="@firebase/firestore-compat",Yh="firebase",Zh="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci="[DEFAULT]",ed={[Ri]:"fire-core",[Rh]:"fire-core-compat",[Ph]:"fire-analytics",[Ch]:"fire-analytics-compat",[Dh]:"fire-app-check",[kh]:"fire-app-check-compat",[Oh]:"fire-auth",[Nh]:"fire-auth-compat",[Mh]:"fire-rtdb",[Vh]:"fire-data-connect",[Lh]:"fire-rtdb-compat",[xh]:"fire-fn",[Fh]:"fire-fn-compat",[Uh]:"fire-iid",[Bh]:"fire-iid-compat",[jh]:"fire-fcm",[$h]:"fire-fcm-compat",[Hh]:"fire-perf",[qh]:"fire-perf-compat",[zh]:"fire-rc",[Gh]:"fire-rc-compat",[Kh]:"fire-gcs",[Wh]:"fire-gcs-compat",[Qh]:"fire-fst",[Xh]:"fire-fst-compat",[Jh]:"fire-vertex","fire-js":"fire-js",[Yh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=new Map,td=new Map,Pi=new Map;function xo(n,e){try{n.container.addComponent(e)}catch(t){je.debug("Component ".concat(e.name," failed to register with FirebaseApp ").concat(n.name),t)}}function Oe(n){const e=n.name;if(Pi.has(e))return je.debug("There were multiple attempts to register component ".concat(e,".")),!1;Pi.set(e,n);for(const t of pr.values())xo(t,n);for(const t of td.values())xo(t,n);return!0}function bt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ze(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nt=new At("app","Firebase",nd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Re("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zt=Zh;function tc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ci,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw nt.create("bad-app-name",{appName:String(i)});if(t||(t=Ka()),!t)throw nt.create("no-options");const o=pr.get(i);if(o){if(Tn(t,o.options)&&Tn(r,o.config))return o;throw nt.create("duplicate-app",{appName:i})}const c=new uh(i);for(const h of Pi.values())c.addComponent(h);const u=new rd(t,r,c);return pr.set(i,u),u}function Ki(n=Ci){const e=pr.get(n);if(!e&&n===Ci&&Ka())return tc();if(!e)throw nt.create("no-app",{appName:n});return e}function we(n,e,t){var r;let i=(r=ed[n])!==null&&r!==void 0?r:n;t&&(i+="-".concat(t));const o=i.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const u=['Unable to register library "'.concat(i,'" with version "').concat(e,'":')];o&&u.push('library name "'.concat(i,'" contains illegal characters (whitespace or "/")')),o&&c&&u.push("and"),c&&u.push('version name "'.concat(e,'" contains illegal characters (whitespace or "/")')),je.warn(u.join(" "));return}Oe(new Re("".concat(i,"-version"),()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="firebase-heartbeat-database",sd=1,wn="firebase-heartbeat-store";let fi=null;function nc(){return fi||(fi=ec(id,sd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(wn)}catch(t){console.warn(t)}}}}).catch(n=>{throw nt.create("idb-open",{originalErrorMessage:n.message})})),fi}async function od(n){try{const t=(await nc()).transaction(wn),r=await t.objectStore(wn).get(rc(n));return await t.done,r}catch(e){if(e instanceof Ce)je.warn(e.message);else{const t=nt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});je.warn(t.message)}}}async function Fo(n,e){try{const r=(await nc()).transaction(wn,"readwrite");await r.objectStore(wn).put(e,rc(n)),await r.done}catch(t){if(t instanceof Ce)je.warn(t.message);else{const r=nt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});je.warn(r.message)}}}function rc(n){return"".concat(n.name,"!").concat(n.options.appId)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad=1024,cd=720*60*60*1e3;class ld{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hd(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Uo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{const u=new Date(c.date).valueOf();return Date.now()-u<=cd}),this._storage.overwrite(this._heartbeatsCache))}catch(r){je.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Uo(),{heartbeatsToSend:r,unsentEntries:i}=ud(this._heartbeatsCache.heartbeats),o=fr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return je.warn(t),""}}}function Uo(){return new Date().toISOString().substring(0,10)}function ud(n,e=ad){const t=[];let r=n.slice();for(const i of n){const o=t.find(c=>c.agent===i.agent);if(o){if(o.dates.push(i.date),Bo(t)>e){o.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Bo(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class hd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ja()?Xa().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await od(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Fo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Fo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Bo(n){return fr(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(n){Oe(new Re("platform-logger",e=>new bh(e),"PRIVATE")),Oe(new Re("heartbeat",e=>new ld(e),"PRIVATE")),we(Ri,Lo,n),we(Ri,Lo,"esm2017"),we("fire-js","")}dd("");var jo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ic;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,p){function m(){}m.prototype=p.prototype,I.D=p.prototype,I.prototype=new m,I.prototype.constructor=I,I.C=function(y,v,T){for(var g=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)g[Me-2]=arguments[Me];return p.prototype[v].apply(y,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,p,m){m||(m=0);var y=Array(16);if(typeof p=="string")for(var v=0;16>v;++v)y[v]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(v=0;16>v;++v)y[v]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=I.g[0],m=I.g[1],v=I.g[2];var T=I.g[3],g=p+(T^m&(v^T))+y[0]+3614090360&4294967295;p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+y[1]+3905402710&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+y[2]+606105819&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+y[3]+3250441966&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+y[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+y[5]+1200080426&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+y[6]+2821735955&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+y[7]+4249261313&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+y[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+y[9]+2336552879&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+y[10]+4294925233&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+y[11]+2304563134&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(T^m&(v^T))+y[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=T+(v^p&(m^v))+y[13]+4254626195&4294967295,T=p+(g<<12&4294967295|g>>>20),g=v+(m^T&(p^m))+y[14]+2792965006&4294967295,v=T+(g<<17&4294967295|g>>>15),g=m+(p^v&(T^p))+y[15]+1236535329&4294967295,m=v+(g<<22&4294967295|g>>>10),g=p+(v^T&(m^v))+y[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+y[6]+3225465664&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+y[11]+643717713&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+y[0]+3921069994&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+y[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+y[10]+38016083&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+y[15]+3634488961&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+y[4]+3889429448&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+y[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+y[14]+3275163606&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+y[3]+4107603335&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+y[8]+1163531501&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(v^T&(m^v))+y[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=T+(m^v&(p^m))+y[2]+4243563512&4294967295,T=p+(g<<9&4294967295|g>>>23),g=v+(p^m&(T^p))+y[7]+1735328473&4294967295,v=T+(g<<14&4294967295|g>>>18),g=m+(T^p&(v^T))+y[12]+2368359562&4294967295,m=v+(g<<20&4294967295|g>>>12),g=p+(m^v^T)+y[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+y[8]+2272392833&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+y[11]+1839030562&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+y[14]+4259657740&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+y[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+y[4]+1272893353&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+y[7]+4139469664&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+y[10]+3200236656&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+y[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+y[0]+3936430074&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+y[3]+3572445317&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+y[6]+76029189&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(m^v^T)+y[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=T+(p^m^v)+y[12]+3873151461&4294967295,T=p+(g<<11&4294967295|g>>>21),g=v+(T^p^m)+y[15]+530742520&4294967295,v=T+(g<<16&4294967295|g>>>16),g=m+(v^T^p)+y[2]+3299628645&4294967295,m=v+(g<<23&4294967295|g>>>9),g=p+(v^(m|~T))+y[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+y[7]+1126891415&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+y[14]+2878612391&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+y[5]+4237533241&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+y[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+y[3]+2399980690&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+y[10]+4293915773&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+y[1]+2240044497&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+y[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+y[15]+4264355552&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+y[6]+2734768916&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+y[13]+1309151649&4294967295,m=v+(g<<21&4294967295|g>>>11),g=p+(v^(m|~T))+y[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=T+(m^(p|~v))+y[11]+3174756917&4294967295,T=p+(g<<10&4294967295|g>>>22),g=v+(p^(T|~m))+y[2]+718787259&4294967295,v=T+(g<<15&4294967295|g>>>17),g=m+(T^(v|~p))+y[9]+3951481745&4294967295,I.g[0]=I.g[0]+p&4294967295,I.g[1]=I.g[1]+(v+(g<<21&4294967295|g>>>11))&4294967295,I.g[2]=I.g[2]+v&4294967295,I.g[3]=I.g[3]+T&4294967295}r.prototype.u=function(I,p){p===void 0&&(p=I.length);for(var m=p-this.blockSize,y=this.B,v=this.h,T=0;T<p;){if(v==0)for(;T<=m;)i(this,I,T),T+=this.blockSize;if(typeof I=="string"){for(;T<p;)if(y[v++]=I.charCodeAt(T++),v==this.blockSize){i(this,y),v=0;break}}else for(;T<p;)if(y[v++]=I[T++],v==this.blockSize){i(this,y),v=0;break}}this.h=v,this.o+=p},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var p=1;p<I.length-8;++p)I[p]=0;var m=8*this.o;for(p=I.length-8;p<I.length;++p)I[p]=m&255,m/=256;for(this.u(I),I=Array(16),p=m=0;4>p;++p)for(var y=0;32>y;y+=8)I[m++]=this.g[p]>>>y&255;return I};function o(I,p){var m=u;return Object.prototype.hasOwnProperty.call(m,I)?m[I]:m[I]=p(I)}function c(I,p){this.h=p;for(var m=[],y=!0,v=I.length-1;0<=v;v--){var T=I[v]|0;y&&T==p||(m[v]=T,y=!1)}this.g=m}var u={};function h(I){return-128<=I&&128>I?o(I,function(p){return new c([p|0],0>p?-1:0)}):new c([I|0],0>I?-1:0)}function f(I){if(isNaN(I)||!isFinite(I))return A;if(0>I)return N(f(-I));for(var p=[],m=1,y=0;I>=m;y++)p[y]=I/m|0,m*=4294967296;return new c(p,0)}function _(I,p){if(I.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(I.charAt(0)=="-")return N(_(I.substring(1),p));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=f(Math.pow(p,8)),y=A,v=0;v<I.length;v+=8){var T=Math.min(8,I.length-v),g=parseInt(I.substring(v,v+T),p);8>T?(T=f(Math.pow(p,T)),y=y.j(T).add(f(g))):(y=y.j(m),y=y.add(f(g)))}return y}var A=h(0),S=h(1),C=h(16777216);n=c.prototype,n.m=function(){if(F(this))return-N(this).m();for(var I=0,p=1,m=0;m<this.g.length;m++){var y=this.i(m);I+=(0<=y?y:4294967296+y)*p,p*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(k(this))return"0";if(F(this))return"-"+N(this).toString(I);for(var p=f(Math.pow(I,6)),m=this,y="";;){var v=J(m,p).g;m=X(m,v.j(p));var T=((0<m.g.length?m.g[0]:m.h)>>>0).toString(I);if(m=v,k(m))return T+y;for(;6>T.length;)T="0"+T;y=T+y}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function k(I){if(I.h!=0)return!1;for(var p=0;p<I.g.length;p++)if(I.g[p]!=0)return!1;return!0}function F(I){return I.h==-1}n.l=function(I){return I=X(this,I),F(I)?-1:k(I)?0:1};function N(I){for(var p=I.g.length,m=[],y=0;y<p;y++)m[y]=~I.g[y];return new c(m,~I.h).add(S)}n.abs=function(){return F(this)?N(this):this},n.add=function(I){for(var p=Math.max(this.g.length,I.g.length),m=[],y=0,v=0;v<=p;v++){var T=y+(this.i(v)&65535)+(I.i(v)&65535),g=(T>>>16)+(this.i(v)>>>16)+(I.i(v)>>>16);y=g>>>16,T&=65535,g&=65535,m[v]=g<<16|T}return new c(m,m[m.length-1]&-2147483648?-1:0)};function X(I,p){return I.add(N(p))}n.j=function(I){if(k(this)||k(I))return A;if(F(this))return F(I)?N(this).j(N(I)):N(N(this).j(I));if(F(I))return N(this.j(N(I)));if(0>this.l(C)&&0>I.l(C))return f(this.m()*I.m());for(var p=this.g.length+I.g.length,m=[],y=0;y<2*p;y++)m[y]=0;for(y=0;y<this.g.length;y++)for(var v=0;v<I.g.length;v++){var T=this.i(y)>>>16,g=this.i(y)&65535,Me=I.i(v)>>>16,Qt=I.i(v)&65535;m[2*y+2*v]+=g*Qt,W(m,2*y+2*v),m[2*y+2*v+1]+=T*Qt,W(m,2*y+2*v+1),m[2*y+2*v+1]+=g*Me,W(m,2*y+2*v+1),m[2*y+2*v+2]+=T*Me,W(m,2*y+2*v+2)}for(y=0;y<p;y++)m[y]=m[2*y+1]<<16|m[2*y];for(y=p;y<2*p;y++)m[y]=0;return new c(m,0)};function W(I,p){for(;(I[p]&65535)!=I[p];)I[p+1]+=I[p]>>>16,I[p]&=65535,p++}function K(I,p){this.g=I,this.h=p}function J(I,p){if(k(p))throw Error("division by zero");if(k(I))return new K(A,A);if(F(I))return p=J(N(I),p),new K(N(p.g),N(p.h));if(F(p))return p=J(I,N(p)),new K(N(p.g),p.h);if(30<I.g.length){if(F(I)||F(p))throw Error("slowDivide_ only works with positive integers.");for(var m=S,y=p;0>=y.l(I);)m=Pe(m),y=Pe(y);var v=Y(m,1),T=Y(y,1);for(y=Y(y,2),m=Y(m,2);!k(y);){var g=T.add(y);0>=g.l(I)&&(v=v.add(m),T=g),y=Y(y,1),m=Y(m,1)}return p=X(I,v.j(p)),new K(v,p)}for(v=A;0<=I.l(p);){for(m=Math.max(1,Math.floor(I.m()/p.m())),y=Math.ceil(Math.log(m)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),T=f(m),g=T.j(p);F(g)||0<g.l(I);)m-=y,T=f(m),g=T.j(p);k(T)&&(T=S),v=v.add(T),I=X(I,g)}return new K(v,I)}n.A=function(I){return J(this,I).h},n.and=function(I){for(var p=Math.max(this.g.length,I.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)&I.i(y);return new c(m,this.h&I.h)},n.or=function(I){for(var p=Math.max(this.g.length,I.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)|I.i(y);return new c(m,this.h|I.h)},n.xor=function(I){for(var p=Math.max(this.g.length,I.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)^I.i(y);return new c(m,this.h^I.h)};function Pe(I){for(var p=I.g.length+1,m=[],y=0;y<p;y++)m[y]=I.i(y)<<1|I.i(y-1)>>>31;return new c(m,I.h)}function Y(I,p){var m=p>>5;p%=32;for(var y=I.g.length-m,v=[],T=0;T<y;T++)v[T]=0<p?I.i(T+m)>>>p|I.i(T+m+1)<<32-p:I.i(T+m);return new c(v,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=_,ic=c}).apply(typeof jo<"u"?jo:typeof self<"u"?self:typeof window<"u"?window:{});var tr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sc,gn,oc,ar,ki,ac,cc,lc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(s,a,l){return s==Array.prototype||s==Object.prototype||(s[a]=l.value),s};function t(s){s=[typeof globalThis=="object"&&globalThis,s,typeof window=="object"&&window,typeof self=="object"&&self,typeof tr=="object"&&tr];for(var a=0;a<s.length;++a){var l=s[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function i(s,a){if(a)e:{var l=r;s=s.split(".");for(var d=0;d<s.length-1;d++){var E=s[d];if(!(E in l))break e;l=l[E]}s=s[s.length-1],d=l[s],a=a(d),a!=d&&a!=null&&e(l,s,{configurable:!0,writable:!0,value:a})}}function o(s,a){s instanceof String&&(s+="");var l=0,d=!1,E={next:function(){if(!d&&l<s.length){var w=l++;return{value:a(w,s[w]),done:!1}}return d=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}i("Array.prototype.values",function(s){return s||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},u=this||self;function h(s){var a=typeof s;return a=a!="object"?a:s?Array.isArray(s)?"array":a:"null",a=="array"||a=="object"&&typeof s.length=="number"}function f(s){var a=typeof s;return a=="object"&&s!=null||a=="function"}function _(s,a,l){return s.call.apply(s.bind,arguments)}function A(s,a,l){if(!s)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,d),s.apply(a,E)}}return function(){return s.apply(a,arguments)}}function S(s,a,l){return S=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?_:A,S.apply(null,arguments)}function C(s,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),s.apply(this,d)}}function k(s,a){function l(){}l.prototype=a.prototype,s.aa=a.prototype,s.prototype=new l,s.prototype.constructor=s,s.Qb=function(d,E,w){for(var R=Array(arguments.length-2),$=2;$<arguments.length;$++)R[$-2]=arguments[$];return a.prototype[E].apply(d,R)}}function F(s){const a=s.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=s[d];return l}return[]}function N(s,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const E=s.length||0,w=d.length||0;s.length=E+w;for(let R=0;R<w;R++)s[E+R]=d[R]}else s.push(d)}}class X{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function W(s){return/^[\s\xa0]*$/.test(s)}function K(){var s=u.navigator;return s&&(s=s.userAgent)?s:""}function J(s){return J[" "](s),s}J[" "]=function(){};var Pe=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function Y(s,a,l){for(const d in s)a.call(l,s[d],d,s)}function I(s,a){for(const l in s)a.call(void 0,s[l],l,s)}function p(s){const a={};for(const l in s)a[l]=s[l];return a}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(s,a){let l,d;for(let E=1;E<arguments.length;E++){d=arguments[E];for(l in d)s[l]=d[l];for(let w=0;w<m.length;w++)l=m[w],Object.prototype.hasOwnProperty.call(d,l)&&(s[l]=d[l])}}function v(s){var a=1;s=s.split(":");const l=[];for(;0<a&&s.length;)l.push(s.shift()),a--;return s.length&&l.push(s.join(":")),l}function T(s){u.setTimeout(()=>{throw s},0)}function g(){var s=Ur;let a=null;return s.g&&(a=s.g,s.g=s.g.next,s.g||(s.h=null),a.next=null),a}class Me{constructor(){this.h=this.g=null}add(a,l){const d=Qt.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Qt=new X(()=>new Ql,s=>s.reset());class Ql{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Jt,Xt=!1,Ur=new Me,Ps=()=>{const s=u.Promise.resolve(void 0);Jt=()=>{s.then(Jl)}};var Jl=()=>{for(var s;s=g();){try{s.h.call(s.g)}catch(l){T(l)}var a=Qt;a.j(s),100>a.h&&(a.h++,s.next=a.g,a.g=s)}Xt=!1};function qe(){this.s=this.s,this.C=this.C}qe.prototype.s=!1,qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(s,a){this.type=s,this.g=this.target=a,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var Xl=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var s=!1,a=Object.defineProperty({},"passive",{get:function(){s=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch(l){}return s})();function Yt(s,a){if(oe.call(this,s?s.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,s){var l=this.type=s.type,d=s.changedTouches&&s.changedTouches.length?s.changedTouches[0]:null;if(this.target=s.target||s.srcElement,this.g=a,a=s.relatedTarget){if(Pe){e:{try{J(a.nodeName);var E=!0;break e}catch(w){}E=!1}E||(a=null)}}else l=="mouseover"?a=s.fromElement:l=="mouseout"&&(a=s.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0),this.button=s.button,this.key=s.key||"",this.ctrlKey=s.ctrlKey,this.altKey=s.altKey,this.shiftKey=s.shiftKey,this.metaKey=s.metaKey,this.pointerId=s.pointerId||0,this.pointerType=typeof s.pointerType=="string"?s.pointerType:Yl[s.pointerType]||"",this.state=s.state,this.i=s,s.defaultPrevented&&Yt.aa.h.call(this)}}k(Yt,oe);var Yl={2:"touch",3:"pen",4:"mouse"};Yt.prototype.h=function(){Yt.aa.h.call(this);var s=this.i;s.preventDefault?s.preventDefault():s.returnValue=!1};var Ln="closure_listenable_"+(1e6*Math.random()|0),Zl=0;function eu(s,a,l,d,E){this.listener=s,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=E,this.key=++Zl,this.da=this.fa=!1}function xn(s){s.da=!0,s.listener=null,s.proxy=null,s.src=null,s.ha=null}function Fn(s){this.src=s,this.g={},this.h=0}Fn.prototype.add=function(s,a,l,d,E){var w=s.toString();s=this.g[w],s||(s=this.g[w]=[],this.h++);var R=jr(s,a,d,E);return-1<R?(a=s[R],l||(a.fa=!1)):(a=new eu(a,this.src,w,!!d,E),a.fa=l,s.push(a)),a};function Br(s,a){var l=a.type;if(l in s.g){var d=s.g[l],E=Array.prototype.indexOf.call(d,a,void 0),w;(w=0<=E)&&Array.prototype.splice.call(d,E,1),w&&(xn(a),s.g[l].length==0&&(delete s.g[l],s.h--))}}function jr(s,a,l,d){for(var E=0;E<s.length;++E){var w=s[E];if(!w.da&&w.listener==a&&w.capture==!!l&&w.ha==d)return E}return-1}var $r="closure_lm_"+(1e6*Math.random()|0),Hr={};function ks(s,a,l,d,E){if(Array.isArray(a)){for(var w=0;w<a.length;w++)ks(s,a[w],l,d,E);return null}return l=Ns(l),s&&s[Ln]?s.K(a,l,f(d)?!!d.capture:!1,E):tu(s,a,l,!1,d,E)}function tu(s,a,l,d,E,w){if(!a)throw Error("Invalid event type");var R=f(E)?!!E.capture:!!E,$=zr(s);if($||(s[$r]=$=new Fn(s)),l=$.add(a,l,d,R,w),l.proxy)return l;if(d=nu(),l.proxy=d,d.src=s,d.listener=l,s.addEventListener)Xl||(E=R),E===void 0&&(E=!1),s.addEventListener(a.toString(),d,E);else if(s.attachEvent)s.attachEvent(Os(a.toString()),d);else if(s.addListener&&s.removeListener)s.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function nu(){function s(l){return a.call(s.src,s.listener,l)}const a=ru;return s}function Ds(s,a,l,d,E){if(Array.isArray(a))for(var w=0;w<a.length;w++)Ds(s,a[w],l,d,E);else d=f(d)?!!d.capture:!!d,l=Ns(l),s&&s[Ln]?(s=s.i,a=String(a).toString(),a in s.g&&(w=s.g[a],l=jr(w,l,d,E),-1<l&&(xn(w[l]),Array.prototype.splice.call(w,l,1),w.length==0&&(delete s.g[a],s.h--)))):s&&(s=zr(s))&&(a=s.g[a.toString()],s=-1,a&&(s=jr(a,l,d,E)),(l=-1<s?a[s]:null)&&qr(l))}function qr(s){if(typeof s!="number"&&s&&!s.da){var a=s.src;if(a&&a[Ln])Br(a.i,s);else{var l=s.type,d=s.proxy;a.removeEventListener?a.removeEventListener(l,d,s.capture):a.detachEvent?a.detachEvent(Os(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=zr(a))?(Br(l,s),l.h==0&&(l.src=null,a[$r]=null)):xn(s)}}}function Os(s){return s in Hr?Hr[s]:Hr[s]="on"+s}function ru(s,a){if(s.da)s=!0;else{a=new Yt(a,this);var l=s.listener,d=s.ha||s.src;s.fa&&qr(s),s=l.call(d,a)}return s}function zr(s){return s=s[$r],s instanceof Fn?s:null}var Gr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ns(s){return typeof s=="function"?s:(s[Gr]||(s[Gr]=function(a){return s.handleEvent(a)}),s[Gr])}function ae(){qe.call(this),this.i=new Fn(this),this.M=this,this.F=null}k(ae,qe),ae.prototype[Ln]=!0,ae.prototype.removeEventListener=function(s,a,l,d){Ds(this,s,a,l,d)};function pe(s,a){var l,d=s.F;if(d)for(l=[];d;d=d.F)l.push(d);if(s=s.M,d=a.type||a,typeof a=="string")a=new oe(a,s);else if(a instanceof oe)a.target=a.target||s;else{var E=a;a=new oe(d,s),y(a,E)}if(E=!0,l)for(var w=l.length-1;0<=w;w--){var R=a.g=l[w];E=Un(R,d,!0,a)&&E}if(R=a.g=s,E=Un(R,d,!0,a)&&E,E=Un(R,d,!1,a)&&E,l)for(w=0;w<l.length;w++)R=a.g=l[w],E=Un(R,d,!1,a)&&E}ae.prototype.N=function(){if(ae.aa.N.call(this),this.i){var s=this.i,a;for(a in s.g){for(var l=s.g[a],d=0;d<l.length;d++)xn(l[d]);delete s.g[a],s.h--}}this.F=null},ae.prototype.K=function(s,a,l,d){return this.i.add(String(s),a,!1,l,d)},ae.prototype.L=function(s,a,l,d){return this.i.add(String(s),a,!0,l,d)};function Un(s,a,l,d){if(a=s.i.g[String(a)],!a)return!0;a=a.concat();for(var E=!0,w=0;w<a.length;++w){var R=a[w];if(R&&!R.da&&R.capture==l){var $=R.listener,te=R.ha||R.src;R.fa&&Br(s.i,R),E=$.call(te,d)!==!1&&E}}return E&&!d.defaultPrevented}function Ms(s,a,l){if(typeof s=="function")l&&(s=S(s,l));else if(s&&typeof s.handleEvent=="function")s=S(s.handleEvent,s);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(s,a||0)}function Vs(s){s.g=Ms(()=>{s.g=null,s.i&&(s.i=!1,Vs(s))},s.l);const a=s.h;s.h=null,s.m.apply(null,a)}class iu extends qe{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Vs(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zt(s){qe.call(this),this.h=s,this.g={}}k(Zt,qe);var Ls=[];function xs(s){Y(s.g,function(a,l){this.g.hasOwnProperty(l)&&qr(a)},s),s.g={}}Zt.prototype.N=function(){Zt.aa.N.call(this),xs(this)},Zt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Kr=u.JSON.stringify,su=u.JSON.parse,ou=class{stringify(s){return u.JSON.stringify(s,void 0)}parse(s){return u.JSON.parse(s,void 0)}};function Wr(){}Wr.prototype.h=null;function Fs(s){return s.h||(s.h=s.i())}function Us(){}var en={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qr(){oe.call(this,"d")}k(Qr,oe);function Jr(){oe.call(this,"c")}k(Jr,oe);var ct={},Bs=null;function Bn(){return Bs=Bs||new ae}ct.La="serverreachability";function js(s){oe.call(this,ct.La,s)}k(js,oe);function tn(s){const a=Bn();pe(a,new js(a))}ct.STAT_EVENT="statevent";function $s(s,a){oe.call(this,ct.STAT_EVENT,s),this.stat=a}k($s,oe);function ge(s){const a=Bn();pe(a,new $s(a,s))}ct.Ma="timingevent";function Hs(s,a){oe.call(this,ct.Ma,s),this.size=a}k(Hs,oe);function nn(s,a){if(typeof s!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){s()},a)}function rn(){this.g=!0}rn.prototype.xa=function(){this.g=!1};function au(s,a,l,d,E,w){s.info(function(){if(s.g)if(w)for(var R="",$=w.split("&"),te=0;te<$.length;te++){var U=$[te].split("=");if(1<U.length){var ce=U[0];U=U[1];var le=ce.split("_");R=2<=le.length&&le[1]=="type"?R+(ce+"="+U+"&"):R+(ce+"=redacted&")}}else R=null;else R=w;return"XMLHTTP REQ ("+d+") [attempt "+E+"]: "+a+"\n"+l+"\n"+R})}function cu(s,a,l,d,E,w,R){s.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+E+"]: "+a+"\n"+l+"\n"+w+" "+R})}function St(s,a,l,d){s.info(function(){return"XMLHTTP TEXT ("+a+"): "+uu(s,l)+(d?" "+d:"")})}function lu(s,a){s.info(function(){return"TIMEOUT: "+a})}rn.prototype.info=function(){};function uu(s,a){if(!s.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(s=0;s<l.length;s++)if(Array.isArray(l[s])){var d=l[s];if(!(2>d.length)){var E=d[1];if(Array.isArray(E)&&!(1>E.length)){var w=E[0];if(w!="noop"&&w!="stop"&&w!="close")for(var R=1;R<E.length;R++)E[R]=""}}}}return Kr(l)}catch($){return a}}var jn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},qs={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Xr;function $n(){}k($n,Wr),$n.prototype.g=function(){return new XMLHttpRequest},$n.prototype.i=function(){return{}},Xr=new $n;function ze(s,a,l,d){this.j=s,this.i=a,this.l=l,this.R=d||1,this.U=new Zt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new zs}function zs(){this.i=null,this.g="",this.h=!1}var Gs={},Yr={};function Zr(s,a,l){s.L=1,s.v=Gn(Ve(a)),s.m=l,s.P=!0,Ks(s,null)}function Ks(s,a){s.F=Date.now(),Hn(s),s.A=Ve(s.v);var l=s.A,d=s.R;Array.isArray(d)||(d=[String(d)]),ao(l.i,"t",d),s.C=0,l=s.j.J,s.h=new zs,s.g=So(s.j,l?a:null,!s.m),0<s.O&&(s.M=new iu(S(s.Y,s,s.g),s.O)),a=s.U,l=s.g,d=s.ca;var E="readystatechange";Array.isArray(E)||(E&&(Ls[0]=E.toString()),E=Ls);for(var w=0;w<E.length;w++){var R=ks(l,E[w],d||a.handleEvent,!1,a.h||a);if(!R)break;a.g[R.key]=R}a=s.H?p(s.H):{},s.m?(s.u||(s.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",s.g.ea(s.A,s.u,s.m,a)):(s.u="GET",s.g.ea(s.A,s.u,null,a)),tn(),au(s.i,s.u,s.A,s.l,s.R,s.m)}ze.prototype.ca=function(s){s=s.target;const a=this.M;a&&Le(s)==3?a.j():this.Y(s)},ze.prototype.Y=function(s){try{if(s==this.g)e:{const le=Le(this.g);var a=this.g.Ba();const Pt=this.g.Z();if(!(3>le)&&(le!=3||this.g&&(this.h.h||this.g.oa()||go(this.g)))){this.J||le!=4||a==7||(a==8||0>=Pt?tn(3):tn(2)),ei(this);var l=this.g.Z();this.X=l;t:if(Ws(this)){var d=go(this.g);s="";var E=d.length,w=Le(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){lt(this),sn(this);var R="";break t}this.h.i=new u.TextDecoder}for(a=0;a<E;a++)this.h.h=!0,s+=this.h.i.decode(d[a],{stream:!(w&&a==E-1)});d.length=0,this.h.g+=s,this.C=0,R=this.h.g}else R=this.g.oa();if(this.o=l==200,cu(this.i,this.u,this.A,this.l,this.R,le,l),this.o){if(this.T&&!this.K){t:{if(this.g){var $,te=this.g;if(($=te.g?te.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W($)){var U=$;break t}}U=null}if(l=U)St(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ti(this,l);else{this.o=!1,this.s=3,ge(12),lt(this),sn(this);break e}}if(this.P){l=!0;let be;for(;!this.J&&this.C<R.length;)if(be=hu(this,R),be==Yr){le==4&&(this.s=4,ge(14),l=!1),St(this.i,this.l,null,"[Incomplete Response]");break}else if(be==Gs){this.s=4,ge(15),St(this.i,this.l,R,"[Invalid Chunk]"),l=!1;break}else St(this.i,this.l,be,null),ti(this,be);if(Ws(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),le!=4||R.length!=0||this.h.h||(this.s=1,ge(16),l=!1),this.o=this.o&&l,!l)St(this.i,this.l,R,"[Invalid Chunked Response]"),lt(this),sn(this);else if(0<R.length&&!this.W){this.W=!0;var ce=this.j;ce.g==this&&ce.ba&&!ce.M&&(ce.j.info("Great, no buffering proxy detected. Bytes received: "+R.length),ai(ce),ce.M=!0,ge(11))}}else St(this.i,this.l,R,null),ti(this,R);le==4&&lt(this),this.o&&!this.J&&(le==4?To(this.j,this):(this.o=!1,Hn(this)))}else Cu(this.g),l==400&&0<R.indexOf("Unknown SID")?(this.s=3,ge(12)):(this.s=0,ge(13)),lt(this),sn(this)}}}catch(le){}finally{}};function Ws(s){return s.g?s.u=="GET"&&s.L!=2&&s.j.Ca:!1}function hu(s,a){var l=s.C,d=a.indexOf("\n",l);return d==-1?Yr:(l=Number(a.substring(l,d)),isNaN(l)?Gs:(d+=1,d+l>a.length?Yr:(a=a.slice(d,d+l),s.C=d+l,a)))}ze.prototype.cancel=function(){this.J=!0,lt(this)};function Hn(s){s.S=Date.now()+s.I,Qs(s,s.I)}function Qs(s,a){if(s.B!=null)throw Error("WatchDog timer not null");s.B=nn(S(s.ba,s),a)}function ei(s){s.B&&(u.clearTimeout(s.B),s.B=null)}ze.prototype.ba=function(){this.B=null;const s=Date.now();0<=s-this.S?(lu(this.i,this.A),this.L!=2&&(tn(),ge(17)),lt(this),this.s=2,sn(this)):Qs(this,this.S-s)};function sn(s){s.j.G==0||s.J||To(s.j,s)}function lt(s){ei(s);var a=s.M;a&&typeof a.ma=="function"&&a.ma(),s.M=null,xs(s.U),s.g&&(a=s.g,s.g=null,a.abort(),a.ma())}function ti(s,a){try{var l=s.j;if(l.G!=0&&(l.g==s||ni(l.h,s))){if(!s.K&&ni(l.h,s)&&l.G==3){try{var d=l.Da.g.parse(a)}catch(U){d=null}if(Array.isArray(d)&&d.length==3){var E=d;if(E[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<s.F)Yn(l),Jn(l);else break e;oi(l),ge(18)}}else l.za=E[1],0<l.za-l.T&&37500>E[2]&&l.F&&l.v==0&&!l.C&&(l.C=nn(S(l.Za,l),6e3));if(1>=Ys(l.h)&&l.ca){try{l.ca()}catch(U){}l.ca=void 0}}else ht(l,11)}else if((s.K||l.g==s)&&Yn(l),!W(a))for(E=l.Da.g.parse(a),a=0;a<E.length;a++){let U=E[a];if(l.T=U[0],U=U[1],l.G==2)if(U[0]=="c"){l.K=U[1],l.ia=U[2];const ce=U[3];ce!=null&&(l.la=ce,l.j.info("VER="+l.la));const le=U[4];le!=null&&(l.Aa=le,l.j.info("SVER="+l.Aa));const Pt=U[5];Pt!=null&&typeof Pt=="number"&&0<Pt&&(d=1.5*Pt,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const be=s.g;if(be){const er=be.g?be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(er){var w=d.h;w.g||er.indexOf("spdy")==-1&&er.indexOf("quic")==-1&&er.indexOf("h2")==-1||(w.j=w.l,w.g=new Set,w.h&&(ri(w,w.h),w.h=null))}if(d.D){const ci=be.g?be.g.getResponseHeader("X-HTTP-Session-Id"):null;ci&&(d.ya=ci,H(d.I,d.D,ci))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-s.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var R=s;if(d.qa=bo(d,d.J?d.ia:null,d.W),R.K){Zs(d.h,R);var $=R,te=d.L;te&&($.I=te),$.B&&(ei($),Hn($)),d.g=R}else Io(d);0<l.i.length&&Xn(l)}else U[0]!="stop"&&U[0]!="close"||ht(l,7);else l.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?ht(l,7):si(l):U[0]!="noop"&&l.l&&l.l.ta(U),l.v=0)}}tn(4)}catch(U){}}var du=class{constructor(s,a){this.g=s,this.map=a}};function Js(s){this.l=s||10,u.PerformanceNavigationTiming?(s=u.performance.getEntriesByType("navigation"),s=0<s.length&&(s[0].nextHopProtocol=="hq"||s[0].nextHopProtocol=="h2")):s=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=s?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Xs(s){return s.h?!0:s.g?s.g.size>=s.j:!1}function Ys(s){return s.h?1:s.g?s.g.size:0}function ni(s,a){return s.h?s.h==a:s.g?s.g.has(a):!1}function ri(s,a){s.g?s.g.add(a):s.h=a}function Zs(s,a){s.h&&s.h==a?s.h=null:s.g&&s.g.has(a)&&s.g.delete(a)}Js.prototype.cancel=function(){if(this.i=eo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const s of this.g.values())s.cancel();this.g.clear()}};function eo(s){if(s.h!=null)return s.i.concat(s.h.D);if(s.g!=null&&s.g.size!==0){let a=s.i;for(const l of s.g.values())a=a.concat(l.D);return a}return F(s.i)}function fu(s){if(s.V&&typeof s.V=="function")return s.V();if(typeof Map<"u"&&s instanceof Map||typeof Set<"u"&&s instanceof Set)return Array.from(s.values());if(typeof s=="string")return s.split("");if(h(s)){for(var a=[],l=s.length,d=0;d<l;d++)a.push(s[d]);return a}a=[],l=0;for(d in s)a[l++]=s[d];return a}function pu(s){if(s.na&&typeof s.na=="function")return s.na();if(!s.V||typeof s.V!="function"){if(typeof Map<"u"&&s instanceof Map)return Array.from(s.keys());if(!(typeof Set<"u"&&s instanceof Set)){if(h(s)||typeof s=="string"){var a=[];s=s.length;for(var l=0;l<s;l++)a.push(l);return a}a=[],l=0;for(const d in s)a[l++]=d;return a}}}function to(s,a){if(s.forEach&&typeof s.forEach=="function")s.forEach(a,void 0);else if(h(s)||typeof s=="string")Array.prototype.forEach.call(s,a,void 0);else for(var l=pu(s),d=fu(s),E=d.length,w=0;w<E;w++)a.call(void 0,d[w],l&&l[w],s)}var no=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function gu(s,a){if(s){s=s.split("&");for(var l=0;l<s.length;l++){var d=s[l].indexOf("="),E=null;if(0<=d){var w=s[l].substring(0,d);E=s[l].substring(d+1)}else w=s[l];a(w,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function ut(s){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,s instanceof ut){this.h=s.h,qn(this,s.j),this.o=s.o,this.g=s.g,zn(this,s.s),this.l=s.l;var a=s.i,l=new cn;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),ro(this,l),this.m=s.m}else s&&(a=String(s).match(no))?(this.h=!1,qn(this,a[1]||"",!0),this.o=on(a[2]||""),this.g=on(a[3]||"",!0),zn(this,a[4]),this.l=on(a[5]||"",!0),ro(this,a[6]||"",!0),this.m=on(a[7]||"")):(this.h=!1,this.i=new cn(null,this.h))}ut.prototype.toString=function(){var s=[],a=this.j;a&&s.push(an(a,io,!0),":");var l=this.g;return(l||a=="file")&&(s.push("//"),(a=this.o)&&s.push(an(a,io,!0),"@"),s.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&s.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&s.push("/"),s.push(an(l,l.charAt(0)=="/"?_u:yu,!0))),(l=this.i.toString())&&s.push("?",l),(l=this.m)&&s.push("#",an(l,Iu)),s.join("")};function Ve(s){return new ut(s)}function qn(s,a,l){s.j=l?on(a,!0):a,s.j&&(s.j=s.j.replace(/:$/,""))}function zn(s,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);s.s=a}else s.s=null}function ro(s,a,l){a instanceof cn?(s.i=a,Eu(s.i,s.h)):(l||(a=an(a,vu)),s.i=new cn(a,s.h))}function H(s,a,l){s.i.set(a,l)}function Gn(s){return H(s,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),s}function on(s,a){return s?a?decodeURI(s.replace(/%25/g,"%2525")):decodeURIComponent(s):""}function an(s,a,l){return typeof s=="string"?(s=encodeURI(s).replace(a,mu),l&&(s=s.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),s):null}function mu(s){return s=s.charCodeAt(0),"%"+(s>>4&15).toString(16)+(s&15).toString(16)}var io=/[#\/\?@]/g,yu=/[#\?:]/g,_u=/[#\?]/g,vu=/[#\?@]/g,Iu=/#/g;function cn(s,a){this.h=this.g=null,this.i=s||null,this.j=!!a}function Ge(s){s.g||(s.g=new Map,s.h=0,s.i&&gu(s.i,function(a,l){s.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}n=cn.prototype,n.add=function(s,a){Ge(this),this.i=null,s=Rt(this,s);var l=this.g.get(s);return l||this.g.set(s,l=[]),l.push(a),this.h+=1,this};function so(s,a){Ge(s),a=Rt(s,a),s.g.has(a)&&(s.i=null,s.h-=s.g.get(a).length,s.g.delete(a))}function oo(s,a){return Ge(s),a=Rt(s,a),s.g.has(a)}n.forEach=function(s,a){Ge(this),this.g.forEach(function(l,d){l.forEach(function(E){s.call(a,E,d,this)},this)},this)},n.na=function(){Ge(this);const s=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const E=s[d];for(let w=0;w<E.length;w++)l.push(a[d])}return l},n.V=function(s){Ge(this);let a=[];if(typeof s=="string")oo(this,s)&&(a=a.concat(this.g.get(Rt(this,s))));else{s=Array.from(this.g.values());for(let l=0;l<s.length;l++)a=a.concat(s[l])}return a},n.set=function(s,a){return Ge(this),this.i=null,s=Rt(this,s),oo(this,s)&&(this.h-=this.g.get(s).length),this.g.set(s,[a]),this.h+=1,this},n.get=function(s,a){return s?(s=this.V(s),0<s.length?String(s[0]):a):a};function ao(s,a,l){so(s,a),0<l.length&&(s.i=null,s.g.set(Rt(s,a),F(l)),s.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const s=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const w=encodeURIComponent(String(d)),R=this.V(d);for(d=0;d<R.length;d++){var E=w;R[d]!==""&&(E+="="+encodeURIComponent(String(R[d]))),s.push(E)}}return this.i=s.join("&")};function Rt(s,a){return a=String(a),s.j&&(a=a.toLowerCase()),a}function Eu(s,a){a&&!s.j&&(Ge(s),s.i=null,s.g.forEach(function(l,d){var E=d.toLowerCase();d!=E&&(so(this,d),ao(this,E,l))},s)),s.j=a}function Tu(s,a){const l=new rn;if(u.Image){const d=new Image;d.onload=C(Ke,l,"TestLoadImage: loaded",!0,a,d),d.onerror=C(Ke,l,"TestLoadImage: error",!1,a,d),d.onabort=C(Ke,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=C(Ke,l,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=s}else a(!1)}function wu(s,a){const l=new rn,d=new AbortController,E=setTimeout(()=>{d.abort(),Ke(l,"TestPingServer: timeout",!1,a)},1e4);fetch(s,{signal:d.signal}).then(w=>{clearTimeout(E),w.ok?Ke(l,"TestPingServer: ok",!0,a):Ke(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(E),Ke(l,"TestPingServer: error",!1,a)})}function Ke(s,a,l,d,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),d(l)}catch(w){}}function Au(){this.g=new ou}function bu(s,a,l){const d=l||"";try{to(s,function(E,w){let R=E;f(E)&&(R=Kr(E)),a.push(d+w+"="+encodeURIComponent(R))})}catch(E){throw a.push(d+"type="+encodeURIComponent("_badmap")),E}}function Kn(s){this.l=s.Ub||null,this.j=s.eb||!1}k(Kn,Wr),Kn.prototype.g=function(){return new Wn(this.l,this.j)},Kn.prototype.i=(function(s){return function(){return s}})({});function Wn(s,a){ae.call(this),this.D=s,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Wn,ae),n=Wn.prototype,n.open=function(s,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=s,this.A=a,this.readyState=1,un(this)},n.send=function(s){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};s&&(a.body=s),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ln(this)),this.readyState=0},n.Sa=function(s){if(this.g&&(this.l=s,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=s.headers,this.readyState=2,un(this)),this.g&&(this.readyState=3,un(this),this.g)))if(this.responseType==="arraybuffer")s.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in s){if(this.j=s.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;co(this)}else s.text().then(this.Ra.bind(this),this.ga.bind(this))};function co(s){s.j.read().then(s.Pa.bind(s)).catch(s.ga.bind(s))}n.Pa=function(s){if(this.g){if(this.o&&s.value)this.response.push(s.value);else if(!this.o){var a=s.value?s.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!s.done}))&&(this.response=this.responseText+=a)}s.done?ln(this):un(this),this.readyState==3&&co(this)}},n.Ra=function(s){this.g&&(this.response=this.responseText=s,ln(this))},n.Qa=function(s){this.g&&(this.response=s,ln(this))},n.ga=function(){this.g&&ln(this)};function ln(s){s.readyState=4,s.l=null,s.j=null,s.v=null,un(s)}n.setRequestHeader=function(s,a){this.u.append(s,a)},n.getResponseHeader=function(s){return this.h&&this.h.get(s.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const s=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,s.push(l[0]+": "+l[1]),l=a.next();return s.join("\r\n")};function un(s){s.onreadystatechange&&s.onreadystatechange.call(s)}Object.defineProperty(Wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(s){this.m=s?"include":"same-origin"}});function lo(s){let a="";return Y(s,function(l,d){a+=d,a+=":",a+=l,a+="\r\n"}),a}function ii(s,a,l){e:{for(d in l){var d=!1;break e}d=!0}d||(l=lo(l),typeof s=="string"?l!=null&&encodeURIComponent(String(l)):H(s,a,l))}function z(s){ae.call(this),this.headers=new Map,this.o=s||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(z,ae);var Su=/^https?$/i,Ru=["POST","PUT"];n=z.prototype,n.Ha=function(s){this.J=s},n.ea=function(s,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+s);a=a?a.toUpperCase():"GET",this.D=s,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Xr.g(),this.v=this.o?Fs(this.o):Fs(Xr),this.g.onreadystatechange=S(this.Ea,this);try{this.B=!0,this.g.open(a,String(s),!0),this.B=!1}catch(w){uo(this,w);return}if(s=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var E in d)l.set(E,d[E]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const w of d.keys())l.set(w,d.get(w));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(w=>w.toLowerCase()=="content-type"),E=u.FormData&&s instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Ru,a,void 0))||d||E||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[w,R]of l)this.g.setRequestHeader(w,R);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{po(this),this.u=!0,this.g.send(s),this.u=!1}catch(w){uo(this,w)}};function uo(s,a){s.h=!1,s.g&&(s.j=!0,s.g.abort(),s.j=!1),s.l=a,s.m=5,ho(s),Qn(s)}function ho(s){s.A||(s.A=!0,pe(s,"complete"),pe(s,"error"))}n.abort=function(s){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=s||7,pe(this,"complete"),pe(this,"abort"),Qn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Qn(this,!0)),z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?fo(this):this.bb())},n.bb=function(){fo(this)};function fo(s){if(s.h&&typeof c<"u"&&(!s.v[1]||Le(s)!=4||s.Z()!=2)){if(s.u&&Le(s)==4)Ms(s.Ea,0,s);else if(pe(s,"readystatechange"),Le(s)==4){s.h=!1;try{const R=s.Z();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var d;if(d=R===0){var E=String(s.D).match(no)[1]||null;!E&&u.self&&u.self.location&&(E=u.self.location.protocol.slice(0,-1)),d=!Su.test(E?E.toLowerCase():"")}l=d}if(l)pe(s,"complete"),pe(s,"success");else{s.m=6;try{var w=2<Le(s)?s.g.statusText:""}catch($){w=""}s.l=w+" ["+s.Z()+"]",ho(s)}}finally{Qn(s)}}}}function Qn(s,a){if(s.g){po(s);const l=s.g,d=s.v[0]?()=>{}:null;s.g=null,s.v=null,a||pe(s,"ready");try{l.onreadystatechange=d}catch(E){}}}function po(s){s.I&&(u.clearTimeout(s.I),s.I=null)}n.isActive=function(){return!!this.g};function Le(s){return s.g?s.g.readyState:0}n.Z=function(){try{return 2<Le(this)?this.g.status:-1}catch(s){return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch(s){return""}},n.Oa=function(s){if(this.g){var a=this.g.responseText;return s&&a.indexOf(s)==0&&(a=a.substring(s.length)),su(a)}};function go(s){try{if(!s.g)return null;if("response"in s.g)return s.g.response;switch(s.H){case"":case"text":return s.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in s.g)return s.g.mozResponseArrayBuffer}return null}catch(a){return null}}function Cu(s){const a={};s=(s.g&&2<=Le(s)&&s.g.getAllResponseHeaders()||"").split("\r\n");for(let d=0;d<s.length;d++){if(W(s[d]))continue;var l=v(s[d]);const E=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const w=a[E]||[];a[E]=w,w.push(l)}I(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function hn(s,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[s]||a}function mo(s){this.Aa=0,this.i=[],this.j=new rn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=hn("failFast",!1,s),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=hn("baseRetryDelayMs",5e3,s),this.cb=hn("retryDelaySeedMs",1e4,s),this.Wa=hn("forwardChannelMaxRetries",2,s),this.wa=hn("forwardChannelRequestTimeoutMs",2e4,s),this.pa=s&&s.xmlHttpFactory||void 0,this.Xa=s&&s.Tb||void 0,this.Ca=s&&s.useFetchStreams||!1,this.L=void 0,this.J=s&&s.supportsCrossDomainXhr||!1,this.K="",this.h=new Js(s&&s.concurrentRequestLimit),this.Da=new Au,this.P=s&&s.fastHandshake||!1,this.O=s&&s.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=s&&s.Rb||!1,s&&s.xa&&this.j.xa(),s&&s.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&s&&s.detectBufferingProxy||!1,this.ja=void 0,s&&s.longPollingTimeout&&0<s.longPollingTimeout&&(this.ja=s.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=mo.prototype,n.la=8,n.G=1,n.connect=function(s,a,l,d){ge(0),this.W=s,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=bo(this,null,this.W),Xn(this)};function si(s){if(yo(s),s.G==3){var a=s.U++,l=Ve(s.I);if(H(l,"SID",s.K),H(l,"RID",a),H(l,"TYPE","terminate"),dn(s,l),a=new ze(s,s.j,a),a.L=2,a.v=Gn(Ve(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.v.toString(),"")}catch(d){}!l&&u.Image&&(new Image().src=a.v,l=!0),l||(a.g=So(a.j,null),a.g.ea(a.v)),a.F=Date.now(),Hn(a)}Ao(s)}function Jn(s){s.g&&(ai(s),s.g.cancel(),s.g=null)}function yo(s){Jn(s),s.u&&(u.clearTimeout(s.u),s.u=null),Yn(s),s.h.cancel(),s.s&&(typeof s.s=="number"&&u.clearTimeout(s.s),s.s=null)}function Xn(s){if(!Xs(s.h)&&!s.s){s.s=!0;var a=s.Ga;Jt||Ps(),Xt||(Jt(),Xt=!0),Ur.add(a,s),s.B=0}}function Pu(s,a){return Ys(s.h)>=s.h.j-(s.s?1:0)?!1:s.s?(s.i=a.D.concat(s.i),!0):s.G==1||s.G==2||s.B>=(s.Va?0:s.Wa)?!1:(s.s=nn(S(s.Ga,s,a),wo(s,s.B)),s.B++,!0)}n.Ga=function(s){if(this.s)if(this.s=null,this.G==1){if(!s){this.U=Math.floor(1e5*Math.random()),s=this.U++;const E=new ze(this,this.j,s);let w=this.o;if(this.S&&(w?(w=p(w),y(w,this.S)):w=this.S),this.m!==null||this.O||(E.H=w,w=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=vo(this,E,a),l=Ve(this.I),H(l,"RID",s),H(l,"CVER",22),this.D&&H(l,"X-HTTP-Session-Id",this.D),dn(this,l),w&&(this.O?a="headers="+encodeURIComponent(String(lo(w)))+"&"+a:this.m&&ii(l,this.m,w)),ri(this.h,E),this.Ua&&H(l,"TYPE","init"),this.P?(H(l,"$req",a),H(l,"SID","null"),E.T=!0,Zr(E,l,null)):Zr(E,l,a),this.G=2}}else this.G==3&&(s?_o(this,s):this.i.length==0||Xs(this.h)||_o(this))};function _o(s,a){var l;a?l=a.l:l=s.U++;const d=Ve(s.I);H(d,"SID",s.K),H(d,"RID",l),H(d,"AID",s.T),dn(s,d),s.m&&s.o&&ii(d,s.m,s.o),l=new ze(s,s.j,l,s.B+1),s.m===null&&(l.H=s.o),a&&(s.i=a.D.concat(s.i)),a=vo(s,l,1e3),l.I=Math.round(.5*s.wa)+Math.round(.5*s.wa*Math.random()),ri(s.h,l),Zr(l,d,a)}function dn(s,a){s.H&&Y(s.H,function(l,d){H(a,d,l)}),s.l&&to({},function(l,d){H(a,d,l)})}function vo(s,a,l){l=Math.min(s.i.length,l);var d=s.l?S(s.l.Na,s.l,s):null;e:{var E=s.i;let w=-1;for(;;){const R=["count="+l];w==-1?0<l?(w=E[0].g,R.push("ofs="+w)):w=0:R.push("ofs="+w);let $=!0;for(let te=0;te<l;te++){let U=E[te].g;const ce=E[te].map;if(U-=w,0>U)w=Math.max(0,E[te].g-100),$=!1;else try{bu(ce,R,"req"+U+"_")}catch(le){d&&d(ce)}}if($){d=R.join("&");break e}}}return s=s.i.splice(0,l),a.D=s,d}function Io(s){if(!s.g&&!s.u){s.Y=1;var a=s.Fa;Jt||Ps(),Xt||(Jt(),Xt=!0),Ur.add(a,s),s.v=0}}function oi(s){return s.g||s.u||3<=s.v?!1:(s.Y++,s.u=nn(S(s.Fa,s),wo(s,s.v)),s.v++,!0)}n.Fa=function(){if(this.u=null,Eo(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var s=2*this.R;this.j.info("BP detection timer enabled: "+s),this.A=nn(S(this.ab,this),s)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ge(10),Jn(this),Eo(this))};function ai(s){s.A!=null&&(u.clearTimeout(s.A),s.A=null)}function Eo(s){s.g=new ze(s,s.j,"rpc",s.Y),s.m===null&&(s.g.H=s.o),s.g.O=0;var a=Ve(s.qa);H(a,"RID","rpc"),H(a,"SID",s.K),H(a,"AID",s.T),H(a,"CI",s.F?"0":"1"),!s.F&&s.ja&&H(a,"TO",s.ja),H(a,"TYPE","xmlhttp"),dn(s,a),s.m&&s.o&&ii(a,s.m,s.o),s.L&&(s.g.I=s.L);var l=s.g;s=s.ia,l.L=1,l.v=Gn(Ve(a)),l.m=null,l.P=!0,Ks(l,s)}n.Za=function(){this.C!=null&&(this.C=null,Jn(this),oi(this),ge(19))};function Yn(s){s.C!=null&&(u.clearTimeout(s.C),s.C=null)}function To(s,a){var l=null;if(s.g==a){Yn(s),ai(s),s.g=null;var d=2}else if(ni(s.h,a))l=a.D,Zs(s.h,a),d=1;else return;if(s.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var E=s.B;d=Bn(),pe(d,new Hs(d,l)),Xn(s)}else Io(s);else if(E=a.s,E==3||E==0&&0<a.X||!(d==1&&Pu(s,a)||d==2&&oi(s)))switch(l&&0<l.length&&(a=s.h,a.i=a.i.concat(l)),E){case 1:ht(s,5);break;case 4:ht(s,10);break;case 3:ht(s,6);break;default:ht(s,2)}}}function wo(s,a){let l=s.Ta+Math.floor(Math.random()*s.cb);return s.isActive()||(l*=2),l*a}function ht(s,a){if(s.j.info("Error code "+a),a==2){var l=S(s.fb,s),d=s.Xa;const E=!d;d=new ut(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||qn(d,"https"),Gn(d),E?Tu(d.toString(),l):wu(d.toString(),l)}else ge(2);s.G=0,s.l&&s.l.sa(a),Ao(s),yo(s)}n.fb=function(s){s?(this.j.info("Successfully pinged google.com"),ge(2)):(this.j.info("Failed to ping google.com"),ge(1))};function Ao(s){if(s.G=0,s.ka=[],s.l){const a=eo(s.h);(a.length!=0||s.i.length!=0)&&(N(s.ka,a),N(s.ka,s.i),s.h.i.length=0,F(s.i),s.i.length=0),s.l.ra()}}function bo(s,a,l){var d=l instanceof ut?Ve(l):new ut(l);if(d.g!="")a&&(d.g=a+"."+d.g),zn(d,d.s);else{var E=u.location;d=E.protocol,a=a?a+"."+E.hostname:E.hostname,E=+E.port;var w=new ut(null);d&&qn(w,d),a&&(w.g=a),E&&zn(w,E),l&&(w.l=l),d=w}return l=s.D,a=s.ya,l&&a&&H(d,l,a),H(d,"VER",s.la),dn(s,d),d}function So(s,a,l){if(a&&!s.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=s.Ca&&!s.pa?new z(new Kn({eb:l})):new z(s.pa),a.Ha(s.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ro(){}n=Ro.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Zn(){}Zn.prototype.g=function(s,a){return new ve(s,a)};function ve(s,a){ae.call(this),this.g=new mo(a),this.l=s,this.h=a&&a.messageUrlParams||null,s=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(s?s["X-Client-Protocol"]="webchannel":s={"X-Client-Protocol":"webchannel"}),this.g.o=s,s=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(s?s["X-WebChannel-Content-Type"]=a.messageContentType:s={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(s?s["X-WebChannel-Client-Profile"]=a.va:s={"X-WebChannel-Client-Profile":a.va}),this.g.S=s,(s=a&&a.Sb)&&!W(s)&&(this.g.m=s),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!W(a)&&(this.g.D=a,s=this.h,s!==null&&a in s&&(s=this.h,a in s&&delete s[a])),this.j=new Ct(this)}k(ve,ae),ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ve.prototype.close=function(){si(this.g)},ve.prototype.o=function(s){var a=this.g;if(typeof s=="string"){var l={};l.__data__=s,s=l}else this.u&&(l={},l.__data__=Kr(s),s=l);a.i.push(new du(a.Ya++,s)),a.G==3&&Xn(a)},ve.prototype.N=function(){this.g.l=null,delete this.j,si(this.g),delete this.g,ve.aa.N.call(this)};function Co(s){Qr.call(this),s.__headers__&&(this.headers=s.__headers__,this.statusCode=s.__status__,delete s.__headers__,delete s.__status__);var a=s.__sm__;if(a){e:{for(const l in a){s=l;break e}s=void 0}(this.i=s)&&(s=this.i,a=a!==null&&s in a?a[s]:void 0),this.data=a}else this.data=s}k(Co,Qr);function Po(){Jr.call(this),this.status=1}k(Po,Jr);function Ct(s){this.g=s}k(Ct,Ro),Ct.prototype.ua=function(){pe(this.g,"a")},Ct.prototype.ta=function(s){pe(this.g,new Co(s))},Ct.prototype.sa=function(s){pe(this.g,new Po)},Ct.prototype.ra=function(){pe(this.g,"b")},Zn.prototype.createWebChannel=Zn.prototype.g,ve.prototype.send=ve.prototype.o,ve.prototype.open=ve.prototype.m,ve.prototype.close=ve.prototype.close,lc=function(){return new Zn},cc=function(){return Bn()},ac=ct,ki={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},jn.NO_ERROR=0,jn.TIMEOUT=8,jn.HTTP_ERROR=6,ar=jn,qs.COMPLETE="complete",oc=qs,Us.EventType=en,en.OPEN="a",en.CLOSE="b",en.ERROR="c",en.MESSAGE="d",ae.prototype.listen=ae.prototype.K,gn=Us,z.prototype.listenOnce=z.prototype.L,z.prototype.getLastError=z.prototype.Ka,z.prototype.getLastErrorCode=z.prototype.Ba,z.prototype.getStatus=z.prototype.Z,z.prototype.getResponseJson=z.prototype.Oa,z.prototype.getResponseText=z.prototype.oa,z.prototype.send=z.prototype.ea,z.prototype.setWithCredentials=z.prototype.Ha,sc=z}).apply(typeof tr<"u"?tr:typeof self<"u"?self:typeof window<"u"?window:{});const $o="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}he.UNAUTHENTICATED=new he(null),he.GOOGLE_CREDENTIALS=new he("google-credentials-uid"),he.FIRST_PARTY=new he("first-party-uid"),he.MOCK_USER=new he("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gt="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Dr("@firebase/firestore");function fn(){return vt.logLevel}function D(n,...e){if(vt.logLevel<=V.DEBUG){const t=e.map(Wi);vt.debug("Firestore (".concat(Gt,"): ").concat(n),...t)}}function kn(n,...e){if(vt.logLevel<=V.ERROR){const t=e.map(Wi);vt.error("Firestore (".concat(Gt,"): ").concat(n),...t)}}function gr(n,...e){if(vt.logLevel<=V.WARN){const t=e.map(Wi);vt.warn("Firestore (".concat(Gt,"): ").concat(n),...t)}}function Wi(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch(e){return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n="Unexpected state"){const e="FIRESTORE (".concat(Gt,") INTERNAL ASSERTION FAILED: ")+n;throw kn(e),new Error(e)}function ye(n,e){n||B()}function se(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Ce{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(e))}}class fd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(he.UNAUTHENTICATED)))}shutdown(){}}class pd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class gd{constructor(e){this.t=e,this.currentUser=he.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ye(this.o===void 0);let r=this.i;const i=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new Nt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Nt,e.enqueueRetryable((()=>i(this.currentUser)))};const c=()=>{const h=o;e.enqueueRetryable((async()=>{await h.promise,await i(this.currentUser)}))},u=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Nt)}}),0),c()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ye(typeof r.accessToken=="string"),new uc(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ye(e===null||typeof e=="string"),new he(e)}}class md{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=he.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class yd{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new md(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(he.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class _d{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class vd{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ye(this.o===void 0);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: ".concat(o.error.message));const c=o.token!==this.R;return this.R=o.token,D("FirebaseAppCheckTokenProvider","Received ".concat(c?"new":"existing"," token.")),c?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>r(o)))};const i=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((o=>i(o))),setTimeout((()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ye(typeof t.token=="string"),this.R=t.token,new _d(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=Id(40);for(let o=0;o<i.length;++o)r.length<20&&i[o]<t&&(r+=e.charAt(i[o]%e.length))}return r}}function q(n,e){return n<e?-1:n>e?1:0}function xt(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ee.fromMillis(Date.now())}static fromDate(e){return Ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Ee(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.timestamp=e}static fromTimestamp(e){return new G(e)}static min(){return new G(new Ee(0,0))}static max(){return new G(new Ee(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(),r===void 0?r=e.length-t:r>e.length-t&&B(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return An.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof An?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const o=e.get(i),c=t.get(i);if(o<c)return-1;if(o>c)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ie extends An{construct(e,t,r){return new ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(P.INVALID_ARGUMENT,"Invalid segment (".concat(r,"). Paths must not contain // in them."));t.push(...r.split("/").filter((i=>i.length>0)))}return new ie(t)}static emptyPath(){return new ie([])}}const Td=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class me extends An{construct(e,t,r){return new me(e,t,r)}static isValidIdentifier(e){return Td.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),me.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new me(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const o=()=>{if(r.length===0)throw new M(P.INVALID_ARGUMENT,"Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));t.push(r),r=""};let c=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new M(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[i+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new M(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,i+=2}else u==="`"?(c=!c,i++):u!=="."||c?(r+=u,i++):(o(),i++)}if(o(),c)throw new M(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new me(t)}static emptyPath(){return new me([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(ie.fromString(e))}static fromName(e){return new x(ie.fromString(e).popFirst(5))}static empty(){return new x(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new ie(e.slice()))}}function wd(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=G.fromTimestamp(r===1e9?new Ee(t+1,0):new Ee(t,r));return new it(i,x.empty(),e)}function Ad(n){return new it(n.readTime,n.key,-1)}class it{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new it(G.min(),x.empty(),-1)}static max(){return new it(G.max(),x.empty(),-1)}}function bd(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:q(n.largestBatchId,e.largestBatchId))}class Sd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b(((r,i)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,i)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):b.reject(t)}static resolve(e){return new b(((t,r)=>{t(e)}))}static reject(e){return new b(((t,r)=>{r(e)}))}static waitFor(e){return new b(((t,r)=>{let i=0,o=0,c=!1;e.forEach((u=>{++i,u.next((()=>{++o,c&&o===i&&t()}),(h=>r(h)))})),c=!0,o===i&&t()}))}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next((i=>i?b.resolve(i):r()));return t}static forEach(e,t){const r=[];return e.forEach(((i,o)=>{r.push(t.call(this,i,o))})),this.waitFor(r)}static mapArray(e,t){return new b(((r,i)=>{const o=e.length,c=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next((_=>{c[f]=_,++u,u===o&&r(c)}),(_=>i(_)))}}))}static doWhile(e,t){return new b(((r,i)=>{const o=()=>{e()===!0?t().next((()=>{o()}),i):r()};o()}))}}function Rd(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Qi(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}hc.oe=-1;function Ji(n){return n==null}function Di(n){return n===0&&1/n==-1/0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Xi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Cd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||ne.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ne.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ne.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push("".concat(t,":").concat(r)),!1))),"{".concat(e.join(", "),"}")}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new nr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new nr(this.root,e,this.comparator,!1)}getReverseIterator(){return new nr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new nr(this.root,e,this.comparator,!0)}}class nr{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&i&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ne{constructor(e,t,r,i,o){this.key=e,this.value=t,this.color=r!=null?r:ne.RED,this.left=i!=null?i:ne.EMPTY,this.right=o!=null?o:ne.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,o){return new ne(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const o=r(e,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(e,t,r),null):o===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ne.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return ne.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ne.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ne.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}}ne.EMPTY=null,ne.RED=!0,ne.BLACK=!1;ne.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,r,i,o){return this}insert(e,t,r){return new ne(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new qo(this.data.getIterator())}getIteratorFrom(e){return new qo(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,o=r.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class qo{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new et([])}unionWith(e){let t=new de(me.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new et(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return xt(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Pd("Invalid base64 string: "+o):o}})(e);return new st(t)}static fromUint8Array(e){const t=(function(i){let o="";for(let c=0;c<i.length;++c)o+=String.fromCharCode(i[c]);return o})(e);return new st(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}st.EMPTY_BYTE_STRING=new st("");const kd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function It(n){if(ye(!!n),typeof n=="string"){let e=0;const t=kd.exec(n);if(ye(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function bn(n){return typeof n=="string"?st.fromBase64String(n):st.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function dc(n){const e=n.mapValue.fields.__previous_value__;return Yi(e)?dc(e):e}function mr(n){const e=It(n.mapValue.fields.__local_write_time__.timestampValue);return new Ee(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(e,t,r,i,o,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=o,this.forceLongPolling=c,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class yr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new yr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof yr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rr={mapValue:{}};function Ft(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Yi(n)?4:Nd(n)?9007199254740991:Od(n)?10:11:B()}function Ne(n,e){if(n===e)return!0;const t=Ft(n);if(t!==Ft(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return mr(n).isEqual(mr(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const c=It(i.timestampValue),u=It(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return bn(i.bytesValue).isEqual(bn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return re(i.geoPointValue.latitude)===re(o.geoPointValue.latitude)&&re(i.geoPointValue.longitude)===re(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o){if("integerValue"in i&&"integerValue"in o)return re(i.integerValue)===re(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const c=re(i.doubleValue),u=re(o.doubleValue);return c===u?Di(c)===Di(u):isNaN(c)&&isNaN(u)}return!1})(n,e);case 9:return xt(n.arrayValue.values||[],e.arrayValue.values||[],Ne);case 10:case 11:return(function(i,o){const c=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Ho(c)!==Ho(u))return!1;for(const h in c)if(c.hasOwnProperty(h)&&(u[h]===void 0||!Ne(c[h],u[h])))return!1;return!0})(n,e);default:return B()}}function Sn(n,e){return(n.values||[]).find((t=>Ne(t,e)))!==void 0}function Ut(n,e){if(n===e)return 0;const t=Ft(n),r=Ft(e);if(t!==r)return q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(n.booleanValue,e.booleanValue);case 2:return(function(o,c){const u=re(o.integerValue||o.doubleValue),h=re(c.integerValue||c.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,e);case 3:return zo(n.timestampValue,e.timestampValue);case 4:return zo(mr(n),mr(e));case 5:return q(n.stringValue,e.stringValue);case 6:return(function(o,c){const u=bn(o),h=bn(c);return u.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(o,c){const u=o.split("/"),h=c.split("/");for(let f=0;f<u.length&&f<h.length;f++){const _=q(u[f],h[f]);if(_!==0)return _}return q(u.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(o,c){const u=q(re(o.latitude),re(c.latitude));return u!==0?u:q(re(o.longitude),re(c.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Go(n.arrayValue,e.arrayValue);case 10:return(function(o,c){var u,h,f,_;const A=o.fields||{},S=c.fields||{},C=(u=A.value)===null||u===void 0?void 0:u.arrayValue,k=(h=S.value)===null||h===void 0?void 0:h.arrayValue,F=q(((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0,((_=k==null?void 0:k.values)===null||_===void 0?void 0:_.length)||0);return F!==0?F:Go(C,k)})(n.mapValue,e.mapValue);case 11:return(function(o,c){if(o===rr.mapValue&&c===rr.mapValue)return 0;if(o===rr.mapValue)return 1;if(c===rr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=c.fields||{},_=Object.keys(f);h.sort(),_.sort();for(let A=0;A<h.length&&A<_.length;++A){const S=q(h[A],_[A]);if(S!==0)return S;const C=Ut(u[h[A]],f[_[A]]);if(C!==0)return C}return q(h.length,_.length)})(n.mapValue,e.mapValue);default:throw B()}}function zo(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return q(n,e);const t=It(n),r=It(e),i=q(t.seconds,r.seconds);return i!==0?i:q(t.nanos,r.nanos)}function Go(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const o=Ut(t[i],r[i]);if(o)return o}return q(t.length,r.length)}function Bt(n){return Oi(n)}function Oi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=It(t);return"time(".concat(r.seconds,",").concat(r.nanos,")")})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return bn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return x.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return"geo(".concat(t.latitude,",").concat(t.longitude,")")})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const o of t.values||[])i?i=!1:r+=",",r+=Oi(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",o=!0;for(const c of r)o?o=!1:i+=",",i+="".concat(c,":").concat(Oi(t.fields[c]));return i+"}"})(n.mapValue):B()}function Ni(n){return!!n&&"integerValue"in n}function Zi(n){return!!n&&"arrayValue"in n}function pi(n){return!!n&&"mapValue"in n}function Od(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function mn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Xi(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=mn(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=mn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Nd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!pi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=mn(t)}setAll(e){let t=me.emptyPath(),r={},i=[];e.forEach(((c,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,i),r={},i=[],t=u.popLast()}c?r[u.lastSegment()]=mn(c):i.push(u.lastSegment())}));const o=this.getFieldsMap(t);this.applyChanges(o,r,i)}delete(e){const t=this.field(e.popLast());pi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ne(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];pi(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Xi(t,((i,o)=>e[i]=o));for(const i of r)delete e[i]}clone(){return new xe(mn(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,i,o,c,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=o,this.data=c,this.documentState=u}static newInvalidDocument(e){return new Se(e,0,G.min(),G.min(),G.min(),xe.empty(),0)}static newFoundDocument(e,t,r,i){return new Se(e,1,t,G.min(),r,i,0)}static newNoDocument(e,t){return new Se(e,2,t,G.min(),G.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,G.min(),G.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(e,t){this.position=e,this.inclusive=t}}function Ko(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const o=e[i],c=n.position[i];if(o.field.isKeyField()?r=x.comparator(x.fromName(c.referenceValue),t.key):r=Ut(c,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Wo(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ne(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Md(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{}class ee extends fc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ld(e,t,r):t==="array-contains"?new Ud(e,r):t==="in"?new Bd(e,r):t==="not-in"?new jd(e,r):t==="array-contains-any"?new $d(e,r):new ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new xd(e,r):new Fd(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ut(t,this.value)):t!==null&&Ft(this.value)===Ft(t)&&this.matchesComparison(Ut(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ot extends fc{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ot(e,t)}matches(e){return pc(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function pc(n){return n.op==="and"}function gc(n){return Vd(n)&&pc(n)}function Vd(n){for(const e of n.filters)if(e instanceof ot)return!1;return!0}function Mi(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+Bt(n.value);if(gc(n))return n.filters.map((e=>Mi(e))).join(",");{const e=n.filters.map((t=>Mi(t))).join(",");return"".concat(n.op,"(").concat(e,")")}}function mc(n,e){return n instanceof ee?(function(r,i){return i instanceof ee&&r.op===i.op&&r.field.isEqual(i.field)&&Ne(r.value,i.value)})(n,e):n instanceof ot?(function(r,i){return i instanceof ot&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((o,c,u)=>o&&mc(c,i.filters[u])),!0):!1})(n,e):void B()}function yc(n){return n instanceof ee?(function(t){return"".concat(t.field.canonicalString()," ").concat(t.op," ").concat(Bt(t.value))})(n):n instanceof ot?(function(t){return t.op.toString()+" {"+t.getFilters().map(yc).join(" ,")+"}"})(n):"Filter"}class Ld extends ee{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class xd extends ee{constructor(e,t){super(e,"in",t),this.keys=_c("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Fd extends ee{constructor(e,t){super(e,"not-in",t),this.keys=_c("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function _c(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>x.fromName(r.referenceValue)))}class Ud extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Zi(t)&&Sn(t.arrayValue,this.value)}}class Bd extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Sn(this.value.arrayValue,t)}}class jd extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(Sn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Sn(this.value.arrayValue,t)}}class $d extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Zi(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Sn(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t=null,r=[],i=[],o=null,c=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=o,this.startAt=c,this.endAt=u,this.ue=null}}function Qo(n,e=null,t=[],r=[],i=null,o=null,c=null){return new Hd(n,e,t,r,i,o,c)}function es(n){const e=se(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Mi(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Ji(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Bt(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Bt(r))).join(",")),e.ue=t}return e.ue}function ts(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Md(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!mc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Wo(n.startAt,e.startAt)&&Wo(n.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e,t=null,r=[],i=[],o=null,c="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=o,this.limitType=c,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function qd(n,e,t,r,i,o,c,u){return new ns(n,e,t,r,i,o,c,u)}function Jo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function zd(n){return n.collectionGroup!==null}function yn(n){const e=se(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let u=new de(me.comparator);return c.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(e).forEach((o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new vr(o,r))})),t.has(me.keyField().canonicalString())||e.ce.push(new vr(me.keyField(),r))}return e.ce}function mt(n){const e=se(n);return e.le||(e.le=Gd(e,yn(n))),e.le}function Gd(n,e){if(n.limitType==="F")return Qo(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const o=i.dir==="desc"?"asc":"desc";return new vr(i.field,o)}));const t=n.endAt?new _r(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new _r(n.startAt.position,n.startAt.inclusive):null;return Qo(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Vi(n,e,t){return new ns(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function vc(n,e){return ts(mt(n),mt(e))&&n.limitType===e.limitType}function Ic(n){return"".concat(es(mt(n)),"|lt:").concat(n.limitType)}function pn(n){return"Query(target=".concat((function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=", filters: [".concat(t.filters.map((i=>yc(i))).join(", "),"]")),Ji(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=", orderBy: [".concat(t.orderBy.map((i=>(function(c){return"".concat(c.field.canonicalString()," (").concat(c.dir,")")})(i))).join(", "),"]")),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Bt(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Bt(i))).join(",")),"Target(".concat(r,")")})(mt(n)),"; limitType=").concat(n.limitType,")")}function rs(n,e){return e.isFoundDocument()&&(function(r,i){const o=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,e)&&(function(r,i){for(const o of yn(r))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const o of r.filters)if(!o.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(c,u,h){const f=Ko(c,u,h);return c.inclusive?f<=0:f<0})(r.startAt,yn(r),i)||r.endAt&&!(function(c,u,h){const f=Ko(c,u,h);return c.inclusive?f>=0:f>0})(r.endAt,yn(r),i))})(n,e)}function Kd(n){return(e,t)=>{let r=!1;for(const i of yn(n)){const o=Wd(i,e,t);if(o!==0)return o;r=r||i.field.isKeyField()}return 0}}function Wd(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):(function(o,c,u){const h=c.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Ut(h,f):B()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,o]of r)if(this.equalsFn(i,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],e))return void(i[o]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Xi(this.inner,((t,r)=>{for(const[i,o]of r)e(i,o)}))}isEmpty(){return Cd(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd=new Ae(x.comparator);function Li(){return Qd}const Ec=new Ae(x.comparator);function ir(...n){let e=Ec;for(const t of n)e=e.insert(t.key,t);return e}function Jd(n){let e=Ec;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function ft(){return _n()}function Tc(){return _n()}function _n(){return new Kt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Xd=new de(x.comparator);function Ie(...n){let e=Xd;for(const t of n)e=e.add(t);return e}const Yd=new de(q);function Zd(){return Yd}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Di(e)?"-0":e}}function tf(n){return{integerValue:""+n}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(){this._=void 0}}function nf(n,e,t){return n instanceof xi?(function(i,o){const c={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&Yi(o)&&(o=dc(o)),o&&(c.fields.__previous_value__=o),{mapValue:c}})(t,e):n instanceof Ir?wc(n,e):n instanceof Er?Ac(n,e):(function(i,o){const c=sf(i,o),u=Xo(c)+Xo(i.Pe);return Ni(c)&&Ni(i.Pe)?tf(u):ef(i.serializer,u)})(n,e)}function rf(n,e,t){return n instanceof Ir?wc(n,e):n instanceof Er?Ac(n,e):t}function sf(n,e){return n instanceof Fi?(function(r){return Ni(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(e)?e:{integerValue:0}:null}class xi extends Or{}class Ir extends Or{constructor(e){super(),this.elements=e}}function wc(n,e){const t=bc(e);for(const r of n.elements)t.some((i=>Ne(i,r)))||t.push(r);return{arrayValue:{values:t}}}class Er extends Or{constructor(e){super(),this.elements=e}}function Ac(n,e){let t=bc(e);for(const r of n.elements)t=t.filter((i=>!Ne(i,r)));return{arrayValue:{values:t}}}class Fi extends Or{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Xo(n){return re(n.integerValue||n.doubleValue)}function bc(n){return Zi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function of(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof Ir&&i instanceof Ir||r instanceof Er&&i instanceof Er?xt(r.elements,i.elements,Ne):r instanceof Fi&&i instanceof Fi?Ne(r.Pe,i.Pe):r instanceof xi&&i instanceof xi})(n.transform,e.transform)}class yt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new yt}static exists(e){return new yt(void 0,e)}static updateTime(e){return new yt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function cr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class is{}function Sc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new cf(n.key,yt.none()):new ss(n.key,n.data,yt.none());{const t=n.data,r=xe.empty();let i=new de(me.comparator);for(let o of e.fields)if(!i.has(o)){let c=t.field(o);c===null&&o.length>1&&(o=o.popLast(),c=t.field(o)),c===null?r.delete(o):r.set(o,c),i=i.add(o)}return new Nr(n.key,r,new et(i.toArray()),yt.none())}}function af(n,e,t){n instanceof ss?(function(i,o,c){const u=i.value.clone(),h=Zo(i.fieldTransforms,o,c.transformResults);u.setAll(h),o.convertToFoundDocument(c.version,u).setHasCommittedMutations()})(n,e,t):n instanceof Nr?(function(i,o,c){if(!cr(i.precondition,o))return void o.convertToUnknownDocument(c.version);const u=Zo(i.fieldTransforms,o,c.transformResults),h=o.data;h.setAll(Rc(i)),h.setAll(u),o.convertToFoundDocument(c.version,h).setHasCommittedMutations()})(n,e,t):(function(i,o,c){o.convertToNoDocument(c.version).setHasCommittedMutations()})(0,e,t)}function vn(n,e,t,r){return n instanceof ss?(function(o,c,u,h){if(!cr(o.precondition,c))return u;const f=o.value.clone(),_=ea(o.fieldTransforms,h,c);return f.setAll(_),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null})(n,e,t,r):n instanceof Nr?(function(o,c,u,h){if(!cr(o.precondition,c))return u;const f=ea(o.fieldTransforms,h,c),_=c.data;return _.setAll(Rc(o)),_.setAll(f),c.convertToFoundDocument(c.version,_).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((A=>A.field)))})(n,e,t,r):(function(o,c,u){return cr(o.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):u})(n,e,t)}function Yo(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&xt(r,i,((o,c)=>of(o,c)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ss extends is{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Nr extends is{constructor(e,t,r,i,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Rc(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function Zo(n,e,t){const r=new Map;ye(n.length===t.length);for(let i=0;i<t.length;i++){const o=n[i],c=o.transform,u=e.data.field(o.field);r.set(o.field,rf(c,u,t[i]))}return r}function ea(n,e,t){const r=new Map;for(const i of n){const o=i.transform,c=t.data.field(i.field);r.set(i.field,nf(o,c,e))}return r}class cf extends is{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(e.key)&&af(o,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=vn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=vn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Tc();return this.mutations.forEach((i=>{const o=e.get(i.key),c=o.overlayedDocument;let u=this.applyToLocalView(c,o.mutatedFields);u=t.has(i.key)?null:u;const h=Sc(c,u);h!==null&&r.set(i.key,h),c.isValidDocument()||c.convertToNoDocument(G.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&xt(this.mutations,e.mutations,((t,r)=>Yo(t,r)))&&xt(this.baseMutations,e.baseMutations,((t,r)=>Yo(t,r)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return"Overlay{\n      largestBatchId: ".concat(this.largestBatchId,",\n      mutation: ").concat(this.mutation.toString(),"\n    }")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q,L;function hf(n){if(n===void 0)return kn("GRPC error has no .code"),P.UNKNOWN;switch(n){case Q.OK:return P.OK;case Q.CANCELLED:return P.CANCELLED;case Q.UNKNOWN:return P.UNKNOWN;case Q.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Q.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Q.INTERNAL:return P.INTERNAL;case Q.UNAVAILABLE:return P.UNAVAILABLE;case Q.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Q.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Q.NOT_FOUND:return P.NOT_FOUND;case Q.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Q.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Q.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Q.ABORTED:return P.ABORTED;case Q.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Q.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Q.DATA_LOSS:return P.DATA_LOSS;default:return B()}}(L=Q||(Q={}))[L.OK=0]="OK",L[L.CANCELLED=1]="CANCELLED",L[L.UNKNOWN=2]="UNKNOWN",L[L.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",L[L.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",L[L.NOT_FOUND=5]="NOT_FOUND",L[L.ALREADY_EXISTS=6]="ALREADY_EXISTS",L[L.PERMISSION_DENIED=7]="PERMISSION_DENIED",L[L.UNAUTHENTICATED=16]="UNAUTHENTICATED",L[L.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",L[L.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",L[L.ABORTED=10]="ABORTED",L[L.OUT_OF_RANGE=11]="OUT_OF_RANGE",L[L.UNIMPLEMENTED=12]="UNIMPLEMENTED",L[L.INTERNAL=13]="INTERNAL",L[L.UNAVAILABLE=14]="UNAVAILABLE",L[L.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new ic([4294967295,4294967295],0);class df{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ta(n){return ye(!!n),G.fromTimestamp((function(t){const r=It(t);return new Ee(r.seconds,r.nanos)})(n))}function na(n,e){const t=(function(i){return new ie(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function ff(n){const e=ie.fromString(n);return ye(yf(e)),e}function pf(n){const e=ff(n);return e.length===4?ie.emptyPath():gf(e)}function gf(n){return ye(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function mf(n){let e=pf(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){ye(r===1);const _=t.from[0];_.allDescendants?i=_.collectionId:e=e.child(_.collectionId)}let o=[];t.where&&(o=(function(A){const S=Cc(A);return S instanceof ot&&gc(S)?S.getFilters():[S]})(t.where));let c=[];t.orderBy&&(c=(function(A){return A.map((S=>(function(k){return new vr(kt(k.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(S)))})(t.orderBy));let u=null;t.limit&&(u=(function(A){let S;return S=typeof A=="object"?A.value:A,Ji(S)?null:S})(t.limit));let h=null;t.startAt&&(h=(function(A){const S=!!A.before,C=A.values||[];return new _r(C,S)})(t.startAt));let f=null;return t.endAt&&(f=(function(A){const S=!A.before,C=A.values||[];return new _r(C,S)})(t.endAt)),qd(e,i,c,o,u,"F",h,f)}function Cc(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=kt(t.unaryFilter.field);return ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=kt(t.unaryFilter.field);return ee.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=kt(t.unaryFilter.field);return ee.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const c=kt(t.unaryFilter.field);return ee.create(c,"!=",{nullValue:"NULL_VALUE"});default:return B()}})(n):n.fieldFilter!==void 0?(function(t){return ee.create(kt(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ot.create(t.compositeFilter.filters.map((r=>Cc(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return B()}})(t.compositeFilter.op))})(n):B()}function kt(n){return me.fromServerFormat(n.fieldPath)}function yf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(e){this.ct=e}}function vf(n){const e=mf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Vi(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.un=new Ef}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(it.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(it.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class Ef{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new de(ie.comparator),o=!i.has(r);return this.index[t]=i.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new de(ie.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new jt(0)}static kn(){return new jt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tf{constructor(){this.changes=new Kt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&vn(r.mutation,i,et.empty(),Ee.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const i=ft();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((o=>{let c=ir();return o.forEach(((u,h)=>{c=c.insert(u,h.overlayedDocument)})),c}))))}getOverlayedDocuments(e,t){const r=ft();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const i=[];return r.forEach((o=>{t.has(o)||i.push(o)})),this.documentOverlayCache.getOverlays(e,i).next((o=>{o.forEach(((c,u)=>{t.set(c,u)}))}))}computeViews(e,t,r,i){let o=Li();const c=_n(),u=(function(){return _n()})();return t.forEach(((h,f)=>{const _=r.get(f.key);i.has(f.key)&&(_===void 0||_.mutation instanceof Nr)?o=o.insert(f.key,f):_!==void 0?(c.set(f.key,_.mutation.getFieldMask()),vn(_.mutation,f,_.mutation.getFieldMask(),Ee.now())):c.set(f.key,et.empty())})),this.recalculateAndSaveOverlays(e,o).next((h=>(h.forEach(((f,_)=>c.set(f,_))),t.forEach(((f,_)=>{var A;return u.set(f,new wf(_,(A=c.get(f))!==null&&A!==void 0?A:null))})),u)))}recalculateAndSaveOverlays(e,t){const r=_n();let i=new Ae(((c,u)=>c-u)),o=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((c=>{for(const u of c)u.keys().forEach((h=>{const f=t.get(h);if(f===null)return;let _=r.get(h)||et.empty();_=u.applyToLocalView(f,_),r.set(h,_);const A=(i.get(u.batchId)||Ie()).add(h);i=i.insert(u.batchId,A)}))})).next((()=>{const c=[],u=i.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,_=h.value,A=Tc();_.forEach((S=>{if(!o.has(S)){const C=Sc(t.get(S),r.get(S));C!==null&&A.set(S,C),o=o.add(S)}})),c.push(this.documentOverlayCache.saveOverlays(e,f,A))}return b.waitFor(c)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return(function(c){return x.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):zd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((o=>{const c=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-o.size):b.resolve(ft());let u=-1,h=o;return c.next((f=>b.forEach(f,((_,A)=>(u<A.largestBatchId&&(u=A.largestBatchId),o.get(_)?b.resolve():this.remoteDocumentCache.getEntry(e,_).next((S=>{h=h.insert(_,S)}))))).next((()=>this.populateOverlays(e,f,o))).next((()=>this.computeViews(e,h,f,Ie()))).next((_=>({batchId:u,changes:Jd(_)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((r=>{let i=ir();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const o=t.collectionGroup;let c=ir();return this.indexManager.getCollectionParents(e,o).next((u=>b.forEach(u,(h=>{const f=(function(A,S){return new ns(S,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)})(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,i).next((_=>{_.forEach(((A,S)=>{c=c.insert(A,S)}))}))})).next((()=>c))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((c=>(o=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,i)))).next((c=>{o.forEach(((h,f)=>{const _=f.getKey();c.get(_)===null&&(c=c.insert(_,Se.newInvalidDocument(_)))}));let u=ir();return c.forEach(((h,f)=>{const _=o.get(h);_!==void 0&&vn(_.mutation,f,et.empty(),Ee.now()),rs(t,f)&&(u=u.insert(h,f))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:ta(i.createTime)}})(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:vf(i.bundledQuery),readTime:ta(i.readTime)}})(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(){this.overlays=new Ae(x.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ft();return b.forEach(t,(i=>this.getOverlay(e,i).next((o=>{o!==null&&r.set(i,o)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,o)=>{this.ht(e,t,o)})),b.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach((o=>this.overlays=this.overlays.remove(o))),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const i=ft(),o=t.length+1,c=new x(t.child("")),u=this.overlays.getIteratorFrom(c);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&i.set(h.getKey(),h)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let o=new Ae(((f,_)=>f-_));const c=this.overlays.getIterator();for(;c.hasNext();){const f=c.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let _=o.get(f.largestBatchId);_===null&&(_=ft(),o=o.insert(f.largestBatchId,_)),_.set(f.getKey(),f)}}const u=ft(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,_)=>u.set(f,_))),!(u.size()>=i)););return b.resolve(u)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const c=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,c)}this.overlays=this.overlays.insert(r.key,new uf(t,r));let o=this.Ir.get(t);o===void 0&&(o=Ie(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rf{constructor(){this.sessionToken=st.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(){this.Tr=new de(Z.Er),this.dr=new de(Z.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new Z(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new Z(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new x(new ie([])),r=new Z(t,e),i=new Z(t,e+1),o=[];return this.dr.forEachInRange([r,i],(c=>{this.Vr(c),o.push(c.key)})),o}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new x(new ie([])),r=new Z(t,e),i=new Z(t,e+1);let o=Ie();return this.dr.forEachInRange([r,i],(c=>{o=o.add(c.key)})),o}containsKey(e){const t=new Z(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Z{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return x.comparator(e.key,t.key)||q(e.wr,t.wr)}static Ar(e,t){return q(e.wr,t.wr)||x.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new de(Z.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const c=new lf(o,t,r,i);this.mutationQueue.push(c);for(const u of i)this.br=this.br.add(new Z(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return b.resolve(c)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),o=i<0?0:i;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Z(t,0),i=new Z(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,i],(c=>{const u=this.Dr(c.wr);o.push(u)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(q);return t.forEach((i=>{const o=new Z(i,0),c=new Z(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,c],(u=>{r=r.add(u.wr)}))})),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const c=new Z(new x(o),0);let u=new de(q);return this.br.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===i&&(u=u.add(h.wr)),!0)}),c),b.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach((r=>{const i=this.Dr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){ye(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(t.mutations,(i=>{const o=new Z(i.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new Z(t,0),i=this.br.firstAfterOrEqual(r);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(e){this.Mr=e,this.docs=(function(){return new Ae(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),o=i?i.size:0,c=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:c}),this.size+=c-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=Li();return t.forEach((i=>{const o=this.docs.get(i);r=r.insert(i,o?o.document.mutableCopy():Se.newInvalidDocument(i))})),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let o=Li();const c=t.path,u=new x(c.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:_}}=h.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||bd(Ad(_),r)<=0||(i.has(_.key)||rs(t,_))&&(o=o.insert(_.key,_.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(e,t,r,i){B()}Or(e,t){return b.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new kf(this)}getSize(e){return b.resolve(this.size)}}class kf extends Tf{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)})),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e){this.persistence=e,this.Nr=new Kt((t=>es(t)),ts),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.Lr=0,this.Br=new os,this.targetCount=0,this.kr=jt.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,i)=>t(i))),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new jt(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let i=0;const o=[];return this.Nr.forEach(((c,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(c),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)})),b.waitFor(o).next((()=>i))}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,o=[];return i&&t.forEach((c=>{o.push(i.markPotentiallyOrphaned(e,c))})),b.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(e,t){this.qr={},this.overlays={},this.Qr=new hc(0),this.Kr=!1,this.Kr=!0,this.$r=new Rf,this.referenceDelegate=e(this),this.Ur=new Df(this),this.indexManager=new If,this.remoteDocumentCache=(function(i){return new Pf(i)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new _f(t),this.Gr=new bf(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Sf,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Cf(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){D("MemoryPersistence","Starting transaction:",e);const i=new Nf(this.Qr.next());return this.referenceDelegate.zr(),r(i).next((o=>this.referenceDelegate.jr(i).next((()=>o)))).toPromise().then((o=>(i.raiseOnCommittedEvent(),o)))}Hr(e,t){return b.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class Nf extends Sd{constructor(e){super(),this.currentSequenceNumber=e}}class as{constructor(e){this.persistence=e,this.Jr=new os,this.Yr=null}static Zr(e){return new as(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((o=>this.Xr.add(o.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,(r=>{const i=x.fromPath(r);return this.ei(e,i).next((o=>{o||t.removeEntry(i,G.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=Ie(),i=Ie();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new cs(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Wu()?8:Rd(fe())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const o={result:null};return this.Yi(e,t).next((c=>{o.result=c})).next((()=>{if(!o.result)return this.Zi(e,t,i,r).next((c=>{o.result=c}))})).next((()=>{if(o.result)return;const c=new Mf;return this.Xi(e,t,c).next((u=>{if(o.result=u,this.zi)return this.es(e,t,c,u.size)}))})).next((()=>o.result))}es(e,t,r,i){return r.documentReadCount<this.ji?(fn()<=V.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",pn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(fn()<=V.DEBUG&&D("QueryEngine","Query:",pn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(fn()<=V.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",pn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,mt(t))):b.resolve())}Yi(e,t){if(Jo(t))return b.resolve(null);let r=mt(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=Vi(t,null,"F"),r=mt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((o=>{const c=Ie(...o);return this.Ji.getDocuments(e,c).next((u=>this.indexManager.getMinOffset(e,r).next((h=>{const f=this.ts(t,u);return this.ns(t,f,c,h.readTime)?this.Yi(e,Vi(t,null,"F")):this.rs(e,f,t,h)}))))})))))}Zi(e,t,r,i){return Jo(t)||i.isEqual(G.min())?b.resolve(null):this.Ji.getDocuments(e,r).next((o=>{const c=this.ts(t,o);return this.ns(t,c,r,i)?b.resolve(null):(fn()<=V.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),pn(t)),this.rs(e,c,t,wd(i,-1)).next((u=>u)))}))}ts(e,t){let r=new de(Kd(e));return t.forEach(((i,o)=>{rs(e,o)&&(r=r.add(o))})),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(e,t,r){return fn()<=V.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",pn(t)),this.Ji.getDocumentsMatchingQuery(e,t,it.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next((o=>(t.forEach((c=>{o=o.insert(c.key,c)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new Ae(q),this._s=new Kt((o=>es(o)),ts),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Af(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function xf(n,e,t,r){return new Lf(n,e,t,r)}async function Pc(n,e){const t=se(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((o=>(i=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((o=>{const c=[],u=[];let h=Ie();for(const f of i){c.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}for(const f of o){u.push(f.batchId);for(const _ of f.mutations)h=h.add(_.key)}return t.localDocuments.getDocuments(r,h).next((f=>({hs:f,removedBatchIds:c,addedBatchIds:u})))}))}))}class ra{constructor(){this.activeTargetIds=Zd()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Ff{constructor(){this.so=new ra,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ra,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){D("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){D("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr=null;function gi(){return sr===null?sr=(function(){return 268435456+Math.round(2147483648*Math.random())})():sr++,"0x"+sr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue="WebChannelConnection";class $f extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo="projects/".concat(i,"/databases/").concat(o),this.Co=this.databaseId.database==="(default)"?"project_id=".concat(i):"project_id=".concat(i,"&database_id=").concat(o)}get Fo(){return!1}Mo(t,r,i,o,c){const u=gi(),h=this.xo(t,r.toUriEncodedString());D("RestConnection","Sending RPC '".concat(t,"' ").concat(u,":"),h,i);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,c),this.No(t,h,f,i).then((_=>(D("RestConnection","Received RPC '".concat(t,"' ").concat(u,": "),_),_)),(_=>{throw gr("RestConnection","RPC '".concat(t,"' ").concat(u," failed with error: "),_,"url: ",h,"request:",i),_}))}Lo(t,r,i,o,c,u){return this.Mo(t,r,i,o,c)}Oo(t,r,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Gt})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((o,c)=>t[c]=o)),i&&i.headers.forEach(((o,c)=>t[c]=o))}xo(t,r){const i=Bf[t];return"".concat(this.Do,"/v1/").concat(r,":").concat(i)}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const o=gi();return new Promise(((c,u)=>{const h=new sc;h.setWithCredentials(!0),h.listenOnce(oc.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case ar.NO_ERROR:const _=h.getResponseJson();D(ue,"XHR for RPC '".concat(e,"' ").concat(o," received:"),JSON.stringify(_)),c(_);break;case ar.TIMEOUT:D(ue,"RPC '".concat(e,"' ").concat(o," timed out")),u(new M(P.DEADLINE_EXCEEDED,"Request time out"));break;case ar.HTTP_ERROR:const A=h.getStatus();if(D(ue,"RPC '".concat(e,"' ").concat(o," failed with status:"),A,"response text:",h.getResponseText()),A>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const k=(function(N){const X=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(X)>=0?X:P.UNKNOWN})(C.status);u(new M(k,C.message))}else u(new M(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(P.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{D(ue,"RPC '".concat(e,"' ").concat(o," completed."))}}));const f=JSON.stringify(i);D(ue,"RPC '".concat(e,"' ").concat(o," sending request:"),i),h.send(t,"POST",f,r,15)}))}Bo(e,t,r){const i=gi(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=lc(),u=cc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const _=o.join("");D(ue,"Creating RPC '".concat(e,"' stream ").concat(i,": ").concat(_),h);const A=c.createWebChannel(_,h);let S=!1,C=!1;const k=new jf({Io:N=>{C?D(ue,"Not sending because RPC '".concat(e,"' stream ").concat(i," is closed:"),N):(S||(D(ue,"Opening RPC '".concat(e,"' stream ").concat(i," transport.")),A.open(),S=!0),D(ue,"RPC '".concat(e,"' stream ").concat(i," sending:"),N),A.send(N))},To:()=>A.close()}),F=(N,X,W)=>{N.listen(X,(K=>{try{W(K)}catch(J){setTimeout((()=>{throw J}),0)}}))};return F(A,gn.EventType.OPEN,(()=>{C||(D(ue,"RPC '".concat(e,"' stream ").concat(i," transport opened.")),k.yo())})),F(A,gn.EventType.CLOSE,(()=>{C||(C=!0,D(ue,"RPC '".concat(e,"' stream ").concat(i," transport closed")),k.So())})),F(A,gn.EventType.ERROR,(N=>{C||(C=!0,gr(ue,"RPC '".concat(e,"' stream ").concat(i," transport errored:"),N),k.So(new M(P.UNAVAILABLE,"The operation could not be completed")))})),F(A,gn.EventType.MESSAGE,(N=>{var X;if(!C){const W=N.data[0];ye(!!W);const K=W,J=K.error||((X=K[0])===null||X===void 0?void 0:X.error);if(J){D(ue,"RPC '".concat(e,"' stream ").concat(i," received error:"),J);const Pe=J.status;let Y=(function(m){const y=Q[m];if(y!==void 0)return hf(y)})(Pe),I=J.message;Y===void 0&&(Y=P.INTERNAL,I="Unknown error status: "+Pe+" with message "+J.message),C=!0,k.So(new M(Y,I)),A.close()}else D(ue,"RPC '".concat(e,"' stream ").concat(i," received:"),W),k.bo(W)}})),F(u,ac.STAT_EVENT,(N=>{N.stat===ki.PROXY?D(ue,"RPC '".concat(e,"' stream ").concat(i," detected buffering proxy")):N.stat===ki.NOPROXY&&D(ue,"RPC '".concat(e,"' stream ").concat(i," detected no buffering proxy"))})),setTimeout((()=>{k.wo()}),0),k}}function mi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kc(n){return new df(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,t,r=1e3,i=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&D("ExponentialBackoff","Backing off for ".concat(i," ms (base delay: ").concat(this.Ko," ms, delay with jitter: ").concat(t," ms, last attempt: ").concat(r," ms ago)")),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Mo(e,na(t,r),i,o,c))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(P.UNKNOWN,o.toString())}))}Lo(e,t,r,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([c,u])=>this.connection.Lo(e,na(t,r),i,c,u,o))).catch((c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new M(P.UNKNOWN,c.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class zf{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_("Connection failed 1 times. Most recent error: ".concat(e.toString())),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t="Could not reach Cloud Firestore backend. ".concat(e,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this.D_?(kn(t),this.D_=!1):D("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e,t,r,i,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o((c=>{r.enqueueAndForget((async()=>{ls(this)&&(D("RemoteStore","Restarting streams for network reachability change."),await(async function(h){const f=se(h);f.L_.add(4),await Dn(f),f.q_.set("Unknown"),f.L_.delete(4),await Mr(f)})(this))}))})),this.q_=new zf(r,i)}}async function Mr(n){if(ls(n))for(const e of n.B_)await e(!0)}async function Dn(n){for(const e of n.B_)await e(!1)}function ls(n){return se(n).L_.size===0}async function sa(n,e){const t=se(n);t.asyncQueue.verifyOperationInProgress(),D("RemoteStore","RemoteStore received new credentials");const r=ls(t);t.L_.add(3),await Dn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Mr(t)}async function Kf(n,e){const t=se(n);e?(t.L_.delete(2),await Mr(t)):e||(t.L_.add(2),await Dn(t),t.q_.set("Unknown"))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,t,r,i,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=o,this.deferred=new Nt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((c=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,o){const c=Date.now()+r,u=new us(e,t,c,i,o);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Wf(n,e){if(kn("AsyncQueue","".concat(e,": ").concat(n)),Qi(n))return new M(P.UNAVAILABLE,"".concat(e,": ").concat(n));throw n}class Qf{constructor(){this.queries=oa(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=se(t),o=i.queries;i.queries=oa(),o.forEach(((c,u)=>{for(const h of u.j_)h.onError(r)}))})(this,new M(P.ABORTED,"Firestore shutting down"))}}function oa(){return new Kt((n=>Ic(n)),vc)}function Jf(n){n.Y_.forEach((e=>{e.next()}))}var aa,ca;(ca=aa||(aa={})).ea="default",ca.Cache="cache";class Xf{constructor(e,t,r,i,o,c){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=c,this.Ca={},this.Fa=new Kt((u=>Ic(u)),vc),this.Ma=new Map,this.xa=new Set,this.Oa=new Ae(x.comparator),this.Na=new Map,this.La=new os,this.Ba={},this.ka=new Map,this.qa=jt.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}function la(n,e,t){const r=se(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach(((o,c)=>{const u=c.view.Z_(e);u.snapshot&&i.push(u.snapshot)})),(function(c,u){const h=se(c);h.onlineState=u;let f=!1;h.queries.forEach(((_,A)=>{for(const S of A.j_)S.Z_(u)&&(f=!0)})),f&&Jf(h)})(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Yf(n,e,t){const r=se(n),i=[],o=[],c=[];r.Fa.isEmpty()||(r.Fa.forEach(((u,h)=>{c.push(r.Ka(h,e,t).then((f=>{var _;if((f||t)&&r.isPrimaryClient){const A=f?!f.fromCache:(_=void 0)===null||_===void 0?void 0:_.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){i.push(f);const A=cs.Wi(h.targetId,f);o.push(A)}})))})),await Promise.all(c),r.Ca.d_(i),await(async function(h,f){const _=se(h);try{await _.persistence.runTransaction("notifyLocalViewChanges","readwrite",(A=>b.forEach(f,(S=>b.forEach(S.$i,(C=>_.persistence.referenceDelegate.addReference(A,S.targetId,C))).next((()=>b.forEach(S.Ui,(C=>_.persistence.referenceDelegate.removeReference(A,S.targetId,C)))))))))}catch(A){if(!Qi(A))throw A;D("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const S=A.targetId;if(!A.fromCache){const C=_.os.get(S),k=C.snapshotVersion,F=C.withLastLimboFreeSnapshotVersion(k);_.os=_.os.insert(S,F)}}})(r.localStore,o))}async function Zf(n,e){const t=se(n);if(!t.currentUser.isEqual(e)){D("SyncEngine","User change. New user:",e.toKey());const r=await Pc(t.localStore,e);t.currentUser=e,(function(o,c){o.ka.forEach((u=>{u.forEach((h=>{h.reject(new M(P.CANCELLED,c))}))})),o.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Yf(t,r.hs)}}class Tr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=kc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return xf(this.persistence,new Vf,e.initialUser,this.serializer)}Ga(e){return new Of(as.Zr,this.serializer)}Wa(e){return new Ff}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Tr.provider={build:()=>new Tr};class Ui{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>la(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Zf.bind(null,this.syncEngine),await Kf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Qf})()}createDatastore(e){const t=kc(e.databaseInfo.databaseId),r=(function(o){return new $f(o)})(e.databaseInfo);return(function(o,c,u,h){return new qf(o,c,u,h)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,o,c,u){return new Gf(r,i,o,c,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>la(this.syncEngine,t,0)),(function(){return ia.D()?new ia:new Uf})())}createSyncEngine(e,t){return(function(i,o,c,u,h,f,_){const A=new Xf(i,o,c,u,h,f);return _&&(A.Qa=!0),A})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const o=se(i);D("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Dn(o),o.k_.shutdown(),o.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ui.provider={build:()=>new Ui};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(e,t,r,i,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=he.UNAUTHENTICATED,this.clientId=Ed.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async c=>{D("FirestoreClient","Received user=",c.uid),await this.authCredentialListener(c),this.user=c})),this.appCheckCredentials.start(r,(c=>(D("FirestoreClient","Received new app check token=",c),this.appCheckCredentialListener(c,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Nt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Wf(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function yi(n,e){n.asyncQueue.verifyOperationInProgress(),D("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await Pc(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function ua(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Dc(n);D("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>sa(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>sa(e.remoteStore,i))),n._onlineComponents=e}async function Dc(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D("FirestoreClient","Using user provided OfflineComponentProvider");try{await yi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;gr("Error using user provided cache. Falling back to memory cache: "+t),await yi(n,new Tr)}}else D("FirestoreClient","Using default OfflineComponentProvider"),await yi(n,new Tr);return n._offlineComponents}async function tp(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D("FirestoreClient","Using user provided OnlineComponentProvider"),await ua(n,n._uninitializedComponentsProvider._online)):(D("FirestoreClient","Using default OnlineComponentProvider"),await ua(n,new Ui))),n._onlineComponents}function Oc(n){return Dc(n).then((e=>e.persistence))}function Nc(n){return tp(n).then((e=>e.remoteStore))}function np(n){return n.asyncQueue.enqueue((async()=>{const e=await Oc(n),t=await Nc(n);return e.setNetworkEnabled(!0),(function(i){const o=se(i);return o.L_.delete(0),Mr(o)})(t)}))}function rp(n){return n.asyncQueue.enqueue((async()=>{const e=await Oc(n),t=await Nc(n);return e.setNetworkEnabled(!1),(async function(i){const o=se(i);o.L_.add(0),await Dn(o),o.q_.set("Offline")})(t)}))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha=new Map;function ip(n,e,t,r){if(e===!0&&r===!0)throw new M(P.INVALID_ARGUMENT,"".concat(n," and ").concat(t," cannot be used together."))}function sp(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n="".concat(n.substring(0,20),"...")),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?"a custom ".concat(e," object"):"an object"}}return typeof n=="function"?"a function":B()}function hs(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=sp(n);throw new M(P.INVALID_ARGUMENT,"Expected type '".concat(e.name,"', but it was: ").concat(t))}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new M(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ip("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Mc((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new M(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (must not be NaN)"));if(o.timeoutSeconds<5)throw new M(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (minimum allowed value is 5)"));if(o.timeoutSeconds>30)throw new M(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (maximum allowed value is 30)"))}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Vc{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new da({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new da(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new fd;switch(r.type){case"firstParty":return new yd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=ha.get(t);r&&(D("ComponentProvider","Removing Datastore"),ha.delete(t),r.terminate())})(this),Promise.resolve()}}function op(n,e,t,r={}){var i;const o=(n=hs(n,Vc))._getSettings(),c="".concat(e,":").concat(t);if(o.host!=="firestore.googleapis.com"&&o.host!==c&&gr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=he.MOCK_USER;else{u=$u(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new M(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new he(f)}n._authCredentials=new pd(new uc(u,h))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Hf(this,"async_queue_retry"),this.Vu=()=>{const r=mi();r&&D("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=mi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=mi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new Nt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Qi(e))throw e;D("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const i=(function(c){let u=c.message||"";return c.stack&&(u=c.stack.includes(c.message)?c.stack:c.message+"\n"+c.stack),u})(r);throw kn("INTERNAL UNHANDLED ERROR: ",i),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=us.createAndSchedule(this,e,t,r,(o=>this.yu(o)));return this.Tu.push(i),i}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class ds extends Vc{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new fa,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new fa(e),this._firestoreClient=void 0,await e}}}function ap(n,e){const t=typeof n=="object"?n:Ki(),r=typeof n=="string"?n:"(default)",i=bt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const o=Bu("firestore");o&&op(i,...o)}return i}function Lc(n){if(n._terminated)throw new M(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||cp(n),n._firestoreClient}function cp(n){var e,t,r;const i=n._freezeSettings(),o=(function(u,h,f,_){return new Dd(u,h,f,_.host,_.ssl,_.experimentalForceLongPolling,_.experimentalAutoDetectLongPolling,Mc(_.experimentalLongPollingOptions),_.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new ep(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(n._componentsProvider))}function lp(n){return np(Lc(n=hs(n,ds)))}function up(n){return rp(Lc(n=hs(n,ds)))}(function(e,t=!0){(function(i){Gt=i})(zt),Oe(new Re("firestore",((r,{instanceIdentifier:i,options:o})=>{const c=r.getProvider("app").getImmediate(),u=new ds(new gd(r.getProvider("auth-internal")),new vd(r.getProvider("app-check-internal")),(function(f,_){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new M(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yr(f.options.projectId,_)})(c,i),c);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),we($o,"4.7.3",e),we($o,"4.7.3","esm2017")})();var hp="firebase",dp="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */we(hp,dp,"app");function fs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function xc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const fp=xc,Fc=new At("auth","Firebase",xc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr=new Dr("@firebase/auth");function pp(n,...e){wr.logLevel<=V.WARN&&wr.warn("Auth (".concat(zt,"): ").concat(n),...e)}function lr(n,...e){wr.logLevel<=V.ERROR&&wr.error("Auth (".concat(zt,"): ").concat(n),...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(n,...e){throw ps(n,...e)}function ke(n,...e){return ps(n,...e)}function Uc(n,e,t){const r=Object.assign(Object.assign({},fp()),{[e]:t});return new At("auth","Firebase",r).create(e,{appName:n.name})}function _t(n){return Uc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ps(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Fc.create(n,...e)}function O(n,e,...t){if(!n)throw ps(e,...t)}function Fe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw lr(e),new Error(e)}function He(n,e){n||Fe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function gp(){return pa()==="http:"||pa()==="https:"}function pa(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(gp()||Qa()||"connection"in navigator)?navigator.onLine:!0}function yp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t){this.shortDelay=e,this.longDelay=t,He(t>e,"Short delay should be less than long delay!"),this.isMobile=Hu()||Gu()}get(){return mp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(n,e){He(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?"".concat(t).concat(e.startsWith("/")?e.slice(1):e):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Fe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Fe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Fe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _p={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp=new On(3e4,6e4);function ms(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Wt(n,e,t,r,i={}){return jc(n,i,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const u=Pn(Object.assign({key:n.config.apiKey},c)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return zu()||(f.referrerPolicy="no-referrer"),Bc.fetch()($c(n,n.config.apiHost,t,u),f)})}async function jc(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},_p),e);try{const i=new Ep(n),o=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw or(n,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const u=o.ok?c.errorMessage:c.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw or(n,"credential-already-in-use",c);if(h==="EMAIL_EXISTS")throw or(n,"email-already-in-use",c);if(h==="USER_DISABLED")throw or(n,"user-disabled",c);const _=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Uc(n,_,f);$e(n,_)}}catch(i){if(i instanceof Ce)throw i;$e(n,"network-request-failed",{message:String(i)})}}async function Ip(n,e,t,r,i={}){const o=await Wt(n,e,t,r,i);return"mfaPendingCredential"in o&&$e(n,"multi-factor-auth-required",{_serverResponse:o}),o}function $c(n,e,t,r){const i="".concat(e).concat(t,"?").concat(r);return n.config.emulator?gs(n.config,i):"".concat(n.config.apiScheme,"://").concat(i)}class Ep{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ke(this.auth,"network-request-failed")),vp.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function or(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=ke(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tp(n,e){return Wt(n,"POST","/v1/accounts:delete",e)}async function Hc(n,e){return Wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}async function wp(n,e=!1){const t=at(n),r=await t.getIdToken(e),i=ys(r);O(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const o=typeof i.firebase=="object"?i.firebase:void 0,c=o==null?void 0:o.sign_in_provider;return{claims:i,token:r,authTime:In(_i(i.auth_time)),issuedAtTime:In(_i(i.iat)),expirationTime:In(_i(i.exp)),signInProvider:c||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function _i(n){return Number(n)*1e3}function ys(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return lr("JWT malformed, contained fewer than 3 sections"),null;try{const i=za(t);return i?JSON.parse(i):(lr("Failed to decode base64 JWT payload"),null)}catch(i){return lr("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function ga(n){const e=ys(n);return O(e,"internal-error"),O(typeof e.exp<"u","internal-error"),O(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ce&&Ap(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Ap({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=In(this.lastLoginAt),this.creationTime=In(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Rn(n,Hc(t,{idToken:r}));O(i==null?void 0:i.users.length,t,"internal-error");const o=i.users[0];n._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?qc(o.providerUserInfo):[],u=Rp(n.providerData,c),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),_=h?f:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new ji(o.createdAt,o.lastLoginAt),isAnonymous:_};Object.assign(n,A)}async function Sp(n){const e=at(n);await Ar(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Rp(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function qc(n){return n.map(e=>{var{providerId:t}=e,r=fs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cp(n,e){const t=await jc(n,{},async()=>{const r=Pn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:o}=n.config,c=$c(n,i,"/v1/token","key=".concat(o)),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Bc.fetch()(c,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Pp(n,e){return Wt(n,"POST","/v2/accounts:revokeToken",ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){O(e.idToken,"internal-error"),O(typeof e.idToken<"u","internal-error"),O(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ga(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){O(e.length!==0,"internal-error");const t=ga(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(O(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:o}=await Cp(e,t);this.updateTokensAndExpiration(r,i,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:o}=t,c=new Mt;return r&&(O(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),i&&(O(typeof i=="string","internal-error",{appName:e}),c.accessToken=i),o&&(O(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Mt,this.toJSON())}_performRefresh(){return Fe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(n,e){O(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ue{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,o=fs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new bp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new ji(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Rn(this,this.stsTokenManager.getToken(this.auth,e));return O(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wp(this,e)}reload(){return Sp(this)}_assign(e){this!==e&&(O(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){O(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ar(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(_t(this.auth));const e=await this.getIdToken();return await Rn(this,Tp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,o,c,u,h,f,_;const A=(r=t.displayName)!==null&&r!==void 0?r:void 0,S=(i=t.email)!==null&&i!==void 0?i:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(c=t.photoURL)!==null&&c!==void 0?c:void 0,F=(u=t.tenantId)!==null&&u!==void 0?u:void 0,N=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,X=(f=t.createdAt)!==null&&f!==void 0?f:void 0,W=(_=t.lastLoginAt)!==null&&_!==void 0?_:void 0,{uid:K,emailVerified:J,isAnonymous:Pe,providerData:Y,stsTokenManager:I}=t;O(K&&I,e,"internal-error");const p=Mt.fromJSON(this.name,I);O(typeof K=="string",e,"internal-error"),We(A,e.name),We(S,e.name),O(typeof J=="boolean",e,"internal-error"),O(typeof Pe=="boolean",e,"internal-error"),We(C,e.name),We(k,e.name),We(F,e.name),We(N,e.name),We(X,e.name),We(W,e.name);const m=new Ue({uid:K,auth:e,email:S,emailVerified:J,displayName:A,isAnonymous:Pe,photoURL:k,phoneNumber:C,tenantId:F,stsTokenManager:p,createdAt:X,lastLoginAt:W});return Y&&Array.isArray(Y)&&(m.providerData=Y.map(y=>Object.assign({},y))),N&&(m._redirectEventId=N),m}static async _fromIdTokenResponse(e,t,r=!1){const i=new Mt;i.updateFromServerResponse(t);const o=new Ue({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ar(o),o}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];O(i.localId!==void 0,"internal-error");const o=i.providerUserInfo!==void 0?qc(i.providerUserInfo):[],c=!(i.email&&i.passwordHash)&&!(o!=null&&o.length),u=new Mt;u.updateFromIdToken(r);const h=new Ue({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:c}),f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ji(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=new Map;function Be(n){He(n instanceof Function,"Expected a class definition");let e=ma.get(n);return e?(He(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ma.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}zc.type="NONE";const ya=zc;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ur(n,e,t){return"firebase:".concat(n,":").concat(e,":").concat(t)}class Vt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:o}=this.auth;this.fullUserKey=ur(this.userKey,i.apiKey,o),this.fullPersistenceKey=ur("persistence",i.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ue._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Vt(Be(ya),e,r);const i=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=i[0]||Be(ya);const c=ur(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const _=await f._get(c);if(_){const A=Ue._fromJSON(e,_);f!==o&&(u=A),o=f;break}}catch(_){}const h=i.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Vt(o,e,r):(o=h[0],u&&await o._set(c,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(c)}catch(_){}})),new Vt(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Qc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Xc(e))return"Blackberry";if(Yc(e))return"Webos";if(Kc(e))return"Safari";if((e.includes("chrome/")||Wc(e))&&!e.includes("edge/"))return"Chrome";if(Jc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Gc(n=fe()){return/firefox\//i.test(n)}function Kc(n=fe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Wc(n=fe()){return/crios\//i.test(n)}function Qc(n=fe()){return/iemobile/i.test(n)}function Jc(n=fe()){return/android/i.test(n)}function Xc(n=fe()){return/blackberry/i.test(n)}function Yc(n=fe()){return/webos/i.test(n)}function _s(n=fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function kp(n=fe()){var e;return _s(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Dp(){return Ku()&&document.documentMode===10}function Zc(n=fe()){return _s(n)||Jc(n)||Yc(n)||Xc(n)||/windows phone/i.test(n)||Qc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(n,e=[]){let t;switch(n){case"Browser":t=_a(fe());break;case"Worker":t="".concat(_a(fe()),"-").concat(n);break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return"".concat(t,"/JsCore/").concat(zt,"/").concat(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((c,u)=>{try{const h=e(o);c(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch(o){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Np(n,e={}){return Wt(n,"GET","/v2/passwordPolicy",ms(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp=6;class Vp{constructor(e){var t,r,i,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=c.minPasswordLength)!==null&&t!==void 0?t:Mp,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,o,c,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(i=h.containsLowercaseLetter)!==null&&i!==void 0?i:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(c=h.containsNumericCharacter)!==null&&c!==void 0?c:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new va(this),this.idTokenSubscription=new va(this),this.beforeStateQueue=new Op(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Fc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Be(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Vt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(o){}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Hc(this,{idToken:e}),r=await Ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ze(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,h=await this.tryRedirectSignIn(e);(!c||c===u)&&(h!=null&&h.user)&&(i=h.user,o=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(i)}catch(c){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return O(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(r){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ar(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=yp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(_t(this));const t=e?at(e):null;return t&&O(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&O(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(_t(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(_t(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Be(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Np(this),t=new Vp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new At("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Pp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Be(e)||this._popupRedirectResolver;O(t,this,"argument-error"),this.redirectPersistenceManager=await Vt.create(this,[Be(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return"".concat(this.config.authDomain,":").concat(this.config.apiKey,":").concat(this.name)}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let c=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(O(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,i);return()=>{c=!0,h()}}else{const h=e.addObserver(t);return()=>{c=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return O(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=el(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&pp("Error while retrieving App Check token: ".concat(t.error)),t==null?void 0:t.token}}function vs(n){return at(n)}class va{constructor(e){this.auth=e,this.observer=null,this.addObserver=eh(t=>this.observer=t)}get next(){return O(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xp(n){Is=n}function Fp(n){return Is.loadJS(n)}function Up(){return Is.gapiScript}function Bp(n){return"__".concat(n).concat(Math.floor(Math.random()*1e6))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(n,e){const t=bt(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),o=t.getOptions();if(Tn(o,e!=null?e:{}))return i;$e(i,"already-initialized")}return t.initialize({options:e})}function $p(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Be);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Hp(n,e,t){const r=vs(n);O(r._canInitEmulator,r,"emulator-config-failed"),O(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,o=tl(e),{host:c,port:u}=qp(e),h=u===null?"":":".concat(u);r.config.emulator={url:"".concat(o,"//").concat(c).concat(h,"/")},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:c,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:i})}),zp()}function tl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qp(n){const e=tl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const o=i[1];return{host:o,port:Ia(r.substr(o.length+1))}}else{const[o,c]=r.split(":");return{host:o,port:Ia(c)}}}function Ia(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function zp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Fe("not implemented")}_getIdTokenResponse(e){return Fe("not implemented")}_linkToIdToken(e,t){return Fe("not implemented")}_getReauthenticationResolver(e){return Fe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lt(n,e){return Ip(n,"POST","/v1/accounts:signInWithIdp",ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gp="http://localhost";class Et extends nl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Et(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,o=fs(t,["providerId","signInMethod"]);if(!r||!i)return null;const c=new Et(r,i);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const t=this.buildRequest();return Lt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Lt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Lt(e,t)}buildRequest(){const e={requestUri:Gp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Pn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn extends rl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends Nn{constructor(){super("facebook.com")}static credential(e){return Et._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qe.credential(e.oauthAccessToken)}catch(t){return null}}}Qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends Nn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Et._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Je.credential(t,r)}catch(i){return null}}}Je.GOOGLE_SIGN_IN_METHOD="google.com";Je.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends Nn{constructor(){super("github.com")}static credential(e){return Et._fromParams({providerId:Xe.PROVIDER_ID,signInMethod:Xe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xe.credentialFromTaggedObject(e)}static credentialFromError(e){return Xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xe.credential(e.oauthAccessToken)}catch(t){return null}}}Xe.GITHUB_SIGN_IN_METHOD="github.com";Xe.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye extends Nn{constructor(){super("twitter.com")}static credential(e,t){return Et._fromParams({providerId:Ye.PROVIDER_ID,signInMethod:Ye.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ye.credentialFromTaggedObject(e)}static credentialFromError(e){return Ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ye.credential(t,r)}catch(i){return null}}}Ye.TWITTER_SIGN_IN_METHOD="twitter.com";Ye.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const o=await Ue._fromIdTokenResponse(e,r,i),c=Ea(r);return new $t({user:o,providerId:c,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Ea(r);return new $t({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Ea(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br extends Ce{constructor(e,t,r,i){var o;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,br.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new br(e,t,r,i)}}function il(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?br._fromErrorAndOperation(n,o,e,r):o})}async function Kp(n,e,t=!1){const r=await Rn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return $t._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wp(n,e,t=!1){const{auth:r}=n;if(Ze(r.app))return Promise.reject(_t(r));const i="reauthenticate";try{const o=await Rn(n,il(r,i,e,n),t);O(o.idToken,r,"internal-error");const c=ys(o.idToken);O(c,r,"internal-error");const{sub:u}=c;return O(n.uid===u,r,"user-mismatch"),$t._forOperation(n,i,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&$e(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qp(n,e,t=!1){if(Ze(n.app))return Promise.reject(_t(n));const r="signIn",i=await il(n,r,e),o=await $t._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(o.user),o}function Jp(n,e,t,r){return at(n).onIdTokenChanged(e,t,r)}function Xp(n,e,t){return at(n).beforeAuthStateChanged(e,t)}const Sr="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Sr,"1"),this.storage.removeItem(Sr),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yp=1e3,Zp=10;class ol extends sl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Zc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,u,h)=>{this.notifyListeners(c,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const c=this.storage.getItem(r);!t&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);Dp()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Zp):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Yp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ol.type="LOCAL";const eg=ol;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al extends sl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}al.type="SESSION";const cl=al;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Vr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:o}=t.data,c=this.handlersMap[i];if(!(c!=null&&c.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const u=Array.from(c).map(async f=>f(t.origin,o)),h=await tg(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Vr.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let o,c;return new Promise((u,h)=>{const f=Es("",20);i.port1.start();const _=setTimeout(()=>{h(new Error("unsupported_event"))},r);c={messageChannel:i,onMessage(A){const S=A;if(S.data.eventId===f)switch(S.data.status){case"ack":clearTimeout(_),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(S.data.response);break;default:clearTimeout(_),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(c),i.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[i.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function De(){return window}function rg(n){De().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(){return typeof De().WorkerGlobalScope<"u"&&typeof De().importScripts=="function"}async function ig(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(n){return null}}function sg(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function og(){return ll()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul="firebaseLocalStorageDb",ag=1,Rr="firebaseLocalStorage",hl="fbase_key";class Mn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Lr(n,e){return n.transaction([Rr],e?"readwrite":"readonly").objectStore(Rr)}function cg(){const n=indexedDB.deleteDatabase(ul);return new Mn(n).toPromise()}function $i(){const n=indexedDB.open(ul,ag);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Rr,{keyPath:hl})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Rr)?e(r):(r.close(),await cg(),e(await $i()))})})}async function Ta(n,e,t){const r=Lr(n,!0).put({[hl]:e,value:t});return new Mn(r).toPromise()}async function lg(n,e){const t=Lr(n,!1).get(e),r=await new Mn(t).toPromise();return r===void 0?null:r.value}function wa(n,e){const t=Lr(n,!0).delete(e);return new Mn(t).toPromise()}const ug=800,hg=3;class dl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $i(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>hg)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ll()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Vr._getInstance(og()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ig(),!this.activeServiceWorker)return;this.sender=new ng(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $i();return await Ta(e,Sr,"1"),await wa(e,Sr),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ta(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>lg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>wa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const o=Lr(i,!1).getAll();return new Mn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:o}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(o)&&(this.notifyListeners(i,o),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ug)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dl.type="LOCAL";const dg=dl;new On(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fg(n,e){return e?Be(e):(O(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts extends nl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Lt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Lt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Lt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function pg(n){return Qp(n.auth,new Ts(n),n.bypassAuthState)}function gg(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Wp(t,new Ts(n),n.bypassAuthState)}async function mg(n){const{auth:e,user:t}=n;return O(t,e,"internal-error"),Kp(t,new Ts(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,t,r,i,o=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:o,error:c,type:u}=e;if(c){this.reject(c);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pg;case"linkViaPopup":case"linkViaRedirect":return mg;case"reauthViaPopup":case"reauthViaRedirect":return gg;default:$e(this.auth,"internal-error")}}resolve(e){He(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){He(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yg=new On(2e3,1e4);class Dt extends fl{constructor(e,t,r,i,o){super(e,t,i,o),this.provider=r,this.authWindow=null,this.pollId=null,Dt.currentPopupAction&&Dt.currentPopupAction.cancel(),Dt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return O(e,this.auth,"internal-error"),e}async onExecution(){He(this.filter.length===1,"Popup operations only handle one event");const e=Es();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Dt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yg.get())};e()}}Dt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _g="pendingRedirect",hr=new Map;class vg extends fl{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=hr.get(this.auth._key());if(!e){try{const r=await Ig(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}hr.set(this.auth._key(),e)}return this.bypassAuthState||hr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ig(n,e){const t=wg(e),r=Tg(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Eg(n,e){hr.set(n._key(),e)}function Tg(n){return Be(n._redirectPersistence)}function wg(n){return ur(_g,n.config.apiKey,n.name)}async function Ag(n,e,t=!1){if(Ze(n.app))return Promise.reject(_t(n));const r=vs(n),i=fg(r,e),c=await new vg(r,i,t).execute();return c&&!t&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg=600*1e3;class Sg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Rg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!pl(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ke(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bg&&this.cachedEventUids.clear(),this.cachedEventUids.has(Aa(e))}saveEventToCache(e){this.cachedEventUids.add(Aa(e)),this.lastProcessedEventTime=Date.now()}}function Aa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function pl({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Rg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return pl(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cg(n,e={}){return Wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,kg=/^https?/;async function Dg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cg(n);for(const t of e)try{if(Og(t))return}catch(r){}$e(n,"unauthorized-domain")}function Og(n){const e=Bi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const c=new URL(n);return c.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===r}if(!kg.test(t))return!1;if(Pg.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=new On(3e4,6e4);function ba(){const n=De().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Mg(n){return new Promise((e,t)=>{var r,i,o;function c(){ba(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ba(),t(ke(n,"network-request-failed"))},timeout:Ng.get()})}if(!((i=(r=De().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((o=De().gapi)===null||o===void 0)&&o.load)c();else{const u=Bp("iframefcb");return De()[u]=()=>{gapi.load?c():t(ke(n,"network-request-failed"))},Fp("".concat(Up(),"?onload=").concat(u)).catch(h=>t(h))}}).catch(e=>{throw dr=null,e})}let dr=null;function Vg(n){return dr=dr||Mg(n),dr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg=new On(5e3,15e3),xg="__/auth/iframe",Fg="emulator/auth/iframe",Ug={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Bg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jg(n){const e=n.config;O(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?gs(e,Fg):"https://".concat(n.config.authDomain,"/").concat(xg),r={apiKey:e.apiKey,appName:n.name,v:zt},i=Bg.get(n.config.apiHost);i&&(r.eid=i);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),"".concat(t,"?").concat(Pn(r).slice(1))}async function $g(n){const e=await Vg(n),t=De().gapi;return O(t,n,"internal-error"),e.open({where:document.body,url:jg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ug,dontclear:!0},r=>new Promise(async(i,o)=>{await r.restyle({setHideOnLeave:!1});const c=ke(n,"network-request-failed"),u=De().setTimeout(()=>{o(c)},Lg.get());function h(){De().clearTimeout(u),i(r)}r.ping(h).then(h,()=>{o(c)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qg=500,zg=600,Gg="_blank",Kg="http://localhost";class Sa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Wg(n,e,t,r=qg,i=zg){const o=Math.max((window.screen.availHeight-i)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},Hg),{width:r.toString(),height:i.toString(),top:o,left:c}),f=fe().toLowerCase();t&&(u=Wc(f)?Gg:t),Gc(f)&&(e=e||Kg,h.scrollbars="yes");const _=Object.entries(h).reduce((S,[C,k])=>"".concat(S).concat(C,"=").concat(k,","),"");if(kp(f)&&u!=="_self")return Qg(e||"",u),new Sa(null);const A=window.open(e||"",u,_);O(A,n,"popup-blocked");try{A.focus()}catch(S){}return new Sa(A)}function Qg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg="__/auth/handler",Xg="emulator/auth/handler",Yg=encodeURIComponent("fac");async function Ra(n,e,t,r,i,o){O(n.config.authDomain,n,"auth-domain-config-required"),O(n.config.apiKey,n,"invalid-api-key");const c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:zt,eventId:i};if(e instanceof rl){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",Zu(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[_,A]of Object.entries({}))c[_]=A}if(e instanceof Nn){const _=e.getScopes().filter(A=>A!=="");_.length>0&&(c.scopes=_.join(","))}n.tenantId&&(c.tid=n.tenantId);const u=c;for(const _ of Object.keys(u))u[_]===void 0&&delete u[_];const h=await n._getAppCheckToken(),f=h?"#".concat(Yg,"=").concat(encodeURIComponent(h)):"";return"".concat(Zg(n),"?").concat(Pn(u).slice(1)).concat(f)}function Zg({config:n}){return n.emulator?gs(n,Xg):"https://".concat(n.authDomain,"/").concat(Jg)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="webStorageSupport";class em{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=cl,this._completeRedirectFn=Ag,this._overrideRedirectResult=Eg}async _openPopup(e,t,r,i){var o;He((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const c=await Ra(e,t,r,Bi(),i);return Wg(e,c,Es())}async _openRedirect(e,t,r,i){await this._originValidation(e);const o=await Ra(e,t,r,Bi(),i);return rg(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:o}=this.eventManagers[t];return i?Promise.resolve(i):(He(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await $g(e),r=new Sg(e);return t.register("authEvent",i=>(O(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(vi,{type:vi},i=>{var o;const c=(o=i==null?void 0:i[0])===null||o===void 0?void 0:o[vi];c!==void 0&&t(!!c),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Zc()||Kc()||_s()}}const tm=em;var Ca="@firebase/auth",Pa="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){O(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function im(n){Oe(new Re("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;O(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:c,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:el(n)},f=new Lp(r,i,o,h);return $p(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Oe(new Re("auth-internal",e=>{const t=vs(e.getProvider("auth").getImmediate());return(r=>new nm(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),we(Ca,Pa,rm(n)),we(Ca,Pa,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=300,om=Wa("authIdTokenMaxAge")||sm;let ka=null;const am=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>om)return;const i=t==null?void 0:t.token;ka!==i&&(ka=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:"Bearer ".concat(i)}:{}}))};function cm(n=Ki()){const e=bt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=jp(n,{popupRedirectResolver:tm,persistence:[dg,eg,cl]}),r=Wa("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const c=am(o.toString());Xp(t,c,()=>c(t.currentUser)),Jp(t,u=>c(u))}}const i=Ga("auth");return i&&Hp(t,"http://".concat(i)),t}function lm(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}xp({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const o=ke("internal-error");o.customData=i,t(o)},r.type="text/javascript",r.charset="UTF-8",lm().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});im("Browser");const gl="@firebase/installations",ws="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml=1e4,yl="w:".concat(ws),_l="FIS_v2",um="https://firebaseinstallations.googleapis.com/v1",hm=3600*1e3,dm="installations",fm="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Tt=new At(dm,fm,pm);function vl(n){return n instanceof Ce&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Il({projectId:n}){return"".concat(um,"/projects/").concat(n,"/installations")}function El(n){return{token:n.token,requestStatus:2,expiresIn:mm(n.expiresIn),creationTime:Date.now()}}async function Tl(n,e){const r=(await e.json()).error;return Tt.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function wl({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function gm(n,{refreshToken:e}){const t=wl(n);return t.append("Authorization",ym(e)),t}async function Al(n){const e=await n();return e.status>=500&&e.status<600?n():e}function mm(n){return Number(n.replace("s","000"))}function ym(n){return"".concat(_l," ").concat(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _m({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=Il(n),i=wl(n),o=e.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}const c={fid:t,authVersion:_l,appId:n.appId,sdkVersion:yl},u={method:"POST",headers:i,body:JSON.stringify(c)},h=await Al(()=>fetch(r,u));if(h.ok){const f=await h.json();return{fid:f.fid||t,registrationStatus:2,refreshToken:f.refreshToken,authToken:El(f.authToken)}}else throw await Tl("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Im=/^[cdef][\w-]{21}$/,Hi="";function Em(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Tm(n);return Im.test(t)?t:Hi}catch(n){return Hi}}function Tm(n){return vm(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(n){return"".concat(n.appName,"!").concat(n.appId)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl=new Map;function Rl(n,e){const t=xr(n);Cl(t,e),wm(t,e)}function Cl(n,e){const t=Sl.get(n);if(t)for(const r of t)r(e)}function wm(n,e){const t=Am();t&&t.postMessage({key:n,fid:e}),bm()}let pt=null;function Am(){return!pt&&"BroadcastChannel"in self&&(pt=new BroadcastChannel("[Firebase] FID Change"),pt.onmessage=n=>{Cl(n.data.key,n.data.fid)}),pt}function bm(){Sl.size===0&&pt&&(pt.close(),pt=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sm="firebase-installations-database",Rm=1,wt="firebase-installations-store";let Ii=null;function As(){return Ii||(Ii=ec(Sm,Rm,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(wt)}}})),Ii}async function Cr(n,e){const t=xr(n),i=(await As()).transaction(wt,"readwrite"),o=i.objectStore(wt),c=await o.get(t);return await o.put(e,t),await i.done,(!c||c.fid!==e.fid)&&Rl(n,e.fid),e}async function Pl(n){const e=xr(n),r=(await As()).transaction(wt,"readwrite");await r.objectStore(wt).delete(e),await r.done}async function Fr(n,e){const t=xr(n),i=(await As()).transaction(wt,"readwrite"),o=i.objectStore(wt),c=await o.get(t),u=e(c);return u===void 0?await o.delete(t):await o.put(u,t),await i.done,u&&(!c||c.fid!==u.fid)&&Rl(n,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(n){let e;const t=await Fr(n.appConfig,r=>{const i=Cm(r),o=Pm(n,i);return e=o.registrationPromise,o.installationEntry});return t.fid===Hi?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Cm(n){const e=n||{fid:Em(),registrationStatus:0};return kl(e)}function Pm(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(Tt.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=km(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Dm(n)}:{installationEntry:e}}async function km(n,e){try{const t=await _m(n,e);return Cr(n.appConfig,t)}catch(t){throw vl(t)&&t.customData.serverCode===409?await Pl(n.appConfig):await Cr(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function Dm(n){let e=await Da(n.appConfig);for(;e.registrationStatus===1;)await bl(100),e=await Da(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await bs(n);return r||t}return e}function Da(n){return Fr(n,e=>{if(!e)throw Tt.create("installation-not-found");return kl(e)})}function kl(n){return Om(n)?{fid:n.fid,registrationStatus:0}:n}function Om(n){return n.registrationStatus===1&&n.registrationTime+ml<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nm({appConfig:n,heartbeatServiceProvider:e},t){const r=Mm(n,t),i=gm(n,t),o=e.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}const c={installation:{sdkVersion:yl,appId:n.appId}},u={method:"POST",headers:i,body:JSON.stringify(c)},h=await Al(()=>fetch(r,u));if(h.ok){const f=await h.json();return El(f)}else throw await Tl("Generate Auth Token",h)}function Mm(n,{fid:e}){return"".concat(Il(n),"/").concat(e,"/authTokens:generate")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ss(n,e=!1){let t;const r=await Fr(n.appConfig,o=>{if(!Dl(o))throw Tt.create("not-registered");const c=o.authToken;if(!e&&xm(c))return o;if(c.requestStatus===1)return t=Vm(n,e),o;{if(!navigator.onLine)throw Tt.create("app-offline");const u=Um(o);return t=Lm(n,u),u}});return t?await t:r.authToken}async function Vm(n,e){let t=await Oa(n.appConfig);for(;t.authToken.requestStatus===1;)await bl(100),t=await Oa(n.appConfig);const r=t.authToken;return r.requestStatus===0?Ss(n,e):r}function Oa(n){return Fr(n,e=>{if(!Dl(e))throw Tt.create("not-registered");const t=e.authToken;return Bm(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Lm(n,e){try{const t=await Nm(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await Cr(n.appConfig,r),t}catch(t){if(vl(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Pl(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await Cr(n.appConfig,r)}throw t}}function Dl(n){return n!==void 0&&n.registrationStatus===2}function xm(n){return n.requestStatus===2&&!Fm(n)}function Fm(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+hm}function Um(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function Bm(n){return n.requestStatus===1&&n.requestTime+ml<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jm(n){const e=n,{installationEntry:t,registrationPromise:r}=await bs(e);return r?r.catch(console.error):Ss(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $m(n,e=!1){const t=n;return await Hm(t),(await Ss(t,e)).token}async function Hm(n){const{registrationPromise:e}=await bs(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qm(n){if(!n||!n.options)throw Ei("App Configuration");if(!n.name)throw Ei("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Ei(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ei(n){return Tt.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol="installations",zm="installations-internal",Gm=n=>{const e=n.getProvider("app").getImmediate(),t=qm(e),r=bt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Km=n=>{const e=n.getProvider("app").getImmediate(),t=bt(e,Ol).getImmediate();return{getId:()=>jm(t),getToken:i=>$m(t,i)}};function Wm(){Oe(new Re(Ol,Gm,"PUBLIC")),Oe(new Re(zm,Km,"PRIVATE"))}Wm();we(gl,ws);we(gl,ws,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pr="analytics",Qm="firebase_id",Jm="origin",Xm=60*1e3,Ym="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Rs="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=new Dr("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Te=new At("analytics","Analytics",Zm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ey(n){if(!n.startsWith(Rs)){const e=Te.create("invalid-gtag-resource",{gtagURL:n});return _e.warn(e.message),""}return n}function Nl(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function ty(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function ny(n,e){const t=ty("firebase-js-sdk-policy",{createScriptURL:ey}),r=document.createElement("script"),i="".concat(Rs,"?l=").concat(n,"&id=").concat(e);r.src=t?t==null?void 0:t.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function ry(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function iy(n,e,t,r,i,o){const c=r[i];try{if(c)await e[c];else{const h=(await Nl(t)).find(f=>f.measurementId===i);h&&await e[h.appId]}}catch(u){_e.error(u)}n("config",i,o)}async function sy(n,e,t,r,i){try{let o=[];if(i&&i.send_to){let c=i.send_to;Array.isArray(c)||(c=[c]);const u=await Nl(t);for(const h of c){const f=u.find(A=>A.measurementId===h),_=f&&e[f.appId];if(_)o.push(_);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),n("event",r,i||{})}catch(o){_e.error(o)}}function oy(n,e,t,r){async function i(o,...c){try{if(o==="event"){const[u,h]=c;await sy(n,e,t,u,h)}else if(o==="config"){const[u,h]=c;await iy(n,e,t,r,u,h)}else if(o==="consent"){const[u,h]=c;n("consent",u,h)}else if(o==="get"){const[u,h,f]=c;n("get",u,h,f)}else if(o==="set"){const[u]=c;n("set",u)}else n(o,...c)}catch(u){_e.error(u)}}return i}function ay(n,e,t,r,i){let o=function(...c){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(o=window[i]),window[i]=oy(o,n,e,t),{gtagCore:o,wrappedGtag:window[i]}}function cy(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Rs)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ly=30,uy=1e3;class hy{constructor(e={},t=uy){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ml=new hy;function dy(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function fy(n){var e;const{appId:t,apiKey:r}=n,i={method:"GET",headers:dy(r)},o=Ym.replace("{app-id}",t),c=await fetch(o,i);if(c.status!==200&&c.status!==304){let u="";try{const h=await c.json();!((e=h.error)===null||e===void 0)&&e.message&&(u=h.error.message)}catch(h){}throw Te.create("config-fetch-failed",{httpStatus:c.status,responseMessage:u})}return c.json()}async function py(n,e=Ml,t){const{appId:r,apiKey:i,measurementId:o}=n.options;if(!r)throw Te.create("no-app-id");if(!i){if(o)return{measurementId:o,appId:r};throw Te.create("no-api-key")}const c=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new yy;return setTimeout(async()=>{u.abort()},Xm),Vl({appId:r,apiKey:i,measurementId:o},c,u,e)}async function Vl(n,{throttleEndTimeMillis:e,backoffCount:t},r,i=Ml){var o;const{appId:c,measurementId:u}=n;try{await gy(r,e)}catch(h){if(u)return _e.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ".concat(u,' provided in the "measurementId" field in the local Firebase config. [').concat(h==null?void 0:h.message,"]")),{appId:c,measurementId:u};throw h}try{const h=await fy(n);return i.deleteThrottleMetadata(c),h}catch(h){const f=h;if(!my(f)){if(i.deleteThrottleMetadata(c),u)return _e.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ".concat(u,' provided in the "measurementId" field in the local Firebase config. [').concat(f==null?void 0:f.message,"]")),{appId:c,measurementId:u};throw h}const _=Number((o=f==null?void 0:f.customData)===null||o===void 0?void 0:o.httpStatus)===503?Oo(t,i.intervalMillis,ly):Oo(t,i.intervalMillis),A={throttleEndTimeMillis:Date.now()+_,backoffCount:t+1};return i.setThrottleMetadata(c,A),_e.debug("Calling attemptFetch again in ".concat(_," millis")),Vl(n,A,r,i)}}function gy(n,e){return new Promise((t,r)=>{const i=Math.max(e-Date.now(),0),o=setTimeout(t,i);n.addEventListener(()=>{clearTimeout(o),r(Te.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function my(n){if(!(n instanceof Ce)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class yy{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function _y(n,e,t,r,i){if(i&&i.global){n("event",t,r);return}else{const o=await e,c=Object.assign(Object.assign({},r),{send_to:o});n("event",t,c)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vy(){if(Ja())try{await Xa()}catch(n){return _e.warn(Te.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return _e.warn(Te.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Iy(n,e,t,r,i,o,c){var u;const h=py(n);h.then(C=>{t[C.measurementId]=C.appId,n.options.measurementId&&C.measurementId!==n.options.measurementId&&_e.warn("The measurement ID in the local Firebase config (".concat(n.options.measurementId,") does not match the measurement ID fetched from the server (").concat(C.measurementId,"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config."))}).catch(C=>_e.error(C)),e.push(h);const f=vy().then(C=>{if(C)return r.getId()}),[_,A]=await Promise.all([h,f]);cy(o)||ny(o,_.measurementId),i("js",new Date);const S=(u=c==null?void 0:c.config)!==null&&u!==void 0?u:{};return S[Jm]="firebase",S.update=!0,A!=null&&(S[Qm]=A),i("config",_.measurementId,S),_.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e){this.app=e}_delete(){return delete En[this.app.options.appId],Promise.resolve()}}let En={},Na=[];const Ma={};let Ti="dataLayer",Ty="gtag",Va,Ll,La=!1;function wy(){const n=[];if(Qa()&&n.push("This is a browser extension environment."),Qu()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,i)=>"(".concat(i+1,") ").concat(r)).join(" "),t=Te.create("invalid-analytics-context",{errorInfo:e});_e.warn(t.message)}}function Ay(n,e,t){wy();const r=n.options.appId;if(!r)throw Te.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)_e.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '.concat(n.options.measurementId,' provided in the "measurementId" field in the local Firebase config.'));else throw Te.create("no-api-key");if(En[r]!=null)throw Te.create("already-exists",{id:r});if(!La){ry(Ti);const{wrappedGtag:o,gtagCore:c}=ay(En,Na,Ma,Ti,Ty);Ll=o,Va=c,La=!0}return En[r]=Iy(n,Na,Ma,e,Va,Ti,t),new Ey(n)}function by(n=Ki()){n=at(n);const e=bt(n,Pr);return e.isInitialized()?e.getImmediate():Sy(n)}function Sy(n,e={}){const t=bt(n,Pr);if(t.isInitialized()){const i=t.getImmediate();if(Tn(e,t.getOptions()))return i;throw Te.create("already-initialized")}return t.initialize({options:e})}function Ry(n,e,t,r){n=at(n),_y(Ll,En[n.app.options.appId],e,t,r).catch(i=>_e.error(i))}const xa="@firebase/analytics",Fa="0.10.8";function Cy(){Oe(new Re(Pr,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return Ay(r,i,t)},"PUBLIC")),Oe(new Re("analytics-internal",n,"PRIVATE")),we(xa,Fa),we(xa,Fa,"esm2017");function n(e){try{const t=e.getProvider(Pr).getImmediate();return{logEvent:(r,i,o)=>Ry(t,r,i,o)}}catch(t){throw Te.create("interop-component-reg-failed",{reason:t})}}}Cy();const xl={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0,measurementId:void 0},Cs=tc(xl),Fl=ap(Cs);cm(Cs);by(Cs);window.addEventListener("online",async()=>{try{await lp(Fl),console.log("🔥 Firebase: Back online")}catch(n){console.error("Firebase network enable error:",n)}});window.addEventListener("offline",async()=>{try{await up(Fl),console.log("🔥 Firebase: Offline mode")}catch(n){console.error("Firebase network disable error:",n)}});try{console.log("🔥 Firebase initialized successfully with project:",xl.projectId)}catch(n){console.error("Firebase initialization error:",n)}const qi=Ou.API_BASE;console.log("API_BASE ->",qi||"(same-origin)");const Ot=[{name:"Sarah",comment:"🔥 Best ramen spot ever!",emoji:"🍜",avatar:"https://i.pravatar.cc/80?img=32"},{name:"James",comment:"💯 Always go for the sushi here",emoji:"🍣",avatar:"https://i.pravatar.cc/80?img=12"},{name:"Aisha",comment:"👌 Perfect comfort food when tired",emoji:"🍲",avatar:"https://i.pravatar.cc/80?img=58"}],Py=6;let wi=JSON.parse(localStorage.getItem("vfied_recent")||"[]");function ky(n){n&&(wi=[n,...wi.filter(e=>e.toLowerCase()!==n.toLowerCase())].slice(0,Py),localStorage.setItem("vfied_recent",JSON.stringify(wi)))}let rt=[],Cn={},zi=[];document.addEventListener("DOMContentLoaded",()=>{Xy(),Jy(),Dy(),Ky(),e_(),Fy(),By(),Hy(),zy(),Gl(),console.log("🚀 VFIED unified main loaded")});function Dy(){const n=j("decide-button"),e=j("detect-mood-btn"),t=j("accept-btn"),r=j("try-again-btn"),i=j("insights-toggle");n&&n.addEventListener("click",Vn),e&&e.addEventListener("click",Wy),t&&t.addEventListener("click",Ly),r&&r.addEventListener("click",xy),i&&i.addEventListener("click",()=>{const h=j("insights-content");h.classList.contains("hidden")?(h.classList.remove("hidden"),i.textContent="🤖 Hide insights ↑"):(h.classList.add("hidden"),i.textContent="🤖 Why this choice? ↓")});const o=j("see-more-gems"),c=j("gems-modal"),u=j("gems-modal-close");o&&o.addEventListener("click",()=>{$y(),Zy(c)}),u&&u.addEventListener("click",()=>$a(c)),c&&c.addEventListener("click",h=>{h.target===c&&$a(c)})}function Ua(n,e=!0){try{const t=n||document.getElementById("decide-button");if(!t)return;t.disabled=!!e;const r=document.getElementById("button-icon"),i=document.getElementById("button-text");e?(r&&(r.textContent="⏳"),i&&(i.textContent="Thinking…")):(r&&(r.textContent="🎯"),i&&(i.textContent="DECIDE FOR ME"))}catch(t){console.warn("setThinking failed:",t)}}function Oy(){return{city:"London",country:"United Kingdom",country_code:"GB"}}function Ny(n){var r;const e=(r=n.food)==null?void 0:r.name;if(!e)return[];let t=JSON.parse(localStorage.getItem("vfied_recent")||"[]");return t=t.filter(i=>i.toLowerCase()!==e.toLowerCase()),t.unshift(e),t=t.slice(0,8),localStorage.setItem("vfied_recent",JSON.stringify(t)),console.log("📝 Updated recent suggestions:",t),t}function My(n){return n>=6&&n<11?"breakfast":n>=11&&n<15?"lunch":n>=15&&n<18?"snack":n>=18&&n<22?"dinner":"late_night"}async function Vn(){var e,t,r,i,o;const n=document.getElementById("decide-button");Ua(n,!0);try{const c=((t=(e=document.getElementById("mood-input"))==null?void 0:e.value)==null?void 0:t.trim())||"",u=Array.from(document.querySelectorAll(".diet-chip.active")).map(A=>A.dataset.diet);console.log("🎯 Making decision with:",{mood:c,dietary:u});const h=JSON.parse(localStorage.getItem("vfied_recent")||"[]"),f=await fetch("".concat(qi,"/v1/quick_decision"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({location:Oy(),mood_text:c,dietary:u,recent_suggestions:h,time_context:{current_hour:new Date().getHours(),meal_period:My(new Date().getHours()),is_weekend:[0,6].includes(new Date().getDay())}})});if(!f.ok){const A=await f.text();throw new Error("HTTP ".concat(f.status,": ").concat(A))}const _=await f.json();if(console.log("📥 Server response:",_),_.success&&_.decisions){_.mood_analysis&&Vy(_.mood_analysis);const A=_.decisions[Math.floor(Math.random()*_.decisions.length)],S={food:{name:A.name,emoji:A.emoji||"🍽️"},friendMessage:A.explanation||"Perfect choice for you right now!",source:_.source||"server",confidence:85,moodVibe:(i=(r=_.mood_analysis)==null?void 0:r.vibes)==null?void 0:i[0]},C=ja(S);Ba(C),Ny(S),Qy({timeSavedMin:3})}else throw new Error(_.error||"No decisions returned")}catch(c){console.error("❌ Decision error:",c);const u=ja({food:{name:"Something Good",emoji:"🍽️"},friendMessage:"Server unavailable - try any local favorite!",source:"client_fallback"});Ba(u),Ht("Connection issue: ".concat(c.message),"warn")}finally{Ua(n,!1)}console.log("🔍 Client debug:",{api_base:qi,mood_input_value:(o=document.getElementById("mood-input"))==null?void 0:o.value,selected_dietary:Array.from(document.querySelectorAll(".diet-chip.active")).map(c=>c.dataset.diet)})}function Vy(n){if(!n)return;const{vibes:e,message:t}=n;let r=document.getElementById("mood-insight");if(!r){r=document.createElement("div"),r.id="mood-insight",r.className="mood-insight-card";const o=document.querySelector(".mood-section");o&&o.appendChild(r)}const i=(e||[]).map(o=>'<span class="vibe-badge vibe-'.concat(o,'">').concat(Ul(o),"</span>")).join("");r.innerHTML='\n    <div class="mood-insight-content">\n      '.concat(i?'<div class="vibe-badges">'.concat(i,"</div>"):"","\n      ").concat(t?'<div class="mood-message">'.concat(t,"</div>"):"","\n    </div>\n  "),r.classList.add("show"),setTimeout(()=>{r.classList.remove("show")},5e3)}function Ul(n){return{celebration:"🎉 Celebrating",hangover:"🤕 Hangover",pms:"🌙 PMS",date:"💕 Date Night",study:"📚 Study Mode",chaos:"🔥 Chaos Mode","main-character":"✨ Main Character",goblin:"👺 Goblin Mode",heartbreak:"💔 Heartbreak",payday:"💰 Payday",friday:"🎊 Friday Vibes",anxious:"😰 Anxious",tired:"😴 Tired","post-workout":"💪 Post-Workout"}[n]||n}function Ba(n){var t,r,i;Yy("suggestion-result"),gt("result-emoji",((t=n.food)==null?void 0:t.emoji)||"🍽️"),gt("result-name",((r=n.food)==null?void 0:r.name)||"Something delicious");let e=n.friendMessage||n.reasoning||"Perfect for your mood!";n.moodVibe&&(e="".concat(e," (Perfect for ").concat(Ul(n.moodVibe),")")),gt("result-description",e),gt("restaurant-info",n.availabilityNote||""),Ai("cultural-note",n.culturalNote?"<strong>🌍 Cultural insight</strong><br>".concat(n.culturalNote):""),Ai("personal-note",n.personalNote?"<strong>🧠 Personal note</strong><br>".concat(n.personalNote):""),Ai("weather-note",n.weatherNote?"<strong>🌤️ Weather</strong><br>".concat(n.weatherNote):""),Uy(n),Wl("🎉 Perfect match found! How does this sound?"),ky((i=n.food)==null?void 0:i.name)}function Ly(){Kl("suggestion-result"),Wl("🎉 Decision made! Ready for your next food adventure."),Ht("✅ Enjoy your meal!","success")}function xy(){Kl("suggestion-result"),Vn()}function Fy(){const n=j("friend-chips");n&&(n.innerHTML="",Ot.forEach(e=>{const t=document.createElement("button");t.className="friend-chip",t.innerHTML='\n      <img class="friend-avatar" src="'.concat(e.avatar,'" alt="').concat(qt(e.name),'" />\n      <span>').concat(e.emoji," <strong>").concat(qt(e.name),"</strong></span>\n    "),t.addEventListener("click",()=>Bl(e.name)),n.appendChild(t)}))}function Bl(n){const e=Ot.find(r=>r.name===n);if(!e)return;Ht("💬 Asking ".concat(e.name,': "').concat(e.comment,'"'),"info");const t=j("mood-input");t&&(e.emoji==="🍜"?t.value="need something warming and comforting":e.emoji==="🍣"?t.value="feeling adventurous, want something fresh":t.value="need comfort food")}function ja(n){var r;const e=(((r=n.food)==null?void 0:r.name)||"").toLowerCase();let t=Ot[Math.floor(Math.random()*Ot.length)];if((e.includes("ramen")||e.includes("noodle"))&&(t=Ot[0]),(e.includes("sushi")||e.includes("japanese"))&&(t=Ot[1]),n.socialSignal={type:"friend",friend:t,message:"".concat(t.name,': "').concat(t.comment,'"')},rt.length){const i=rt[Math.floor(Math.random()*rt.length)];n.localSignal={type:"local_list",list:i,message:'Popular in "'.concat(i.name,'" (').concat(i.area,")")}}return n}function Uy(n){const e=j("social-signals");if(!e)return;let t="";n.socialSignal&&(t+='\n      <div class="social-signal friend-signal">\n        <span class="signal-icon">👥</span>\n        <span class="signal-text">'.concat(n.socialSignal.message,"</span>\n      </div>")),n.localSignal&&(t+='\n      <div class="social-signal local-signal">\n        <span class="signal-icon">📍</span>\n        <span class="signal-text">'.concat(n.localSignal.message,"</span>\n      </div>")),e.innerHTML=t}async function By(){try{rt=await(await fetch("/data/local_lists.json",{cache:"no-store"})).json()}catch(n){rt=[]}jy()}function jy(){const n=j("local-gems-grid");if(!n)return;const e=rt.slice(0,8);n.innerHTML="",e.forEach(t=>{const r=document.createElement("div");r.className="gem-card",r.innerHTML='\n      <div class="gem-emoji">'.concat(t.emoji,'</div>\n      <div class="gem-name">').concat(qt(t.name),'</div>\n      <div class="gem-area">').concat(qt(t.area),"</div>\n    "),r.addEventListener("click",()=>jl(t.name)),n.appendChild(r)})}function jl(n){const e=rt.find(r=>r.name===n);if(!e)return;const t=j("mood-input");t&&(t.value="want something from ".concat(e.name," list in ").concat(e.area)),Vn()}function $y(){const n=j("gems-modal-list");n&&(n.innerHTML=rt.map(e=>'\n      <li>\n        <span style="font-size:18px;margin-right:6px;">'.concat(e.emoji,"</span>\n        <strong>").concat(e.name,'</strong> <span style="opacity:.8">• ').concat(e.area,"</span>\n      </li>")).join(""))}async function Hy(){try{Cn=await(await fetch("/data/travel_lists.json",{cache:"no-store"})).json()}catch(n){Cn={}}qy(),$l()}function qy(){const n=j("travel-city-select");if(!n)return;const e=Object.keys(Cn);n.innerHTML=e.map(t=>'<option value="'.concat(t,'">').concat(t,"</option>")).join(""),n.addEventListener("change",()=>$l())}function $l(){var r;const n=((r=j("travel-city-select"))==null?void 0:r.value)||Object.keys(Cn)[0],e=(Cn[n]||[]).slice(0,10),t=j("travel-grid");t&&(t.innerHTML="",e.forEach(i=>{const o=document.createElement("div");o.className="travel-card",o.innerHTML='\n      <div class="travel-emoji">'.concat(i.emoji,'</div>\n      <div class="travel-body">\n        <div class="travel-title">').concat(qt(i.name),'</div>\n        <div class="travel-note">').concat(qt(i.note||""),"</div>\n      </div>\n    "),o.addEventListener("click",()=>Hl(n,i.name)),t.appendChild(o)}))}function Hl(n,e){const t=j("mood-input");t&&(t.value="travel mode: try ".concat(e," in ").concat(n)),Vn()}async function zy(){try{zi=await(await fetch("/data/events.json",{cache:"no-store"})).json()}catch(n){zi=[]}Gy()}function Gy(){const n=j("events-grid");n&&(n.innerHTML="",zi.forEach(e=>{const t=document.createElement("div");t.className="event-card";const r=document.createElement("div");r.className="event-badge",r.textContent=e.emoji;const i=document.createElement("div");i.className="event-body";const o=document.createElement("div");o.className="event-title",o.textContent=e.title;const c=document.createElement("div");c.className="event-meta",c.textContent="".concat(e.date," • ").concat(e.area," • ").concat(e.price||"Free");const u=document.createElement("div");u.className="event-cta";const h=document.createElement("button");h.className="insights-toggle",h.textContent="Details",h.addEventListener("click",()=>ql(e.title));const f=document.createElement("button");f.className="insights-toggle",f.textContent="Directions",f.addEventListener("click",()=>zl(encodeURIComponent(e.map||e.title))),u.append(h,f),i.append(o,c,u),t.append(r,i),n.appendChild(t)}))}function ql(n){Ht("🎪 ".concat(n,"\n(Integrate ticket link or detail view here)"),"info")}function zl(n){window.open("https://www.google.com/maps/search/?api=1&query=".concat(n),"_blank")}function Ky(){document.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{var t;document.querySelectorAll(".tab-btn").forEach(r=>r.classList.remove("active")),n.classList.add("active");const e=n.dataset.tab;document.querySelectorAll(".tabpanel").forEach(r=>r.classList.add("hidden")),(t=j(e))==null||t.classList.remove("hidden")})})}function Wy(){var t;const n=j("mood-input");if(!((t=n==null?void 0:n.value)==null?void 0:t.trim()))return Ht("🧠 Please enter your mood first!","warn");Ht("🧠 Mood analyzed — using it in your next suggestion!","info"),Vn()}function Qy({timeSavedMin:n=2}={}){const e=localStorage.getItem("vfied_stats"),t=e?JSON.parse(e):{totalDecisions:0,timeSaved:0};t.totalDecisions+=1,t.timeSaved+=n,localStorage.setItem("vfied_stats",JSON.stringify(t)),Gl()}function Gl(){const n=localStorage.getItem("vfied_stats"),e=n?JSON.parse(n):{totalDecisions:0,timeSaved:0};gt("decisions-count",e.totalDecisions),gt("time-saved",e.timeSaved)}function Jy(){if(j("vfied-toast-host"))return;const n=document.createElement("div");n.id="vfied-toast-host",document.body.appendChild(n)}function Ht(n,e="info"){const t=j("vfied-toast-host");if(!t)return console.log(n);const r=document.createElement("div");r.className="vfied-toast ".concat(e),r.textContent=n,t.appendChild(r),requestAnimationFrame(()=>r.classList.add("show")),setTimeout(()=>{r.classList.remove("show"),setTimeout(()=>t.removeChild(r),250)},2600)}function Xy(){if(document.getElementById("vfied-runtime-styles"))return;const n="\n  /* Existing styles... */\n  \n  /* Mood Insight Card */\n  .mood-insight-card {\n    background: rgba(124, 58, 237, 0.1);\n    border: 1px solid rgba(124, 58, 237, 0.3);\n    border-radius: 12px;\n    padding: 12px;\n    margin-top: 12px;\n    opacity: 0;\n    transform: translateY(-10px);\n    transition: all 0.3s ease;\n    display: none;\n  }\n  \n  .mood-insight-card.show {\n    display: block;\n    opacity: 1;\n    transform: translateY(0);\n  }\n  \n  .vibe-badges {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n    margin-bottom: 8px;\n  }\n  \n  .vibe-badge {\n    background: rgba(255, 255, 255, 0.1);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n    border-radius: 20px;\n    padding: 4px 12px;\n    font-size: 12px;\n    font-weight: 600;\n  }\n  \n  .vibe-celebration { background: rgba(255, 215, 0, 0.2); border-color: gold; }\n  .vibe-hangover { background: rgba(255, 99, 71, 0.2); border-color: tomato; }\n  .vibe-date { background: rgba(255, 105, 180, 0.2); border-color: hotpink; }\n  .vibe-chaos { background: rgba(255, 69, 0, 0.2); border-color: orangered; }\n  .vibe-main-character { background: rgba(138, 43, 226, 0.2); border-color: blueviolet; }\n  \n  .mood-message {\n    color: #e5ecff;\n    font-size: 14px;\n    font-weight: 500;\n    font-style: italic;\n  }\n  \n  /* Rest of existing styles... */\n  ",e=document.createElement("style");e.id="vfied-runtime-styles",e.textContent=n,document.head.appendChild(e)}function j(n){return document.getElementById(n)}function gt(n,e){const t=j(n);t&&(t.textContent=e)}function Ai(n,e){const t=j(n);t&&(t.innerHTML=e)}function Yy(n){const e=j(n);e&&e.classList.remove("hidden")}function Kl(n){const e=j(n);e&&e.classList.add("hidden")}function Wl(n){gt("context-info",n)}function qt(n){return String(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function Zy(n){n&&(n.setAttribute("aria-hidden","false"),n.classList.add("open"))}function $a(n){n&&(n.setAttribute("aria-hidden","true"),n.classList.remove("open"))}window.VFIED={askFriend:Bl,exploreGem:jl,tryTravel:Hl,goEvent:ql,goMaps:zl};function e_(){const n=document.getElementById("mood-input");if(!n)return;const e=document.createElement("datalist");e.id="mood-suggestions",e.innerHTML='\n    <option value="just got promoted">\n    <option value="birthday celebration">\n    <option value="small win today">\n    <option value="hangover need help">\n    <option value="pms cravings">\n    <option value="date night">\n    <option value="chaos mode">\n    <option value="main character energy">\n    <option value="goblin mode activated">\n    <option value="heartbreak comfort">\n    <option value="friday vibes">\n    <option value="3am can\'t sleep">\n    <option value="studying for finals">\n    <option value="post workout hungry">\n  ',n.setAttribute("list","mood-suggestions"),n.parentNode.appendChild(e)}window.VFIED={...window.VFIED,setMood:function(n){var t;const e=document.getElementById("mood-input");e&&(e.value=n,(t=document.getElementById("decide-button"))==null||t.click())}};export{t_ as __vite_legacy_guard};
//# sourceMappingURL=index-BBR08a_6.js.map
