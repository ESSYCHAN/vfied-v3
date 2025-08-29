function e_(){import.meta.url,import("_").catch(()=>1),(async function*(){})().next()}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const Pu=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1",ku=3049,Ou={API_BASE:Pu?"http://localhost:".concat(ku):"https://vfied-v3.onrender.com"};var No={};/**
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
 */const qa=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Du=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],c=n[t++],u=n[t++],h=((s&7)<<18|(o&63)<<12|(c&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],c=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|c&63)}}return e.join("")},za={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],c=s+1<n.length,u=c?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,I=o>>2,A=(o&3)<<4|u>>4;let S=(u&15)<<2|f>>6,C=f&63;h||(C=64,c||(S=64)),r.push(t[I],t[A],t[S],t[C])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(qa(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Du(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const A=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||u==null||f==null||A==null)throw new Nu;const S=o<<2|u>>4;if(r.push(S),f!==64){const C=u<<4&240|f>>2;if(r.push(C),A!==64){const k=f<<6&192|A;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Nu extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Lu=function(n){const e=qa(n);return za.encodeByteArray(e,!0)},gr=function(n){return Lu(n).replace(/\./g,"")},Ga=function(n){try{return za.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Mu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof globalThis<"u")return globalThis;throw new Error("Unable to locate global object.")}/**
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
 */const Vu=()=>Mu().__FIREBASE_DEFAULTS__,xu=()=>{if(typeof process>"u"||typeof No>"u")return;const n=No.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Fu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}const e=n&&Ga(n[1]);return e&&JSON.parse(e)},Dr=()=>{try{return Vu()||xu()||Fu()}catch(n){console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(n));return}},Ka=n=>{var e,t;return(t=(e=Dr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Uu=n=>{const e=Ka(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error("Invalid host ".concat(e," with no separate hostname and port!"));const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Wa=()=>{var n;return(n=Dr())===null||n===void 0?void 0:n.config},Qa=n=>{var e;return(e=Dr())===null||e===void 0?void 0:e["_".concat(n)]};/**
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
 */class Bu{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function ju(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const c=Object.assign({iss:"https://securetoken.google.com/".concat(r),aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[gr(JSON.stringify(t)),gr(JSON.stringify(c)),""].join(".")}/**
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
 */function fe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $u(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(fe())}function Hu(){var n;const e=(n=Dr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(globalThis.process)==="[object process]"}catch(t){return!1}}function qu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ja(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function zu(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Gu(){const n=fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ku(){return!Hu()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Xa(){try{return typeof indexedDB=="object"}catch(n){return!1}}function Ya(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}function Wu(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const Qu="FirebaseError";class Ce extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Qu,Object.setPrototypeOf(this,Ce.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,At.prototype.create)}}class At{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s="".concat(this.service,"/").concat(e),o=this.errors[e],c=o?Ju(o,r):"Error",u="".concat(this.serviceName,": ").concat(c," (").concat(s,").");return new Ce(s,u,r)}}function Ju(n,e){return n.replace(Xu,(t,r)=>{const s=e[r];return s!=null?String(s):"<".concat(r,"?>")})}const Xu=/\{\$([^}]+)}/g;function Yu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function An(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],c=e[s];if(Lo(o)&&Lo(c)){if(!An(o,c))return!1}else if(o!==c)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Lo(n){return n!==null&&typeof n=="object"}/**
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
 */function On(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Zu(n,e){const t=new eh(n,e);return t.subscribe.bind(t)}class eh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");th(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=hi),s.error===void 0&&(s.error=hi),s.complete===void 0&&(s.complete=hi);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(c){}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function th(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function hi(){}/**
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
 */const nh=1e3,rh=2,ih=14400*1e3,sh=.5;function Mo(n,e=nh,t=rh){const r=e*Math.pow(t,n),s=Math.round(sh*r*(Math.random()-.5)*2);return Math.min(ih,r+s)}/**
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
 */class oh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Bu;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch(s){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error("Service ".concat(this.name," is not available"))}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error("Mismatching Component ".concat(e.name," for Provider ").concat(this.name,"."));if(this.component)throw Error("Component for ".concat(this.name," has already been provided"));if(this.component=e,!!this.shouldAutoInitialize()){if(ch(e))try{this.getOrInitializeService({instanceIdentifier:dt})}catch(t){}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch(o){}}}}clearInstance(e=dt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=dt){return this.instances.has(e)}getOptions(e=dt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error("".concat(this.name,"(").concat(r,") has already been initialized"));if(!this.isComponentSet())throw Error("Component ".concat(this.name," has not been registered yet"));const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,c]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&c.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const c=this.instances.get(s);return c&&e(c,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch(o){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:ah(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(s){}return r||null}normalizeInstanceIdentifier(e=dt){return this.component?this.component.multipleInstances?e:dt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ah(n){return n===dt?void 0:n}function ch(n){return n.instantiationMode==="EAGER"}/**
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
 */class lh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component ".concat(e.name," has already been registered with ").concat(this.name));t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new oh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var M;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(M||(M={}));const uh={debug:M.DEBUG,verbose:M.VERBOSE,info:M.INFO,warn:M.WARN,error:M.ERROR,silent:M.SILENT},hh=M.INFO,dh={[M.DEBUG]:"log",[M.VERBOSE]:"log",[M.INFO]:"info",[M.WARN]:"warn",[M.ERROR]:"error"},fh=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=dh[e];if(s)console[s]("[".concat(r,"]  ").concat(n.name,":"),...t);else throw new Error("Attempted to log a message with an invalid logType (value: ".concat(e,")"))};class Nr{constructor(e){this.name=e,this._logLevel=hh,this._logHandler=fh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in M))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,M.DEBUG,...e),this._logHandler(this,M.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,M.VERBOSE,...e),this._logHandler(this,M.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,M.INFO,...e),this._logHandler(this,M.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,M.WARN,...e),this._logHandler(this,M.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,M.ERROR,...e),this._logHandler(this,M.ERROR,...e)}}const ph=(n,e)=>e.some(t=>n instanceof t);let Vo,xo;function gh(){return Vo||(Vo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function mh(){return xo||(xo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Za=new WeakMap,Ci=new WeakMap,ec=new WeakMap,di=new WeakMap,Wi=new WeakMap;function yh(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",c)},o=()=>{t(tt(n.result)),s()},c=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",c)});return e.then(t=>{t instanceof IDBCursor&&Za.set(t,n)}).catch(()=>{}),Wi.set(e,n),e}function _h(n){if(Ci.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",c),n.removeEventListener("abort",c)},o=()=>{t(),s()},c=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",c),n.addEventListener("abort",c)});Ci.set(n,e)}let Pi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ci.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ec.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return tt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function vh(n){Pi=n(Pi)}function Ih(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(fi(this),e,...t);return ec.set(r,e.sort?e.sort():[e]),tt(r)}:mh().includes(n)?function(...e){return n.apply(fi(this),e),tt(Za.get(this))}:function(...e){return tt(n.apply(fi(this),e))}}function Eh(n){return typeof n=="function"?Ih(n):(n instanceof IDBTransaction&&_h(n),ph(n,gh())?new Proxy(n,Pi):n)}function tt(n){if(n instanceof IDBRequest)return yh(n);if(di.has(n))return di.get(n);const e=Eh(n);return e!==n&&(di.set(n,e),Wi.set(e,n)),e}const fi=n=>Wi.get(n);function tc(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const c=indexedDB.open(n,e),u=tt(c);return r&&c.addEventListener("upgradeneeded",h=>{r(tt(c.result),h.oldVersion,h.newVersion,tt(c.transaction),h)}),t&&c.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),u}const wh=["get","getKey","getAll","getAllKeys","count"],Th=["put","add","delete","clear"],pi=new Map;function Fo(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(pi.get(e))return pi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=Th.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||wh.includes(t)))return;const o=async function(c,...u){const h=this.transaction(c,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(u.shift())),(await Promise.all([f[t](...u),s&&h.done]))[0]};return pi.set(e,o),o}vh(n=>({...n,get:(e,t,r)=>Fo(e,t)||n.get(e,t,r),has:(e,t)=>!!Fo(e,t)||n.has(e,t)}));/**
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
 */class Ah{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(bh(t)){const r=t.getImmediate();return"".concat(r.library,"/").concat(r.version)}else return null}).filter(t=>t).join(" ")}}function bh(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ki="@firebase/app",Uo="0.10.13";/**
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
 */const je=new Nr("@firebase/app"),Sh="@firebase/app-compat",Rh="@firebase/analytics-compat",Ch="@firebase/analytics",Ph="@firebase/app-check-compat",kh="@firebase/app-check",Oh="@firebase/auth",Dh="@firebase/auth-compat",Nh="@firebase/database",Lh="@firebase/data-connect",Mh="@firebase/database-compat",Vh="@firebase/functions",xh="@firebase/functions-compat",Fh="@firebase/installations",Uh="@firebase/installations-compat",Bh="@firebase/messaging",jh="@firebase/messaging-compat",$h="@firebase/performance",Hh="@firebase/performance-compat",qh="@firebase/remote-config",zh="@firebase/remote-config-compat",Gh="@firebase/storage",Kh="@firebase/storage-compat",Wh="@firebase/firestore",Qh="@firebase/vertexai-preview",Jh="@firebase/firestore-compat",Xh="firebase",Yh="10.14.1";/**
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
 */const Oi="[DEFAULT]",Zh={[ki]:"fire-core",[Sh]:"fire-core-compat",[Ch]:"fire-analytics",[Rh]:"fire-analytics-compat",[kh]:"fire-app-check",[Ph]:"fire-app-check-compat",[Oh]:"fire-auth",[Dh]:"fire-auth-compat",[Nh]:"fire-rtdb",[Lh]:"fire-data-connect",[Mh]:"fire-rtdb-compat",[Vh]:"fire-fn",[xh]:"fire-fn-compat",[Fh]:"fire-iid",[Uh]:"fire-iid-compat",[Bh]:"fire-fcm",[jh]:"fire-fcm-compat",[$h]:"fire-perf",[Hh]:"fire-perf-compat",[qh]:"fire-rc",[zh]:"fire-rc-compat",[Gh]:"fire-gcs",[Kh]:"fire-gcs-compat",[Wh]:"fire-fst",[Jh]:"fire-fst-compat",[Qh]:"fire-vertex","fire-js":"fire-js",[Xh]:"fire-js-all"};/**
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
 */const mr=new Map,ed=new Map,Di=new Map;function Bo(n,e){try{n.container.addComponent(e)}catch(t){je.debug("Component ".concat(e.name," failed to register with FirebaseApp ").concat(n.name),t)}}function De(n){const e=n.name;if(Di.has(e))return je.debug("There were multiple attempts to register component ".concat(e,".")),!1;Di.set(e,n);for(const t of mr.values())Bo(t,n);for(const t of ed.values())Bo(t,n);return!0}function bt(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ze(n){return n.settings!==void 0}/**
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
 */const td={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nt=new At("app","Firebase",td);/**
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
 */class nd{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Re("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nt.create("app-deleted",{appName:this._name})}}/**
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
 */const Gt=Yh;function nc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Oi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw nt.create("bad-app-name",{appName:String(s)});if(t||(t=Wa()),!t)throw nt.create("no-options");const o=mr.get(s);if(o){if(An(t,o.options)&&An(r,o.config))return o;throw nt.create("duplicate-app",{appName:s})}const c=new lh(s);for(const h of Di.values())c.addComponent(h);const u=new nd(t,r,c);return mr.set(s,u),u}function Qi(n=Oi){const e=mr.get(n);if(!e&&n===Oi&&Wa())return nc();if(!e)throw nt.create("no-app",{appName:n});return e}function Te(n,e,t){var r;let s=(r=Zh[n])!==null&&r!==void 0?r:n;t&&(s+="-".concat(t));const o=s.match(/\s|\//),c=e.match(/\s|\//);if(o||c){const u=['Unable to register library "'.concat(s,'" with version "').concat(e,'":')];o&&u.push('library name "'.concat(s,'" contains illegal characters (whitespace or "/")')),o&&c&&u.push("and"),c&&u.push('version name "'.concat(e,'" contains illegal characters (whitespace or "/")')),je.warn(u.join(" "));return}De(new Re("".concat(s,"-version"),()=>({library:s,version:e}),"VERSION"))}/**
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
 */const rd="firebase-heartbeat-database",id=1,bn="firebase-heartbeat-store";let gi=null;function rc(){return gi||(gi=tc(rd,id,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(bn)}catch(t){console.warn(t)}}}}).catch(n=>{throw nt.create("idb-open",{originalErrorMessage:n.message})})),gi}async function sd(n){try{const t=(await rc()).transaction(bn),r=await t.objectStore(bn).get(ic(n));return await t.done,r}catch(e){if(e instanceof Ce)je.warn(e.message);else{const t=nt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});je.warn(t.message)}}}async function jo(n,e){try{const r=(await rc()).transaction(bn,"readwrite");await r.objectStore(bn).put(e,ic(n)),await r.done}catch(t){if(t instanceof Ce)je.warn(t.message);else{const r=nt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});je.warn(r.message)}}}function ic(n){return"".concat(n.name,"!").concat(n.options.appId)}/**
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
 */const od=1024,ad=720*60*60*1e3;class cd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ud(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=$o();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(c=>c.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(c=>{const u=new Date(c.date).valueOf();return Date.now()-u<=ad}),this._storage.overwrite(this._heartbeatsCache))}catch(r){je.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$o(),{heartbeatsToSend:r,unsentEntries:s}=ld(this._heartbeatsCache.heartbeats),o=gr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return je.warn(t),""}}}function $o(){return new Date().toISOString().substring(0,10)}function ld(n,e=od){const t=[];let r=n.slice();for(const s of n){const o=t.find(c=>c.agent===s.agent);if(o){if(o.dates.push(s.date),Ho(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ho(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class ud{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Xa()?Ya().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await sd(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return jo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return jo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ho(n){return gr(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function hd(n){De(new Re("platform-logger",e=>new Ah(e),"PRIVATE")),De(new Re("heartbeat",e=>new cd(e),"PRIVATE")),Te(ki,Uo,n),Te(ki,Uo,"esm2017"),Te("fire-js","")}hd("");var qo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,p){function m(){}m.prototype=p.prototype,v.D=p.prototype,v.prototype=new m,v.prototype.constructor=v,v.C=function(y,_,w){for(var g=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)g[Le-2]=arguments[Le];return p.prototype[_].apply(y,g)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(v,p,m){m||(m=0);var y=Array(16);if(typeof p=="string")for(var _=0;16>_;++_)y[_]=p.charCodeAt(m++)|p.charCodeAt(m++)<<8|p.charCodeAt(m++)<<16|p.charCodeAt(m++)<<24;else for(_=0;16>_;++_)y[_]=p[m++]|p[m++]<<8|p[m++]<<16|p[m++]<<24;p=v.g[0],m=v.g[1],_=v.g[2];var w=v.g[3],g=p+(w^m&(_^w))+y[0]+3614090360&4294967295;p=m+(g<<7&4294967295|g>>>25),g=w+(_^p&(m^_))+y[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=_+(m^w&(p^m))+y[2]+606105819&4294967295,_=w+(g<<17&4294967295|g>>>15),g=m+(p^_&(w^p))+y[3]+3250441966&4294967295,m=_+(g<<22&4294967295|g>>>10),g=p+(w^m&(_^w))+y[4]+4118548399&4294967295,p=m+(g<<7&4294967295|g>>>25),g=w+(_^p&(m^_))+y[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=_+(m^w&(p^m))+y[6]+2821735955&4294967295,_=w+(g<<17&4294967295|g>>>15),g=m+(p^_&(w^p))+y[7]+4249261313&4294967295,m=_+(g<<22&4294967295|g>>>10),g=p+(w^m&(_^w))+y[8]+1770035416&4294967295,p=m+(g<<7&4294967295|g>>>25),g=w+(_^p&(m^_))+y[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=_+(m^w&(p^m))+y[10]+4294925233&4294967295,_=w+(g<<17&4294967295|g>>>15),g=m+(p^_&(w^p))+y[11]+2304563134&4294967295,m=_+(g<<22&4294967295|g>>>10),g=p+(w^m&(_^w))+y[12]+1804603682&4294967295,p=m+(g<<7&4294967295|g>>>25),g=w+(_^p&(m^_))+y[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=_+(m^w&(p^m))+y[14]+2792965006&4294967295,_=w+(g<<17&4294967295|g>>>15),g=m+(p^_&(w^p))+y[15]+1236535329&4294967295,m=_+(g<<22&4294967295|g>>>10),g=p+(_^w&(m^_))+y[1]+4129170786&4294967295,p=m+(g<<5&4294967295|g>>>27),g=w+(m^_&(p^m))+y[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=_+(p^m&(w^p))+y[11]+643717713&4294967295,_=w+(g<<14&4294967295|g>>>18),g=m+(w^p&(_^w))+y[0]+3921069994&4294967295,m=_+(g<<20&4294967295|g>>>12),g=p+(_^w&(m^_))+y[5]+3593408605&4294967295,p=m+(g<<5&4294967295|g>>>27),g=w+(m^_&(p^m))+y[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=_+(p^m&(w^p))+y[15]+3634488961&4294967295,_=w+(g<<14&4294967295|g>>>18),g=m+(w^p&(_^w))+y[4]+3889429448&4294967295,m=_+(g<<20&4294967295|g>>>12),g=p+(_^w&(m^_))+y[9]+568446438&4294967295,p=m+(g<<5&4294967295|g>>>27),g=w+(m^_&(p^m))+y[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=_+(p^m&(w^p))+y[3]+4107603335&4294967295,_=w+(g<<14&4294967295|g>>>18),g=m+(w^p&(_^w))+y[8]+1163531501&4294967295,m=_+(g<<20&4294967295|g>>>12),g=p+(_^w&(m^_))+y[13]+2850285829&4294967295,p=m+(g<<5&4294967295|g>>>27),g=w+(m^_&(p^m))+y[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=_+(p^m&(w^p))+y[7]+1735328473&4294967295,_=w+(g<<14&4294967295|g>>>18),g=m+(w^p&(_^w))+y[12]+2368359562&4294967295,m=_+(g<<20&4294967295|g>>>12),g=p+(m^_^w)+y[5]+4294588738&4294967295,p=m+(g<<4&4294967295|g>>>28),g=w+(p^m^_)+y[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=_+(w^p^m)+y[11]+1839030562&4294967295,_=w+(g<<16&4294967295|g>>>16),g=m+(_^w^p)+y[14]+4259657740&4294967295,m=_+(g<<23&4294967295|g>>>9),g=p+(m^_^w)+y[1]+2763975236&4294967295,p=m+(g<<4&4294967295|g>>>28),g=w+(p^m^_)+y[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=_+(w^p^m)+y[7]+4139469664&4294967295,_=w+(g<<16&4294967295|g>>>16),g=m+(_^w^p)+y[10]+3200236656&4294967295,m=_+(g<<23&4294967295|g>>>9),g=p+(m^_^w)+y[13]+681279174&4294967295,p=m+(g<<4&4294967295|g>>>28),g=w+(p^m^_)+y[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=_+(w^p^m)+y[3]+3572445317&4294967295,_=w+(g<<16&4294967295|g>>>16),g=m+(_^w^p)+y[6]+76029189&4294967295,m=_+(g<<23&4294967295|g>>>9),g=p+(m^_^w)+y[9]+3654602809&4294967295,p=m+(g<<4&4294967295|g>>>28),g=w+(p^m^_)+y[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=_+(w^p^m)+y[15]+530742520&4294967295,_=w+(g<<16&4294967295|g>>>16),g=m+(_^w^p)+y[2]+3299628645&4294967295,m=_+(g<<23&4294967295|g>>>9),g=p+(_^(m|~w))+y[0]+4096336452&4294967295,p=m+(g<<6&4294967295|g>>>26),g=w+(m^(p|~_))+y[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=_+(p^(w|~m))+y[14]+2878612391&4294967295,_=w+(g<<15&4294967295|g>>>17),g=m+(w^(_|~p))+y[5]+4237533241&4294967295,m=_+(g<<21&4294967295|g>>>11),g=p+(_^(m|~w))+y[12]+1700485571&4294967295,p=m+(g<<6&4294967295|g>>>26),g=w+(m^(p|~_))+y[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=_+(p^(w|~m))+y[10]+4293915773&4294967295,_=w+(g<<15&4294967295|g>>>17),g=m+(w^(_|~p))+y[1]+2240044497&4294967295,m=_+(g<<21&4294967295|g>>>11),g=p+(_^(m|~w))+y[8]+1873313359&4294967295,p=m+(g<<6&4294967295|g>>>26),g=w+(m^(p|~_))+y[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=_+(p^(w|~m))+y[6]+2734768916&4294967295,_=w+(g<<15&4294967295|g>>>17),g=m+(w^(_|~p))+y[13]+1309151649&4294967295,m=_+(g<<21&4294967295|g>>>11),g=p+(_^(m|~w))+y[4]+4149444226&4294967295,p=m+(g<<6&4294967295|g>>>26),g=w+(m^(p|~_))+y[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=_+(p^(w|~m))+y[2]+718787259&4294967295,_=w+(g<<15&4294967295|g>>>17),g=m+(w^(_|~p))+y[9]+3951481745&4294967295,v.g[0]=v.g[0]+p&4294967295,v.g[1]=v.g[1]+(_+(g<<21&4294967295|g>>>11))&4294967295,v.g[2]=v.g[2]+_&4294967295,v.g[3]=v.g[3]+w&4294967295}r.prototype.u=function(v,p){p===void 0&&(p=v.length);for(var m=p-this.blockSize,y=this.B,_=this.h,w=0;w<p;){if(_==0)for(;w<=m;)s(this,v,w),w+=this.blockSize;if(typeof v=="string"){for(;w<p;)if(y[_++]=v.charCodeAt(w++),_==this.blockSize){s(this,y),_=0;break}}else for(;w<p;)if(y[_++]=v[w++],_==this.blockSize){s(this,y),_=0;break}}this.h=_,this.o+=p},r.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var p=1;p<v.length-8;++p)v[p]=0;var m=8*this.o;for(p=v.length-8;p<v.length;++p)v[p]=m&255,m/=256;for(this.u(v),v=Array(16),p=m=0;4>p;++p)for(var y=0;32>y;y+=8)v[m++]=this.g[p]>>>y&255;return v};function o(v,p){var m=u;return Object.prototype.hasOwnProperty.call(m,v)?m[v]:m[v]=p(v)}function c(v,p){this.h=p;for(var m=[],y=!0,_=v.length-1;0<=_;_--){var w=v[_]|0;y&&w==p||(m[_]=w,y=!1)}this.g=m}var u={};function h(v){return-128<=v&&128>v?o(v,function(p){return new c([p|0],0>p?-1:0)}):new c([v|0],0>v?-1:0)}function f(v){if(isNaN(v)||!isFinite(v))return A;if(0>v)return N(f(-v));for(var p=[],m=1,y=0;v>=m;y++)p[y]=v/m|0,m*=4294967296;return new c(p,0)}function I(v,p){if(v.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(v.charAt(0)=="-")return N(I(v.substring(1),p));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var m=f(Math.pow(p,8)),y=A,_=0;_<v.length;_+=8){var w=Math.min(8,v.length-_),g=parseInt(v.substring(_,_+w),p);8>w?(w=f(Math.pow(p,w)),y=y.j(w).add(f(g))):(y=y.j(m),y=y.add(f(g)))}return y}var A=h(0),S=h(1),C=h(16777216);n=c.prototype,n.m=function(){if(F(this))return-N(this).m();for(var v=0,p=1,m=0;m<this.g.length;m++){var y=this.i(m);v+=(0<=y?y:4294967296+y)*p,p*=4294967296}return v},n.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(k(this))return"0";if(F(this))return"-"+N(this).toString(v);for(var p=f(Math.pow(v,6)),m=this,y="";;){var _=J(m,p).g;m=X(m,_.j(p));var w=((0<m.g.length?m.g[0]:m.h)>>>0).toString(v);if(m=_,k(m))return w+y;for(;6>w.length;)w="0"+w;y=w+y}},n.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function k(v){if(v.h!=0)return!1;for(var p=0;p<v.g.length;p++)if(v.g[p]!=0)return!1;return!0}function F(v){return v.h==-1}n.l=function(v){return v=X(this,v),F(v)?-1:k(v)?0:1};function N(v){for(var p=v.g.length,m=[],y=0;y<p;y++)m[y]=~v.g[y];return new c(m,~v.h).add(S)}n.abs=function(){return F(this)?N(this):this},n.add=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],y=0,_=0;_<=p;_++){var w=y+(this.i(_)&65535)+(v.i(_)&65535),g=(w>>>16)+(this.i(_)>>>16)+(v.i(_)>>>16);y=g>>>16,w&=65535,g&=65535,m[_]=g<<16|w}return new c(m,m[m.length-1]&-2147483648?-1:0)};function X(v,p){return v.add(N(p))}n.j=function(v){if(k(this)||k(v))return A;if(F(this))return F(v)?N(this).j(N(v)):N(N(this).j(v));if(F(v))return N(this.j(N(v)));if(0>this.l(C)&&0>v.l(C))return f(this.m()*v.m());for(var p=this.g.length+v.g.length,m=[],y=0;y<2*p;y++)m[y]=0;for(y=0;y<this.g.length;y++)for(var _=0;_<v.g.length;_++){var w=this.i(y)>>>16,g=this.i(y)&65535,Le=v.i(_)>>>16,Jt=v.i(_)&65535;m[2*y+2*_]+=g*Jt,W(m,2*y+2*_),m[2*y+2*_+1]+=w*Jt,W(m,2*y+2*_+1),m[2*y+2*_+1]+=g*Le,W(m,2*y+2*_+1),m[2*y+2*_+2]+=w*Le,W(m,2*y+2*_+2)}for(y=0;y<p;y++)m[y]=m[2*y+1]<<16|m[2*y];for(y=p;y<2*p;y++)m[y]=0;return new c(m,0)};function W(v,p){for(;(v[p]&65535)!=v[p];)v[p+1]+=v[p]>>>16,v[p]&=65535,p++}function K(v,p){this.g=v,this.h=p}function J(v,p){if(k(p))throw Error("division by zero");if(k(v))return new K(A,A);if(F(v))return p=J(N(v),p),new K(N(p.g),N(p.h));if(F(p))return p=J(v,N(p)),new K(N(p.g),p.h);if(30<v.g.length){if(F(v)||F(p))throw Error("slowDivide_ only works with positive integers.");for(var m=S,y=p;0>=y.l(v);)m=Pe(m),y=Pe(y);var _=Y(m,1),w=Y(y,1);for(y=Y(y,2),m=Y(m,2);!k(y);){var g=w.add(y);0>=g.l(v)&&(_=_.add(m),w=g),y=Y(y,1),m=Y(m,1)}return p=X(v,_.j(p)),new K(_,p)}for(_=A;0<=v.l(p);){for(m=Math.max(1,Math.floor(v.m()/p.m())),y=Math.ceil(Math.log(m)/Math.LN2),y=48>=y?1:Math.pow(2,y-48),w=f(m),g=w.j(p);F(g)||0<g.l(v);)m-=y,w=f(m),g=w.j(p);k(w)&&(w=S),_=_.add(w),v=X(v,g)}return new K(_,v)}n.A=function(v){return J(this,v).h},n.and=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)&v.i(y);return new c(m,this.h&v.h)},n.or=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)|v.i(y);return new c(m,this.h|v.h)},n.xor=function(v){for(var p=Math.max(this.g.length,v.g.length),m=[],y=0;y<p;y++)m[y]=this.i(y)^v.i(y);return new c(m,this.h^v.h)};function Pe(v){for(var p=v.g.length+1,m=[],y=0;y<p;y++)m[y]=v.i(y)<<1|v.i(y-1)>>>31;return new c(m,v.h)}function Y(v,p){var m=p>>5;p%=32;for(var y=v.g.length-m,_=[],w=0;w<y;w++)_[w]=0<p?v.i(w+m)>>>p|v.i(w+m+1)<<32-p:v.i(w+m);return new c(_,v.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,c.prototype.add=c.prototype.add,c.prototype.multiply=c.prototype.j,c.prototype.modulo=c.prototype.A,c.prototype.compare=c.prototype.l,c.prototype.toNumber=c.prototype.m,c.prototype.toString=c.prototype.toString,c.prototype.getBits=c.prototype.i,c.fromNumber=f,c.fromString=I,sc=c}).apply(typeof qo<"u"?qo:typeof self<"u"?self:typeof window<"u"?window:{});var rr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var oc,mn,ac,lr,Ni,cc,lc,uc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,a,l){return i==Array.prototype||i==Object.prototype||(i[a]=l.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof rr=="object"&&rr];for(var a=0;a<i.length;++a){var l=i[a];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function s(i,a){if(a)e:{var l=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var E=i[d];if(!(E in l))break e;l=l[E]}i=i[i.length-1],d=l[i],a=a(d),a!=d&&a!=null&&e(l,i,{configurable:!0,writable:!0,value:a})}}function o(i,a){i instanceof String&&(i+="");var l=0,d=!1,E={next:function(){if(!d&&l<i.length){var T=l++;return{value:a(T,i[T]),done:!1}}return d=!0,{done:!0,value:void 0}}};return E[Symbol.iterator]=function(){return E},E}s("Array.prototype.values",function(i){return i||function(){return o(this,function(a,l){return l})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var c=c||{},u=this||self;function h(i){var a=typeof i;return a=a!="object"?a:i?Array.isArray(i)?"array":a:"null",a=="array"||a=="object"&&typeof i.length=="number"}function f(i){var a=typeof i;return a=="object"&&i!=null||a=="function"}function I(i,a,l){return i.call.apply(i.bind,arguments)}function A(i,a,l){if(!i)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var E=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(E,d),i.apply(a,E)}}return function(){return i.apply(a,arguments)}}function S(i,a,l){return S=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?I:A,S.apply(null,arguments)}function C(i,a){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function k(i,a){function l(){}l.prototype=a.prototype,i.aa=a.prototype,i.prototype=new l,i.prototype.constructor=i,i.Qb=function(d,E,T){for(var R=Array(arguments.length-2),$=2;$<arguments.length;$++)R[$-2]=arguments[$];return a.prototype[E].apply(d,R)}}function F(i){const a=i.length;if(0<a){const l=Array(a);for(let d=0;d<a;d++)l[d]=i[d];return l}return[]}function N(i,a){for(let l=1;l<arguments.length;l++){const d=arguments[l];if(h(d)){const E=i.length||0,T=d.length||0;i.length=E+T;for(let R=0;R<T;R++)i[E+R]=d[R]}else i.push(d)}}class X{constructor(a,l){this.i=a,this.j=l,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function W(i){return/^[\s\xa0]*$/.test(i)}function K(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function J(i){return J[" "](i),i}J[" "]=function(){};var Pe=K().indexOf("Gecko")!=-1&&!(K().toLowerCase().indexOf("webkit")!=-1&&K().indexOf("Edge")==-1)&&!(K().indexOf("Trident")!=-1||K().indexOf("MSIE")!=-1)&&K().indexOf("Edge")==-1;function Y(i,a,l){for(const d in i)a.call(l,i[d],d,i)}function v(i,a){for(const l in i)a.call(void 0,i[l],l,i)}function p(i){const a={};for(const l in i)a[l]=i[l];return a}const m="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function y(i,a){let l,d;for(let E=1;E<arguments.length;E++){d=arguments[E];for(l in d)i[l]=d[l];for(let T=0;T<m.length;T++)l=m[T],Object.prototype.hasOwnProperty.call(d,l)&&(i[l]=d[l])}}function _(i){var a=1;i=i.split(":");const l=[];for(;0<a&&i.length;)l.push(i.shift()),a--;return i.length&&l.push(i.join(":")),l}function w(i){u.setTimeout(()=>{throw i},0)}function g(){var i=jr;let a=null;return i.g&&(a=i.g,i.g=i.g.next,i.g||(i.h=null),a.next=null),a}class Le{constructor(){this.h=this.g=null}add(a,l){const d=Jt.get();d.set(a,l),this.h?this.h.next=d:this.g=d,this.h=d}}var Jt=new X(()=>new Wl,i=>i.reset());class Wl{constructor(){this.next=this.g=this.h=null}set(a,l){this.h=a,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Xt,Yt=!1,jr=new Le,Ds=()=>{const i=u.Promise.resolve(void 0);Xt=()=>{i.then(Ql)}};var Ql=()=>{for(var i;i=g();){try{i.h.call(i.g)}catch(l){w(l)}var a=Jt;a.j(i),100>a.h&&(a.h++,i.next=a.g,a.g=i)}Yt=!1};function qe(){this.s=this.s,this.C=this.C}qe.prototype.s=!1,qe.prototype.ma=function(){this.s||(this.s=!0,this.N())},qe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function oe(i,a){this.type=i,this.g=this.target=a,this.defaultPrevented=!1}oe.prototype.h=function(){this.defaultPrevented=!0};var Jl=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,a=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};u.addEventListener("test",l,a),u.removeEventListener("test",l,a)}catch(l){}return i})();function Zt(i,a){if(oe.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var l=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=a,a=i.relatedTarget){if(Pe){e:{try{J(a.nodeName);var E=!0;break e}catch(T){}E=!1}E||(a=null)}}else l=="mouseover"?a=i.fromElement:l=="mouseout"&&(a=i.toElement);this.relatedTarget=a,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:Xl[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Zt.aa.h.call(this)}}k(Zt,oe);var Xl={2:"touch",3:"pen",4:"mouse"};Zt.prototype.h=function(){Zt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Fn="closure_listenable_"+(1e6*Math.random()|0),Yl=0;function Zl(i,a,l,d,E){this.listener=i,this.proxy=null,this.src=a,this.type=l,this.capture=!!d,this.ha=E,this.key=++Yl,this.da=this.fa=!1}function Un(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Bn(i){this.src=i,this.g={},this.h=0}Bn.prototype.add=function(i,a,l,d,E){var T=i.toString();i=this.g[T],i||(i=this.g[T]=[],this.h++);var R=Hr(i,a,d,E);return-1<R?(a=i[R],l||(a.fa=!1)):(a=new Zl(a,this.src,T,!!d,E),a.fa=l,i.push(a)),a};function $r(i,a){var l=a.type;if(l in i.g){var d=i.g[l],E=Array.prototype.indexOf.call(d,a,void 0),T;(T=0<=E)&&Array.prototype.splice.call(d,E,1),T&&(Un(a),i.g[l].length==0&&(delete i.g[l],i.h--))}}function Hr(i,a,l,d){for(var E=0;E<i.length;++E){var T=i[E];if(!T.da&&T.listener==a&&T.capture==!!l&&T.ha==d)return E}return-1}var qr="closure_lm_"+(1e6*Math.random()|0),zr={};function Ns(i,a,l,d,E){if(Array.isArray(a)){for(var T=0;T<a.length;T++)Ns(i,a[T],l,d,E);return null}return l=Vs(l),i&&i[Fn]?i.K(a,l,f(d)?!!d.capture:!1,E):eu(i,a,l,!1,d,E)}function eu(i,a,l,d,E,T){if(!a)throw Error("Invalid event type");var R=f(E)?!!E.capture:!!E,$=Kr(i);if($||(i[qr]=$=new Bn(i)),l=$.add(a,l,d,R,T),l.proxy)return l;if(d=tu(),l.proxy=d,d.src=i,d.listener=l,i.addEventListener)Jl||(E=R),E===void 0&&(E=!1),i.addEventListener(a.toString(),d,E);else if(i.attachEvent)i.attachEvent(Ms(a.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function tu(){function i(l){return a.call(i.src,i.listener,l)}const a=nu;return i}function Ls(i,a,l,d,E){if(Array.isArray(a))for(var T=0;T<a.length;T++)Ls(i,a[T],l,d,E);else d=f(d)?!!d.capture:!!d,l=Vs(l),i&&i[Fn]?(i=i.i,a=String(a).toString(),a in i.g&&(T=i.g[a],l=Hr(T,l,d,E),-1<l&&(Un(T[l]),Array.prototype.splice.call(T,l,1),T.length==0&&(delete i.g[a],i.h--)))):i&&(i=Kr(i))&&(a=i.g[a.toString()],i=-1,a&&(i=Hr(a,l,d,E)),(l=-1<i?a[i]:null)&&Gr(l))}function Gr(i){if(typeof i!="number"&&i&&!i.da){var a=i.src;if(a&&a[Fn])$r(a.i,i);else{var l=i.type,d=i.proxy;a.removeEventListener?a.removeEventListener(l,d,i.capture):a.detachEvent?a.detachEvent(Ms(l),d):a.addListener&&a.removeListener&&a.removeListener(d),(l=Kr(a))?($r(l,i),l.h==0&&(l.src=null,a[qr]=null)):Un(i)}}}function Ms(i){return i in zr?zr[i]:zr[i]="on"+i}function nu(i,a){if(i.da)i=!0;else{a=new Zt(a,this);var l=i.listener,d=i.ha||i.src;i.fa&&Gr(i),i=l.call(d,a)}return i}function Kr(i){return i=i[qr],i instanceof Bn?i:null}var Wr="__closure_events_fn_"+(1e9*Math.random()>>>0);function Vs(i){return typeof i=="function"?i:(i[Wr]||(i[Wr]=function(a){return i.handleEvent(a)}),i[Wr])}function ae(){qe.call(this),this.i=new Bn(this),this.M=this,this.F=null}k(ae,qe),ae.prototype[Fn]=!0,ae.prototype.removeEventListener=function(i,a,l,d){Ls(this,i,a,l,d)};function pe(i,a){var l,d=i.F;if(d)for(l=[];d;d=d.F)l.push(d);if(i=i.M,d=a.type||a,typeof a=="string")a=new oe(a,i);else if(a instanceof oe)a.target=a.target||i;else{var E=a;a=new oe(d,i),y(a,E)}if(E=!0,l)for(var T=l.length-1;0<=T;T--){var R=a.g=l[T];E=jn(R,d,!0,a)&&E}if(R=a.g=i,E=jn(R,d,!0,a)&&E,E=jn(R,d,!1,a)&&E,l)for(T=0;T<l.length;T++)R=a.g=l[T],E=jn(R,d,!1,a)&&E}ae.prototype.N=function(){if(ae.aa.N.call(this),this.i){var i=this.i,a;for(a in i.g){for(var l=i.g[a],d=0;d<l.length;d++)Un(l[d]);delete i.g[a],i.h--}}this.F=null},ae.prototype.K=function(i,a,l,d){return this.i.add(String(i),a,!1,l,d)},ae.prototype.L=function(i,a,l,d){return this.i.add(String(i),a,!0,l,d)};function jn(i,a,l,d){if(a=i.i.g[String(a)],!a)return!0;a=a.concat();for(var E=!0,T=0;T<a.length;++T){var R=a[T];if(R&&!R.da&&R.capture==l){var $=R.listener,te=R.ha||R.src;R.fa&&$r(i.i,R),E=$.call(te,d)!==!1&&E}}return E&&!d.defaultPrevented}function xs(i,a,l){if(typeof i=="function")l&&(i=S(i,l));else if(i&&typeof i.handleEvent=="function")i=S(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:u.setTimeout(i,a||0)}function Fs(i){i.g=xs(()=>{i.g=null,i.i&&(i.i=!1,Fs(i))},i.l);const a=i.h;i.h=null,i.m.apply(null,a)}class ru extends qe{constructor(a,l){super(),this.m=a,this.l=l,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Fs(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function en(i){qe.call(this),this.h=i,this.g={}}k(en,qe);var Us=[];function Bs(i){Y(i.g,function(a,l){this.g.hasOwnProperty(l)&&Gr(a)},i),i.g={}}en.prototype.N=function(){en.aa.N.call(this),Bs(this)},en.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qr=u.JSON.stringify,iu=u.JSON.parse,su=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function Jr(){}Jr.prototype.h=null;function js(i){return i.h||(i.h=i.i())}function $s(){}var tn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Xr(){oe.call(this,"d")}k(Xr,oe);function Yr(){oe.call(this,"c")}k(Yr,oe);var ct={},Hs=null;function $n(){return Hs=Hs||new ae}ct.La="serverreachability";function qs(i){oe.call(this,ct.La,i)}k(qs,oe);function nn(i){const a=$n();pe(a,new qs(a))}ct.STAT_EVENT="statevent";function zs(i,a){oe.call(this,ct.STAT_EVENT,i),this.stat=a}k(zs,oe);function ge(i){const a=$n();pe(a,new zs(a,i))}ct.Ma="timingevent";function Gs(i,a){oe.call(this,ct.Ma,i),this.size=a}k(Gs,oe);function rn(i,a){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},a)}function sn(){this.g=!0}sn.prototype.xa=function(){this.g=!1};function ou(i,a,l,d,E,T){i.info(function(){if(i.g)if(T)for(var R="",$=T.split("&"),te=0;te<$.length;te++){var U=$[te].split("=");if(1<U.length){var ce=U[0];U=U[1];var le=ce.split("_");R=2<=le.length&&le[1]=="type"?R+(ce+"="+U+"&"):R+(ce+"=redacted&")}}else R=null;else R=T;return"XMLHTTP REQ ("+d+") [attempt "+E+"]: "+a+"\n"+l+"\n"+R})}function au(i,a,l,d,E,T,R){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+E+"]: "+a+"\n"+l+"\n"+T+" "+R})}function St(i,a,l,d){i.info(function(){return"XMLHTTP TEXT ("+a+"): "+lu(i,l)+(d?" "+d:"")})}function cu(i,a){i.info(function(){return"TIMEOUT: "+a})}sn.prototype.info=function(){};function lu(i,a){if(!i.g)return a;if(!a)return null;try{var l=JSON.parse(a);if(l){for(i=0;i<l.length;i++)if(Array.isArray(l[i])){var d=l[i];if(!(2>d.length)){var E=d[1];if(Array.isArray(E)&&!(1>E.length)){var T=E[0];if(T!="noop"&&T!="stop"&&T!="close")for(var R=1;R<E.length;R++)E[R]=""}}}}return Qr(l)}catch($){return a}}var Hn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ks={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Zr;function qn(){}k(qn,Jr),qn.prototype.g=function(){return new XMLHttpRequest},qn.prototype.i=function(){return{}},Zr=new qn;function ze(i,a,l,d){this.j=i,this.i=a,this.l=l,this.R=d||1,this.U=new en(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Ws}function Ws(){this.i=null,this.g="",this.h=!1}var Qs={},ei={};function ti(i,a,l){i.L=1,i.v=Wn(Me(a)),i.m=l,i.P=!0,Js(i,null)}function Js(i,a){i.F=Date.now(),zn(i),i.A=Me(i.v);var l=i.A,d=i.R;Array.isArray(d)||(d=[String(d)]),uo(l.i,"t",d),i.C=0,l=i.j.J,i.h=new Ws,i.g=Po(i.j,l?a:null,!i.m),0<i.O&&(i.M=new ru(S(i.Y,i,i.g),i.O)),a=i.U,l=i.g,d=i.ca;var E="readystatechange";Array.isArray(E)||(E&&(Us[0]=E.toString()),E=Us);for(var T=0;T<E.length;T++){var R=Ns(l,E[T],d||a.handleEvent,!1,a.h||a);if(!R)break;a.g[R.key]=R}a=i.H?p(i.H):{},i.m?(i.u||(i.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,a)):(i.u="GET",i.g.ea(i.A,i.u,null,a)),nn(),ou(i.i,i.u,i.A,i.l,i.R,i.m)}ze.prototype.ca=function(i){i=i.target;const a=this.M;a&&Ve(i)==3?a.j():this.Y(i)},ze.prototype.Y=function(i){try{if(i==this.g)e:{const le=Ve(this.g);var a=this.g.Ba();const Pt=this.g.Z();if(!(3>le)&&(le!=3||this.g&&(this.h.h||this.g.oa()||_o(this.g)))){this.J||le!=4||a==7||(a==8||0>=Pt?nn(3):nn(2)),ni(this);var l=this.g.Z();this.X=l;t:if(Xs(this)){var d=_o(this.g);i="";var E=d.length,T=Ve(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){lt(this),on(this);var R="";break t}this.h.i=new u.TextDecoder}for(a=0;a<E;a++)this.h.h=!0,i+=this.h.i.decode(d[a],{stream:!(T&&a==E-1)});d.length=0,this.h.g+=i,this.C=0,R=this.h.g}else R=this.g.oa();if(this.o=l==200,au(this.i,this.u,this.A,this.l,this.R,le,l),this.o){if(this.T&&!this.K){t:{if(this.g){var $,te=this.g;if(($=te.g?te.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!W($)){var U=$;break t}}U=null}if(l=U)St(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ri(this,l);else{this.o=!1,this.s=3,ge(12),lt(this),on(this);break e}}if(this.P){l=!0;let be;for(;!this.J&&this.C<R.length;)if(be=uu(this,R),be==ei){le==4&&(this.s=4,ge(14),l=!1),St(this.i,this.l,null,"[Incomplete Response]");break}else if(be==Qs){this.s=4,ge(15),St(this.i,this.l,R,"[Invalid Chunk]"),l=!1;break}else St(this.i,this.l,be,null),ri(this,be);if(Xs(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),le!=4||R.length!=0||this.h.h||(this.s=1,ge(16),l=!1),this.o=this.o&&l,!l)St(this.i,this.l,R,"[Invalid Chunked Response]"),lt(this),on(this);else if(0<R.length&&!this.W){this.W=!0;var ce=this.j;ce.g==this&&ce.ba&&!ce.M&&(ce.j.info("Great, no buffering proxy detected. Bytes received: "+R.length),li(ce),ce.M=!0,ge(11))}}else St(this.i,this.l,R,null),ri(this,R);le==4&&lt(this),this.o&&!this.J&&(le==4?bo(this.j,this):(this.o=!1,zn(this)))}else Ru(this.g),l==400&&0<R.indexOf("Unknown SID")?(this.s=3,ge(12)):(this.s=0,ge(13)),lt(this),on(this)}}}catch(le){}finally{}};function Xs(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function uu(i,a){var l=i.C,d=a.indexOf("\n",l);return d==-1?ei:(l=Number(a.substring(l,d)),isNaN(l)?Qs:(d+=1,d+l>a.length?ei:(a=a.slice(d,d+l),i.C=d+l,a)))}ze.prototype.cancel=function(){this.J=!0,lt(this)};function zn(i){i.S=Date.now()+i.I,Ys(i,i.I)}function Ys(i,a){if(i.B!=null)throw Error("WatchDog timer not null");i.B=rn(S(i.ba,i),a)}function ni(i){i.B&&(u.clearTimeout(i.B),i.B=null)}ze.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(cu(this.i,this.A),this.L!=2&&(nn(),ge(17)),lt(this),this.s=2,on(this)):Ys(this,this.S-i)};function on(i){i.j.G==0||i.J||bo(i.j,i)}function lt(i){ni(i);var a=i.M;a&&typeof a.ma=="function"&&a.ma(),i.M=null,Bs(i.U),i.g&&(a=i.g,i.g=null,a.abort(),a.ma())}function ri(i,a){try{var l=i.j;if(l.G!=0&&(l.g==i||ii(l.h,i))){if(!i.K&&ii(l.h,i)&&l.G==3){try{var d=l.Da.g.parse(a)}catch(U){d=null}if(Array.isArray(d)&&d.length==3){var E=d;if(E[0]==0){e:if(!l.u){if(l.g)if(l.g.F+3e3<i.F)er(l),Yn(l);else break e;ci(l),ge(18)}}else l.za=E[1],0<l.za-l.T&&37500>E[2]&&l.F&&l.v==0&&!l.C&&(l.C=rn(S(l.Za,l),6e3));if(1>=to(l.h)&&l.ca){try{l.ca()}catch(U){}l.ca=void 0}}else ht(l,11)}else if((i.K||l.g==i)&&er(l),!W(a))for(E=l.Da.g.parse(a),a=0;a<E.length;a++){let U=E[a];if(l.T=U[0],U=U[1],l.G==2)if(U[0]=="c"){l.K=U[1],l.ia=U[2];const ce=U[3];ce!=null&&(l.la=ce,l.j.info("VER="+l.la));const le=U[4];le!=null&&(l.Aa=le,l.j.info("SVER="+l.Aa));const Pt=U[5];Pt!=null&&typeof Pt=="number"&&0<Pt&&(d=1.5*Pt,l.L=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const be=i.g;if(be){const nr=be.g?be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(nr){var T=d.h;T.g||nr.indexOf("spdy")==-1&&nr.indexOf("quic")==-1&&nr.indexOf("h2")==-1||(T.j=T.l,T.g=new Set,T.h&&(si(T,T.h),T.h=null))}if(d.D){const ui=be.g?be.g.getResponseHeader("X-HTTP-Session-Id"):null;ui&&(d.ya=ui,H(d.I,d.D,ui))}}l.G=3,l.l&&l.l.ua(),l.ba&&(l.R=Date.now()-i.F,l.j.info("Handshake RTT: "+l.R+"ms")),d=l;var R=i;if(d.qa=Co(d,d.J?d.ia:null,d.W),R.K){no(d.h,R);var $=R,te=d.L;te&&($.I=te),$.B&&(ni($),zn($)),d.g=R}else To(d);0<l.i.length&&Zn(l)}else U[0]!="stop"&&U[0]!="close"||ht(l,7);else l.G==3&&(U[0]=="stop"||U[0]=="close"?U[0]=="stop"?ht(l,7):ai(l):U[0]!="noop"&&l.l&&l.l.ta(U),l.v=0)}}nn(4)}catch(U){}}var hu=class{constructor(i,a){this.g=i,this.map=a}};function Zs(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function eo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function to(i){return i.h?1:i.g?i.g.size:0}function ii(i,a){return i.h?i.h==a:i.g?i.g.has(a):!1}function si(i,a){i.g?i.g.add(a):i.h=a}function no(i,a){i.h&&i.h==a?i.h=null:i.g&&i.g.has(a)&&i.g.delete(a)}Zs.prototype.cancel=function(){if(this.i=ro(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function ro(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let a=i.i;for(const l of i.g.values())a=a.concat(l.D);return a}return F(i.i)}function du(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(h(i)){for(var a=[],l=i.length,d=0;d<l;d++)a.push(i[d]);return a}a=[],l=0;for(d in i)a[l++]=i[d];return a}function fu(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(h(i)||typeof i=="string"){var a=[];i=i.length;for(var l=0;l<i;l++)a.push(l);return a}a=[],l=0;for(const d in i)a[l++]=d;return a}}}function io(i,a){if(i.forEach&&typeof i.forEach=="function")i.forEach(a,void 0);else if(h(i)||typeof i=="string")Array.prototype.forEach.call(i,a,void 0);else for(var l=fu(i),d=du(i),E=d.length,T=0;T<E;T++)a.call(void 0,d[T],l&&l[T],i)}var so=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pu(i,a){if(i){i=i.split("&");for(var l=0;l<i.length;l++){var d=i[l].indexOf("="),E=null;if(0<=d){var T=i[l].substring(0,d);E=i[l].substring(d+1)}else T=i[l];a(T,E?decodeURIComponent(E.replace(/\+/g," ")):"")}}}function ut(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof ut){this.h=i.h,Gn(this,i.j),this.o=i.o,this.g=i.g,Kn(this,i.s),this.l=i.l;var a=i.i,l=new ln;l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),oo(this,l),this.m=i.m}else i&&(a=String(i).match(so))?(this.h=!1,Gn(this,a[1]||"",!0),this.o=an(a[2]||""),this.g=an(a[3]||"",!0),Kn(this,a[4]),this.l=an(a[5]||"",!0),oo(this,a[6]||"",!0),this.m=an(a[7]||"")):(this.h=!1,this.i=new ln(null,this.h))}ut.prototype.toString=function(){var i=[],a=this.j;a&&i.push(cn(a,ao,!0),":");var l=this.g;return(l||a=="file")&&(i.push("//"),(a=this.o)&&i.push(cn(a,ao,!0),"@"),i.push(encodeURIComponent(String(l)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.s,l!=null&&i.push(":",String(l))),(l=this.l)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(cn(l,l.charAt(0)=="/"?yu:mu,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",cn(l,vu)),i.join("")};function Me(i){return new ut(i)}function Gn(i,a,l){i.j=l?an(a,!0):a,i.j&&(i.j=i.j.replace(/:$/,""))}function Kn(i,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);i.s=a}else i.s=null}function oo(i,a,l){a instanceof ln?(i.i=a,Iu(i.i,i.h)):(l||(a=cn(a,_u)),i.i=new ln(a,i.h))}function H(i,a,l){i.i.set(a,l)}function Wn(i){return H(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function an(i,a){return i?a?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function cn(i,a,l){return typeof i=="string"?(i=encodeURI(i).replace(a,gu),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function gu(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var ao=/[#\/\?@]/g,mu=/[#\?:]/g,yu=/[#\?]/g,_u=/[#\?@]/g,vu=/#/g;function ln(i,a){this.h=this.g=null,this.i=i||null,this.j=!!a}function Ge(i){i.g||(i.g=new Map,i.h=0,i.i&&pu(i.i,function(a,l){i.add(decodeURIComponent(a.replace(/\+/g," ")),l)}))}n=ln.prototype,n.add=function(i,a){Ge(this),this.i=null,i=Rt(this,i);var l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(a),this.h+=1,this};function co(i,a){Ge(i),a=Rt(i,a),i.g.has(a)&&(i.i=null,i.h-=i.g.get(a).length,i.g.delete(a))}function lo(i,a){return Ge(i),a=Rt(i,a),i.g.has(a)}n.forEach=function(i,a){Ge(this),this.g.forEach(function(l,d){l.forEach(function(E){i.call(a,E,d,this)},this)},this)},n.na=function(){Ge(this);const i=Array.from(this.g.values()),a=Array.from(this.g.keys()),l=[];for(let d=0;d<a.length;d++){const E=i[d];for(let T=0;T<E.length;T++)l.push(a[d])}return l},n.V=function(i){Ge(this);let a=[];if(typeof i=="string")lo(this,i)&&(a=a.concat(this.g.get(Rt(this,i))));else{i=Array.from(this.g.values());for(let l=0;l<i.length;l++)a=a.concat(i[l])}return a},n.set=function(i,a){return Ge(this),this.i=null,i=Rt(this,i),lo(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[a]),this.h+=1,this},n.get=function(i,a){return i?(i=this.V(i),0<i.length?String(i[0]):a):a};function uo(i,a,l){co(i,a),0<l.length&&(i.i=null,i.g.set(Rt(i,a),F(l)),i.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],a=Array.from(this.g.keys());for(var l=0;l<a.length;l++){var d=a[l];const T=encodeURIComponent(String(d)),R=this.V(d);for(d=0;d<R.length;d++){var E=T;R[d]!==""&&(E+="="+encodeURIComponent(String(R[d]))),i.push(E)}}return this.i=i.join("&")};function Rt(i,a){return a=String(a),i.j&&(a=a.toLowerCase()),a}function Iu(i,a){a&&!i.j&&(Ge(i),i.i=null,i.g.forEach(function(l,d){var E=d.toLowerCase();d!=E&&(co(this,d),uo(this,E,l))},i)),i.j=a}function Eu(i,a){const l=new sn;if(u.Image){const d=new Image;d.onload=C(Ke,l,"TestLoadImage: loaded",!0,a,d),d.onerror=C(Ke,l,"TestLoadImage: error",!1,a,d),d.onabort=C(Ke,l,"TestLoadImage: abort",!1,a,d),d.ontimeout=C(Ke,l,"TestLoadImage: timeout",!1,a,d),u.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else a(!1)}function wu(i,a){const l=new sn,d=new AbortController,E=setTimeout(()=>{d.abort(),Ke(l,"TestPingServer: timeout",!1,a)},1e4);fetch(i,{signal:d.signal}).then(T=>{clearTimeout(E),T.ok?Ke(l,"TestPingServer: ok",!0,a):Ke(l,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(E),Ke(l,"TestPingServer: error",!1,a)})}function Ke(i,a,l,d,E){try{E&&(E.onload=null,E.onerror=null,E.onabort=null,E.ontimeout=null),d(l)}catch(T){}}function Tu(){this.g=new su}function Au(i,a,l){const d=l||"";try{io(i,function(E,T){let R=E;f(E)&&(R=Qr(E)),a.push(d+T+"="+encodeURIComponent(R))})}catch(E){throw a.push(d+"type="+encodeURIComponent("_badmap")),E}}function Qn(i){this.l=i.Ub||null,this.j=i.eb||!1}k(Qn,Jr),Qn.prototype.g=function(){return new Jn(this.l,this.j)},Qn.prototype.i=(function(i){return function(){return i}})({});function Jn(i,a){ae.call(this),this.D=i,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Jn,ae),n=Jn.prototype,n.open=function(i,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=a,this.readyState=1,hn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(a.body=i),(this.D||u).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,un(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,hn(this)),this.g&&(this.readyState=3,hn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ho(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function ho(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var a=i.value?i.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!i.done}))&&(this.response=this.responseText+=a)}i.done?un(this):hn(this),this.readyState==3&&ho(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,un(this))},n.Qa=function(i){this.g&&(this.response=i,un(this))},n.ga=function(){this.g&&un(this)};function un(i){i.readyState=4,i.l=null,i.j=null,i.v=null,hn(i)}n.setRequestHeader=function(i,a){this.u.append(i,a)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],a=this.h.entries();for(var l=a.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=a.next();return i.join("\r\n")};function hn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Jn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function fo(i){let a="";return Y(i,function(l,d){a+=d,a+=":",a+=l,a+="\r\n"}),a}function oi(i,a,l){e:{for(d in l){var d=!1;break e}d=!0}d||(l=fo(l),typeof i=="string"?l!=null&&encodeURIComponent(String(l)):H(i,a,l))}function z(i){ae.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(z,ae);var bu=/^https?$/i,Su=["POST","PUT"];n=z.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,a,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);a=a?a.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zr.g(),this.v=this.o?js(this.o):js(Zr),this.g.onreadystatechange=S(this.Ea,this);try{this.B=!0,this.g.open(a,String(i),!0),this.B=!1}catch(T){po(this,T);return}if(i=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var E in d)l.set(E,d[E]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const T of d.keys())l.set(T,d.get(T));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(T=>T.toLowerCase()=="content-type"),E=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Su,a,void 0))||d||E||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[T,R]of l)this.g.setRequestHeader(T,R);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{yo(this),this.u=!0,this.g.send(i),this.u=!1}catch(T){po(this,T)}};function po(i,a){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=a,i.m=5,go(i),Xn(i)}function go(i){i.A||(i.A=!0,pe(i,"complete"),pe(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,pe(this,"complete"),pe(this,"abort"),Xn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xn(this,!0)),z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?mo(this):this.bb())},n.bb=function(){mo(this)};function mo(i){if(i.h&&typeof c<"u"&&(!i.v[1]||Ve(i)!=4||i.Z()!=2)){if(i.u&&Ve(i)==4)xs(i.Ea,0,i);else if(pe(i,"readystatechange"),Ve(i)==4){i.h=!1;try{const R=i.Z();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break e;default:a=!1}var l;if(!(l=a)){var d;if(d=R===0){var E=String(i.D).match(so)[1]||null;!E&&u.self&&u.self.location&&(E=u.self.location.protocol.slice(0,-1)),d=!bu.test(E?E.toLowerCase():"")}l=d}if(l)pe(i,"complete"),pe(i,"success");else{i.m=6;try{var T=2<Ve(i)?i.g.statusText:""}catch($){T=""}i.l=T+" ["+i.Z()+"]",go(i)}}finally{Xn(i)}}}}function Xn(i,a){if(i.g){yo(i);const l=i.g,d=i.v[0]?()=>{}:null;i.g=null,i.v=null,a||pe(i,"ready");try{l.onreadystatechange=d}catch(E){}}}function yo(i){i.I&&(u.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Ve(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Ve(this)?this.g.status:-1}catch(i){return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch(i){return""}},n.Oa=function(i){if(this.g){var a=this.g.responseText;return i&&a.indexOf(i)==0&&(a=a.substring(i.length)),iu(a)}};function _o(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch(a){return null}}function Ru(i){const a={};i=(i.g&&2<=Ve(i)&&i.g.getAllResponseHeaders()||"").split("\r\n");for(let d=0;d<i.length;d++){if(W(i[d]))continue;var l=_(i[d]);const E=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const T=a[E]||[];a[E]=T,T.push(l)}v(a,function(d){return d.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function dn(i,a,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||a}function vo(i){this.Aa=0,this.i=[],this.j=new sn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=dn("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=dn("baseRetryDelayMs",5e3,i),this.cb=dn("retryDelaySeedMs",1e4,i),this.Wa=dn("forwardChannelMaxRetries",2,i),this.wa=dn("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new Zs(i&&i.concurrentRequestLimit),this.Da=new Tu,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=vo.prototype,n.la=8,n.G=1,n.connect=function(i,a,l,d){ge(0),this.W=i,this.H=a||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.I=Co(this,null,this.W),Zn(this)};function ai(i){if(Io(i),i.G==3){var a=i.U++,l=Me(i.I);if(H(l,"SID",i.K),H(l,"RID",a),H(l,"TYPE","terminate"),fn(i,l),a=new ze(i,i.j,a),a.L=2,a.v=Wn(Me(l)),l=!1,u.navigator&&u.navigator.sendBeacon)try{l=u.navigator.sendBeacon(a.v.toString(),"")}catch(d){}!l&&u.Image&&(new Image().src=a.v,l=!0),l||(a.g=Po(a.j,null),a.g.ea(a.v)),a.F=Date.now(),zn(a)}Ro(i)}function Yn(i){i.g&&(li(i),i.g.cancel(),i.g=null)}function Io(i){Yn(i),i.u&&(u.clearTimeout(i.u),i.u=null),er(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Zn(i){if(!eo(i.h)&&!i.s){i.s=!0;var a=i.Ga;Xt||Ds(),Yt||(Xt(),Yt=!0),jr.add(a,i),i.B=0}}function Cu(i,a){return to(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=a.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=rn(S(i.Ga,i,a),So(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const E=new ze(this,this.j,i);let T=this.o;if(this.S&&(T?(T=p(T),y(T,this.S)):T=this.S),this.m!==null||this.O||(E.H=T,T=null),this.P)e:{for(var a=0,l=0;l<this.i.length;l++){t:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(a+=d,4096<a){a=l;break e}if(a===4096||l===this.i.length-1){a=l+1;break e}}a=1e3}else a=1e3;a=wo(this,E,a),l=Me(this.I),H(l,"RID",i),H(l,"CVER",22),this.D&&H(l,"X-HTTP-Session-Id",this.D),fn(this,l),T&&(this.O?a="headers="+encodeURIComponent(String(fo(T)))+"&"+a:this.m&&oi(l,this.m,T)),si(this.h,E),this.Ua&&H(l,"TYPE","init"),this.P?(H(l,"$req",a),H(l,"SID","null"),E.T=!0,ti(E,l,null)):ti(E,l,a),this.G=2}}else this.G==3&&(i?Eo(this,i):this.i.length==0||eo(this.h)||Eo(this))};function Eo(i,a){var l;a?l=a.l:l=i.U++;const d=Me(i.I);H(d,"SID",i.K),H(d,"RID",l),H(d,"AID",i.T),fn(i,d),i.m&&i.o&&oi(d,i.m,i.o),l=new ze(i,i.j,l,i.B+1),i.m===null&&(l.H=i.o),a&&(i.i=a.D.concat(i.i)),a=wo(i,l,1e3),l.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),si(i.h,l),ti(l,d,a)}function fn(i,a){i.H&&Y(i.H,function(l,d){H(a,d,l)}),i.l&&io({},function(l,d){H(a,d,l)})}function wo(i,a,l){l=Math.min(i.i.length,l);var d=i.l?S(i.l.Na,i.l,i):null;e:{var E=i.i;let T=-1;for(;;){const R=["count="+l];T==-1?0<l?(T=E[0].g,R.push("ofs="+T)):T=0:R.push("ofs="+T);let $=!0;for(let te=0;te<l;te++){let U=E[te].g;const ce=E[te].map;if(U-=T,0>U)T=Math.max(0,E[te].g-100),$=!1;else try{Au(ce,R,"req"+U+"_")}catch(le){d&&d(ce)}}if($){d=R.join("&");break e}}}return i=i.i.splice(0,l),a.D=i,d}function To(i){if(!i.g&&!i.u){i.Y=1;var a=i.Fa;Xt||Ds(),Yt||(Xt(),Yt=!0),jr.add(a,i),i.v=0}}function ci(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=rn(S(i.Fa,i),So(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,Ao(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=rn(S(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ge(10),Yn(this),Ao(this))};function li(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function Ao(i){i.g=new ze(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var a=Me(i.qa);H(a,"RID","rpc"),H(a,"SID",i.K),H(a,"AID",i.T),H(a,"CI",i.F?"0":"1"),!i.F&&i.ja&&H(a,"TO",i.ja),H(a,"TYPE","xmlhttp"),fn(i,a),i.m&&i.o&&oi(a,i.m,i.o),i.L&&(i.g.I=i.L);var l=i.g;i=i.ia,l.L=1,l.v=Wn(Me(a)),l.m=null,l.P=!0,Js(l,i)}n.Za=function(){this.C!=null&&(this.C=null,Yn(this),ci(this),ge(19))};function er(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function bo(i,a){var l=null;if(i.g==a){er(i),li(i),i.g=null;var d=2}else if(ii(i.h,a))l=a.D,no(i.h,a),d=1;else return;if(i.G!=0){if(a.o)if(d==1){l=a.m?a.m.length:0,a=Date.now()-a.F;var E=i.B;d=$n(),pe(d,new Gs(d,l)),Zn(i)}else To(i);else if(E=a.s,E==3||E==0&&0<a.X||!(d==1&&Cu(i,a)||d==2&&ci(i)))switch(l&&0<l.length&&(a=i.h,a.i=a.i.concat(l)),E){case 1:ht(i,5);break;case 4:ht(i,10);break;case 3:ht(i,6);break;default:ht(i,2)}}}function So(i,a){let l=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(l*=2),l*a}function ht(i,a){if(i.j.info("Error code "+a),a==2){var l=S(i.fb,i),d=i.Xa;const E=!d;d=new ut(d||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Gn(d,"https"),Wn(d),E?Eu(d.toString(),l):wu(d.toString(),l)}else ge(2);i.G=0,i.l&&i.l.sa(a),Ro(i),Io(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),ge(2)):(this.j.info("Failed to ping google.com"),ge(1))};function Ro(i){if(i.G=0,i.ka=[],i.l){const a=ro(i.h);(a.length!=0||i.i.length!=0)&&(N(i.ka,a),N(i.ka,i.i),i.h.i.length=0,F(i.i),i.i.length=0),i.l.ra()}}function Co(i,a,l){var d=l instanceof ut?Me(l):new ut(l);if(d.g!="")a&&(d.g=a+"."+d.g),Kn(d,d.s);else{var E=u.location;d=E.protocol,a=a?a+"."+E.hostname:E.hostname,E=+E.port;var T=new ut(null);d&&Gn(T,d),a&&(T.g=a),E&&Kn(T,E),l&&(T.l=l),d=T}return l=i.D,a=i.ya,l&&a&&H(d,l,a),H(d,"VER",i.la),fn(i,d),d}function Po(i,a,l){if(a&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=i.Ca&&!i.pa?new z(new Qn({eb:l})):new z(i.pa),a.Ha(i.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ko(){}n=ko.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function tr(){}tr.prototype.g=function(i,a){return new ve(i,a)};function ve(i,a){ae.call(this),this.g=new vo(a),this.l=i,this.h=a&&a.messageUrlParams||null,i=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(i?i["X-WebChannel-Content-Type"]=a.messageContentType:i={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(i?i["X-WebChannel-Client-Profile"]=a.va:i={"X-WebChannel-Client-Profile":a.va}),this.g.S=i,(i=a&&a.Sb)&&!W(i)&&(this.g.m=i),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!W(a)&&(this.g.D=a,i=this.h,i!==null&&a in i&&(i=this.h,a in i&&delete i[a])),this.j=new Ct(this)}k(ve,ae),ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ve.prototype.close=function(){ai(this.g)},ve.prototype.o=function(i){var a=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.u&&(l={},l.__data__=Qr(i),i=l);a.i.push(new hu(a.Ya++,i)),a.G==3&&Zn(a)},ve.prototype.N=function(){this.g.l=null,delete this.j,ai(this.g),delete this.g,ve.aa.N.call(this)};function Oo(i){Xr.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var a=i.__sm__;if(a){e:{for(const l in a){i=l;break e}i=void 0}(this.i=i)&&(i=this.i,a=a!==null&&i in a?a[i]:void 0),this.data=a}else this.data=i}k(Oo,Xr);function Do(){Yr.call(this),this.status=1}k(Do,Yr);function Ct(i){this.g=i}k(Ct,ko),Ct.prototype.ua=function(){pe(this.g,"a")},Ct.prototype.ta=function(i){pe(this.g,new Oo(i))},Ct.prototype.sa=function(i){pe(this.g,new Do)},Ct.prototype.ra=function(){pe(this.g,"b")},tr.prototype.createWebChannel=tr.prototype.g,ve.prototype.send=ve.prototype.o,ve.prototype.open=ve.prototype.m,ve.prototype.close=ve.prototype.close,uc=function(){return new tr},lc=function(){return $n()},cc=ct,Ni={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Hn.NO_ERROR=0,Hn.TIMEOUT=8,Hn.HTTP_ERROR=6,lr=Hn,Ks.COMPLETE="complete",ac=Ks,$s.EventType=tn,tn.OPEN="a",tn.CLOSE="b",tn.ERROR="c",tn.MESSAGE="d",ae.prototype.listen=ae.prototype.K,mn=$s,z.prototype.listenOnce=z.prototype.L,z.prototype.getLastError=z.prototype.Ka,z.prototype.getLastErrorCode=z.prototype.Ba,z.prototype.getStatus=z.prototype.Z,z.prototype.getResponseJson=z.prototype.Oa,z.prototype.getResponseText=z.prototype.oa,z.prototype.send=z.prototype.ea,z.prototype.setWithCredentials=z.prototype.Ha,oc=z}).apply(typeof rr<"u"?rr:typeof self<"u"?self:typeof window<"u"?window:{});const zo="@firebase/firestore";/**
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
 */let Kt="10.14.0";/**
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
 */const vt=new Nr("@firebase/firestore");function pn(){return vt.logLevel}function O(n,...e){if(vt.logLevel<=M.DEBUG){const t=e.map(Ji);vt.debug("Firestore (".concat(Kt,"): ").concat(n),...t)}}function Dn(n,...e){if(vt.logLevel<=M.ERROR){const t=e.map(Ji);vt.error("Firestore (".concat(Kt,"): ").concat(n),...t)}}function yr(n,...e){if(vt.logLevel<=M.WARN){const t=e.map(Ji);vt.warn("Firestore (".concat(Kt,"): ").concat(n),...t)}}function Ji(n){if(typeof n=="string")return n;try{/**
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
 */function j(n="Unexpected state"){const e="FIRESTORE (".concat(Kt,") INTERNAL ASSERTION FAILED: ")+n;throw Dn(e),new Error(e)}function ye(n,e){n||j()}function se(n,e){return n}/**
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
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class L extends Ce{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}}/**
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
 */class hc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(e))}}class dd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(he.UNAUTHENTICATED)))}shutdown(){}}class fd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class pd{constructor(e){this.t=e,this.currentUser=he.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ye(this.o===void 0);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new Nt;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Nt,e.enqueueRetryable((()=>s(this.currentUser)))};const c=()=>{const h=o;e.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},u=h=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),c())};this.t.onInit((h=>u(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Nt)}}),0),c()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(ye(typeof r.accessToken=="string"),new hc(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ye(e===null||typeof e=="string"),new he(e)}}class gd{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=he.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class md{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new gd(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(he.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class yd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class _d{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){ye(this.o===void 0);const r=o=>{o.error!=null&&O("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: ".concat(o.error.message));const c=o.token!==this.R;return this.R=o.token,O("FirebaseAppCheckTokenProvider","Received ".concat(c?"new":"existing"," token.")),c?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>r(o)))};const s=o=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(ye(typeof t.token=="string"),this.R=t.token,new yd(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function vd(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class Id{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=vd(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%e.length))}return r}}function q(n,e){return n<e?-1:n>e?1:0}function Ft(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
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
 */class Ee{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new L(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new L(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ee.fromMillis(Date.now())}static fromDate(e){return Ee.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Ee(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?q(this.nanoseconds,e.nanoseconds):q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Sn{constructor(e,t,r){t===void 0?t=0:t>e.length&&j(),r===void 0?r=e.length-t:r>e.length-t&&j(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Sn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Sn?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=e.get(s),c=t.get(s);if(o<c)return-1;if(o>c)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ie extends Sn{construct(e,t,r){return new ie(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new L(P.INVALID_ARGUMENT,"Invalid segment (".concat(r,"). Paths must not contain // in them."));t.push(...r.split("/").filter((s=>s.length>0)))}return new ie(t)}static emptyPath(){return new ie([])}}const Ed=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class me extends Sn{construct(e,t,r){return new me(e,t,r)}static isValidIdentifier(e){return Ed.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),me.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new me(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new L(P.INVALID_ARGUMENT,"Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));t.push(r),r=""};let c=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new L(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new L(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(c=!c,s++):u!=="."||c?(r+=u,s++):(o(),s++)}if(o(),c)throw new L(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new me(t)}static emptyPath(){return new me([])}}/**
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
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(ie.fromString(e))}static fromName(e){return new x(ie.fromString(e).popFirst(5))}static empty(){return new x(ie.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ie.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ie.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new ie(e.slice()))}}function wd(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=G.fromTimestamp(r===1e9?new Ee(t+1,0):new Ee(t,r));return new it(s,x.empty(),e)}function Td(n){return new it(n.readTime,n.key,-1)}class it{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new it(G.min(),x.empty(),-1)}static max(){return new it(G.max(),x.empty(),-1)}}function Ad(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:q(n.largestBatchId,e.largestBatchId))}class bd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&j(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):b.reject(t)}static resolve(e){return new b(((t,r)=>{t(e)}))}static reject(e){return new b(((t,r)=>{r(e)}))}static waitFor(e){return new b(((t,r)=>{let s=0,o=0,c=!1;e.forEach((u=>{++s,u.next((()=>{++o,c&&o===s&&t()}),(h=>r(h)))})),c=!0,o===s&&t()}))}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next((s=>s?b.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,o)=>{r.push(t.call(this,s,o))})),this.waitFor(r)}static mapArray(e,t){return new b(((r,s)=>{const o=e.length,c=new Array(o);let u=0;for(let h=0;h<o;h++){const f=h;t(e[f]).next((I=>{c[f]=I,++u,u===o&&r(c)}),(I=>s(I)))}}))}static doWhile(e,t){return new b(((r,s)=>{const o=()=>{e()===!0?t().next((()=>{o()}),s):r()};o()}))}}function Sd(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Xi(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class dc{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}dc.oe=-1;function Yi(n){return n==null}function Li(n){return n===0&&1/n==-1/0}/**
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
 */function Go(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Zi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Rd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||ne.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ne.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ne.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push("".concat(t,":").concat(r)),!1))),"{".concat(e.join(", "),"}")}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ir(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ir(this.root,e,this.comparator,!1)}getReverseIterator(){return new ir(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ir(this.root,e,this.comparator,!0)}}class ir{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ne{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r!=null?r:ne.RED,this.left=s!=null?s:ne.EMPTY,this.right=o!=null?o:ne.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new ne(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,s!=null?s:this.left,o!=null?o:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ne.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return ne.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ne.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ne.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw j();const e=this.left.check();if(e!==this.right.check())throw j();return e+(this.isRed()?0:1)}}ne.EMPTY=null,ne.RED=!0,ne.BLACK=!1;ne.EMPTY=new class{constructor(){this.size=0}get key(){throw j()}get value(){throw j()}get color(){throw j()}get left(){throw j()}get right(){throw j()}copy(e,t,r,s,o){return this}insert(e,t,r){return new ne(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class de{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ko(this.data.getIterator())}getIteratorFrom(e){return new Ko(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof de)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new de(this.comparator);return t.data=e,t}}class Ko{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class et{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new et([])}unionWith(e){let t=new de(me.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new et(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ft(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class Cd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class st{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Cd("Invalid base64 string: "+o):o}})(e);return new st(t)}static fromUint8Array(e){const t=(function(s){let o="";for(let c=0;c<s.length;++c)o+=String.fromCharCode(s[c]);return o})(e);return new st(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}st.EMPTY_BYTE_STRING=new st("");const Pd=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function It(n){if(ye(!!n),typeof n=="string"){let e=0;const t=Pd.exec(n);if(ye(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:re(n.seconds),nanos:re(n.nanos)}}function re(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Rn(n){return typeof n=="string"?st.fromBase64String(n):st.fromUint8Array(n)}/**
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
 */function es(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function fc(n){const e=n.mapValue.fields.__previous_value__;return es(e)?fc(e):e}function _r(n){const e=It(n.mapValue.fields.__local_write_time__.timestampValue);return new Ee(e.seconds,e.nanos)}/**
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
 */class kd{constructor(e,t,r,s,o,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=c,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=f}}class vr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new vr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof vr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const sr={mapValue:{}};function Ut(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?es(n)?4:Dd(n)?9007199254740991:Od(n)?10:11:j()}function Ne(n,e){if(n===e)return!0;const t=Ut(n);if(t!==Ut(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return _r(n).isEqual(_r(e));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const c=It(s.timestampValue),u=It(o.timestampValue);return c.seconds===u.seconds&&c.nanos===u.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,o){return Rn(s.bytesValue).isEqual(Rn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,o){return re(s.geoPointValue.latitude)===re(o.geoPointValue.latitude)&&re(s.geoPointValue.longitude)===re(o.geoPointValue.longitude)})(n,e);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return re(s.integerValue)===re(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const c=re(s.doubleValue),u=re(o.doubleValue);return c===u?Li(c)===Li(u):isNaN(c)&&isNaN(u)}return!1})(n,e);case 9:return Ft(n.arrayValue.values||[],e.arrayValue.values||[],Ne);case 10:case 11:return(function(s,o){const c=s.mapValue.fields||{},u=o.mapValue.fields||{};if(Go(c)!==Go(u))return!1;for(const h in c)if(c.hasOwnProperty(h)&&(u[h]===void 0||!Ne(c[h],u[h])))return!1;return!0})(n,e);default:return j()}}function Cn(n,e){return(n.values||[]).find((t=>Ne(t,e)))!==void 0}function Bt(n,e){if(n===e)return 0;const t=Ut(n),r=Ut(e);if(t!==r)return q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return q(n.booleanValue,e.booleanValue);case 2:return(function(o,c){const u=re(o.integerValue||o.doubleValue),h=re(c.integerValue||c.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1})(n,e);case 3:return Wo(n.timestampValue,e.timestampValue);case 4:return Wo(_r(n),_r(e));case 5:return q(n.stringValue,e.stringValue);case 6:return(function(o,c){const u=Rn(o),h=Rn(c);return u.compareTo(h)})(n.bytesValue,e.bytesValue);case 7:return(function(o,c){const u=o.split("/"),h=c.split("/");for(let f=0;f<u.length&&f<h.length;f++){const I=q(u[f],h[f]);if(I!==0)return I}return q(u.length,h.length)})(n.referenceValue,e.referenceValue);case 8:return(function(o,c){const u=q(re(o.latitude),re(c.latitude));return u!==0?u:q(re(o.longitude),re(c.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Qo(n.arrayValue,e.arrayValue);case 10:return(function(o,c){var u,h,f,I;const A=o.fields||{},S=c.fields||{},C=(u=A.value)===null||u===void 0?void 0:u.arrayValue,k=(h=S.value)===null||h===void 0?void 0:h.arrayValue,F=q(((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0,((I=k==null?void 0:k.values)===null||I===void 0?void 0:I.length)||0);return F!==0?F:Qo(C,k)})(n.mapValue,e.mapValue);case 11:return(function(o,c){if(o===sr.mapValue&&c===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(c===sr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),f=c.fields||{},I=Object.keys(f);h.sort(),I.sort();for(let A=0;A<h.length&&A<I.length;++A){const S=q(h[A],I[A]);if(S!==0)return S;const C=Bt(u[h[A]],f[I[A]]);if(C!==0)return C}return q(h.length,I.length)})(n.mapValue,e.mapValue);default:throw j()}}function Wo(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return q(n,e);const t=It(n),r=It(e),s=q(t.seconds,r.seconds);return s!==0?s:q(t.nanos,r.nanos)}function Qo(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=Bt(t[s],r[s]);if(o)return o}return q(t.length,r.length)}function jt(n){return Mi(n)}function Mi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=It(t);return"time(".concat(r.seconds,",").concat(r.nanos,")")})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Rn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return x.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return"geo(".concat(t.latitude,",").concat(t.longitude,")")})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=Mi(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const c of r)o?o=!1:s+=",",s+="".concat(c,":").concat(Mi(t.fields[c]));return s+"}"})(n.mapValue):j()}function Vi(n){return!!n&&"integerValue"in n}function ts(n){return!!n&&"arrayValue"in n}function mi(n){return!!n&&"mapValue"in n}function Od(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function yn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Zi(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=yn(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=yn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Dd(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class xe{constructor(e){this.value=e}static empty(){return new xe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!mi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=yn(t)}setAll(e){let t=me.emptyPath(),r={},s=[];e.forEach(((c,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}c?r[u.lastSegment()]=yn(c):s.push(u.lastSegment())}));const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());mi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ne(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];mi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Zi(t,((s,o)=>e[s]=o));for(const s of r)delete e[s]}clone(){return new xe(yn(this.value))}}/**
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
 */class Se{constructor(e,t,r,s,o,c,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=c,this.documentState=u}static newInvalidDocument(e){return new Se(e,0,G.min(),G.min(),G.min(),xe.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,G.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,G.min(),G.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,G.min(),G.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(G.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=G.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}}/**
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
 */class Ir{constructor(e,t){this.position=e,this.inclusive=t}}function Jo(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],c=n.position[s];if(o.field.isKeyField()?r=x.comparator(x.fromName(c.referenceValue),t.key):r=Bt(c,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Xo(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ne(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Er{constructor(e,t="asc"){this.field=e,this.dir=t}}function Nd(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class pc{}class ee extends pc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Md(e,t,r):t==="array-contains"?new Fd(e,r):t==="in"?new Ud(e,r):t==="not-in"?new Bd(e,r):t==="array-contains-any"?new jd(e,r):new ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Vd(e,r):new xd(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Bt(t,this.value)):t!==null&&Ut(this.value)===Ut(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return j()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ot extends pc{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ot(e,t)}matches(e){return gc(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function gc(n){return n.op==="and"}function mc(n){return Ld(n)&&gc(n)}function Ld(n){for(const e of n.filters)if(e instanceof ot)return!1;return!0}function xi(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+jt(n.value);if(mc(n))return n.filters.map((e=>xi(e))).join(",");{const e=n.filters.map((t=>xi(t))).join(",");return"".concat(n.op,"(").concat(e,")")}}function yc(n,e){return n instanceof ee?(function(r,s){return s instanceof ee&&r.op===s.op&&r.field.isEqual(s.field)&&Ne(r.value,s.value)})(n,e):n instanceof ot?(function(r,s){return s instanceof ot&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,c,u)=>o&&yc(c,s.filters[u])),!0):!1})(n,e):void j()}function _c(n){return n instanceof ee?(function(t){return"".concat(t.field.canonicalString()," ").concat(t.op," ").concat(jt(t.value))})(n):n instanceof ot?(function(t){return t.op.toString()+" {"+t.getFilters().map(_c).join(" ,")+"}"})(n):"Filter"}class Md extends ee{constructor(e,t,r){super(e,t,r),this.key=x.fromName(r.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class Vd extends ee{constructor(e,t){super(e,"in",t),this.keys=vc("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class xd extends ee{constructor(e,t){super(e,"not-in",t),this.keys=vc("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function vc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>x.fromName(r.referenceValue)))}class Fd extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ts(t)&&Cn(t.arrayValue,this.value)}}class Ud extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Cn(this.value.arrayValue,t)}}class Bd extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(Cn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Cn(this.value.arrayValue,t)}}class jd extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ts(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Cn(this.value.arrayValue,r)))}}/**
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
 */class $d{constructor(e,t=null,r=[],s=[],o=null,c=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=c,this.endAt=u,this.ue=null}}function Yo(n,e=null,t=[],r=[],s=null,o=null,c=null){return new $d(n,e,t,r,s,o,c)}function ns(n){const e=se(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>xi(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Yi(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>jt(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>jt(r))).join(",")),e.ue=t}return e.ue}function rs(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Nd(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!yc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Xo(n.startAt,e.startAt)&&Xo(n.endAt,e.endAt)}/**
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
 */class is{constructor(e,t=null,r=[],s=[],o=null,c="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=c,this.startAt=u,this.endAt=h,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Hd(n,e,t,r,s,o,c,u){return new is(n,e,t,r,s,o,c,u)}function Zo(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function qd(n){return n.collectionGroup!==null}function _n(n){const e=se(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(c){let u=new de(me.comparator);return c.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(u=u.add(f.field))}))})),u})(e).forEach((o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new Er(o,r))})),t.has(me.keyField().canonicalString())||e.ce.push(new Er(me.keyField(),r))}return e.ce}function mt(n){const e=se(n);return e.le||(e.le=zd(e,_n(n))),e.le}function zd(n,e){if(n.limitType==="F")return Yo(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Er(s.field,o)}));const t=n.endAt?new Ir(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ir(n.startAt.position,n.startAt.inclusive):null;return Yo(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Fi(n,e,t){return new is(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ic(n,e){return rs(mt(n),mt(e))&&n.limitType===e.limitType}function Ec(n){return"".concat(ns(mt(n)),"|lt:").concat(n.limitType)}function gn(n){return"Query(target=".concat((function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=", filters: [".concat(t.filters.map((s=>_c(s))).join(", "),"]")),Yi(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=", orderBy: [".concat(t.orderBy.map((s=>(function(c){return"".concat(c.field.canonicalString()," (").concat(c.dir,")")})(s))).join(", "),"]")),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>jt(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>jt(s))).join(",")),"Target(".concat(r,")")})(mt(n)),"; limitType=").concat(n.limitType,")")}function ss(n,e){return e.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):x.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,e)&&(function(r,s){for(const o of _n(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(c,u,h){const f=Jo(c,u,h);return c.inclusive?f<=0:f<0})(r.startAt,_n(r),s)||r.endAt&&!(function(c,u,h){const f=Jo(c,u,h);return c.inclusive?f>=0:f>0})(r.endAt,_n(r),s))})(n,e)}function Gd(n){return(e,t)=>{let r=!1;for(const s of _n(n)){const o=Kd(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Kd(n,e,t){const r=n.field.isKeyField()?x.comparator(e.key,t.key):(function(o,c,u){const h=c.data.field(o),f=u.data.field(o);return h!==null&&f!==null?Bt(h,f):j()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return j()}}/**
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
 */class Wt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Zi(this.inner,((t,r)=>{for(const[s,o]of r)e(s,o)}))}isEmpty(){return Rd(this.inner)}size(){return this.innerSize}}/**
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
 */const Wd=new Ae(x.comparator);function Ui(){return Wd}const wc=new Ae(x.comparator);function or(...n){let e=wc;for(const t of n)e=e.insert(t.key,t);return e}function Qd(n){let e=wc;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function ft(){return vn()}function Tc(){return vn()}function vn(){return new Wt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const Jd=new de(x.comparator);function Ie(...n){let e=Jd;for(const t of n)e=e.add(t);return e}const Xd=new de(q);function Yd(){return Xd}/**
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
 */function Zd(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Li(e)?"-0":e}}function ef(n){return{integerValue:""+n}}/**
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
 */class Lr{constructor(){this._=void 0}}function tf(n,e,t){return n instanceof Bi?(function(s,o){const c={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&es(o)&&(o=fc(o)),o&&(c.fields.__previous_value__=o),{mapValue:c}})(t,e):n instanceof wr?Ac(n,e):n instanceof Tr?bc(n,e):(function(s,o){const c=rf(s,o),u=ea(c)+ea(s.Pe);return Vi(c)&&Vi(s.Pe)?ef(u):Zd(s.serializer,u)})(n,e)}function nf(n,e,t){return n instanceof wr?Ac(n,e):n instanceof Tr?bc(n,e):t}function rf(n,e){return n instanceof ji?(function(r){return Vi(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(e)?e:{integerValue:0}:null}class Bi extends Lr{}class wr extends Lr{constructor(e){super(),this.elements=e}}function Ac(n,e){const t=Sc(e);for(const r of n.elements)t.some((s=>Ne(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Tr extends Lr{constructor(e){super(),this.elements=e}}function bc(n,e){let t=Sc(e);for(const r of n.elements)t=t.filter((s=>!Ne(s,r)));return{arrayValue:{values:t}}}class ji extends Lr{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function ea(n){return re(n.integerValue||n.doubleValue)}function Sc(n){return ts(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function sf(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof wr&&s instanceof wr||r instanceof Tr&&s instanceof Tr?Ft(r.elements,s.elements,Ne):r instanceof ji&&s instanceof ji?Ne(r.Pe,s.Pe):r instanceof Bi&&s instanceof Bi})(n.transform,e.transform)}class yt{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new yt}static exists(e){return new yt(void 0,e)}static updateTime(e){return new yt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ur(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class os{}function Rc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new af(n.key,yt.none()):new as(n.key,n.data,yt.none());{const t=n.data,r=xe.empty();let s=new de(me.comparator);for(let o of e.fields)if(!s.has(o)){let c=t.field(o);c===null&&o.length>1&&(o=o.popLast(),c=t.field(o)),c===null?r.delete(o):r.set(o,c),s=s.add(o)}return new Mr(n.key,r,new et(s.toArray()),yt.none())}}function of(n,e,t){n instanceof as?(function(s,o,c){const u=s.value.clone(),h=na(s.fieldTransforms,o,c.transformResults);u.setAll(h),o.convertToFoundDocument(c.version,u).setHasCommittedMutations()})(n,e,t):n instanceof Mr?(function(s,o,c){if(!ur(s.precondition,o))return void o.convertToUnknownDocument(c.version);const u=na(s.fieldTransforms,o,c.transformResults),h=o.data;h.setAll(Cc(s)),h.setAll(u),o.convertToFoundDocument(c.version,h).setHasCommittedMutations()})(n,e,t):(function(s,o,c){o.convertToNoDocument(c.version).setHasCommittedMutations()})(0,e,t)}function In(n,e,t,r){return n instanceof as?(function(o,c,u,h){if(!ur(o.precondition,c))return u;const f=o.value.clone(),I=ra(o.fieldTransforms,h,c);return f.setAll(I),c.convertToFoundDocument(c.version,f).setHasLocalMutations(),null})(n,e,t,r):n instanceof Mr?(function(o,c,u,h){if(!ur(o.precondition,c))return u;const f=ra(o.fieldTransforms,h,c),I=c.data;return I.setAll(Cc(o)),I.setAll(f),c.convertToFoundDocument(c.version,I).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((A=>A.field)))})(n,e,t,r):(function(o,c,u){return ur(o.precondition,c)?(c.convertToNoDocument(c.version).setHasLocalMutations(),null):u})(n,e,t)}function ta(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ft(r,s,((o,c)=>sf(o,c)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class as extends os{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Mr extends os{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Cc(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function na(n,e,t){const r=new Map;ye(n.length===t.length);for(let s=0;s<t.length;s++){const o=n[s],c=o.transform,u=e.data.field(o.field);r.set(o.field,nf(c,u,t[s]))}return r}function ra(n,e,t){const r=new Map;for(const s of n){const o=s.transform,c=t.data.field(s.field);r.set(s.field,tf(o,c,e))}return r}class af extends os{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class cf{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&of(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=In(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=In(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Tc();return this.mutations.forEach((s=>{const o=e.get(s.key),c=o.overlayedDocument;let u=this.applyToLocalView(c,o.mutatedFields);u=t.has(s.key)?null:u;const h=Rc(c,u);h!==null&&r.set(s.key,h),c.isValidDocument()||c.convertToNoDocument(G.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&Ft(this.mutations,e.mutations,((t,r)=>ta(t,r)))&&Ft(this.baseMutations,e.baseMutations,((t,r)=>ta(t,r)))}}/**
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
 */class lf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return"Overlay{\n      largestBatchId: ".concat(this.largestBatchId,",\n      mutation: ").concat(this.mutation.toString(),"\n    }")}}/**
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
 */var Q,V;function uf(n){if(n===void 0)return Dn("GRPC error has no .code"),P.UNKNOWN;switch(n){case Q.OK:return P.OK;case Q.CANCELLED:return P.CANCELLED;case Q.UNKNOWN:return P.UNKNOWN;case Q.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case Q.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case Q.INTERNAL:return P.INTERNAL;case Q.UNAVAILABLE:return P.UNAVAILABLE;case Q.UNAUTHENTICATED:return P.UNAUTHENTICATED;case Q.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case Q.NOT_FOUND:return P.NOT_FOUND;case Q.ALREADY_EXISTS:return P.ALREADY_EXISTS;case Q.PERMISSION_DENIED:return P.PERMISSION_DENIED;case Q.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case Q.ABORTED:return P.ABORTED;case Q.OUT_OF_RANGE:return P.OUT_OF_RANGE;case Q.UNIMPLEMENTED:return P.UNIMPLEMENTED;case Q.DATA_LOSS:return P.DATA_LOSS;default:return j()}}(V=Q||(Q={}))[V.OK=0]="OK",V[V.CANCELLED=1]="CANCELLED",V[V.UNKNOWN=2]="UNKNOWN",V[V.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",V[V.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",V[V.NOT_FOUND=5]="NOT_FOUND",V[V.ALREADY_EXISTS=6]="ALREADY_EXISTS",V[V.PERMISSION_DENIED=7]="PERMISSION_DENIED",V[V.UNAUTHENTICATED=16]="UNAUTHENTICATED",V[V.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",V[V.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",V[V.ABORTED=10]="ABORTED",V[V.OUT_OF_RANGE=11]="OUT_OF_RANGE",V[V.UNIMPLEMENTED=12]="UNIMPLEMENTED",V[V.INTERNAL=13]="INTERNAL",V[V.UNAVAILABLE=14]="UNAVAILABLE",V[V.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new sc([4294967295,4294967295],0);class hf{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ia(n){return ye(!!n),G.fromTimestamp((function(t){const r=It(t);return new Ee(r.seconds,r.nanos)})(n))}function sa(n,e){const t=(function(s){return new ie(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function df(n){const e=ie.fromString(n);return ye(mf(e)),e}function ff(n){const e=df(n);return e.length===4?ie.emptyPath():pf(e)}function pf(n){return ye(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function gf(n){let e=ff(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){ye(r===1);const I=t.from[0];I.allDescendants?s=I.collectionId:e=e.child(I.collectionId)}let o=[];t.where&&(o=(function(A){const S=Pc(A);return S instanceof ot&&mc(S)?S.getFilters():[S]})(t.where));let c=[];t.orderBy&&(c=(function(A){return A.map((S=>(function(k){return new Er(kt(k.field),(function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(S)))})(t.orderBy));let u=null;t.limit&&(u=(function(A){let S;return S=typeof A=="object"?A.value:A,Yi(S)?null:S})(t.limit));let h=null;t.startAt&&(h=(function(A){const S=!!A.before,C=A.values||[];return new Ir(C,S)})(t.startAt));let f=null;return t.endAt&&(f=(function(A){const S=!A.before,C=A.values||[];return new Ir(C,S)})(t.endAt)),Hd(e,s,c,o,u,"F",h,f)}function Pc(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=kt(t.unaryFilter.field);return ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=kt(t.unaryFilter.field);return ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=kt(t.unaryFilter.field);return ee.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const c=kt(t.unaryFilter.field);return ee.create(c,"!=",{nullValue:"NULL_VALUE"});default:return j()}})(n):n.fieldFilter!==void 0?(function(t){return ee.create(kt(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return j()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ot.create(t.compositeFilter.filters.map((r=>Pc(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j()}})(t.compositeFilter.op))})(n):j()}function kt(n){return me.fromServerFormat(n.fieldPath)}function mf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class yf{constructor(e){this.ct=e}}function _f(n){const e=gf({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Fi(e,e.limit,"L"):e}/**
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
 */class vf{constructor(){this.un=new If}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(it.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(it.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class If{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new de(ie.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new de(ie.comparator)).toArray()}}/**
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
 */class $t{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new $t(0)}static kn(){return new $t(-1)}}/**
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
 */class Ef{constructor(){this.changes=new Wt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class Tf{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&In(r.mutation,s,et.empty(),Ee.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const s=ft();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((o=>{let c=or();return o.forEach(((u,h)=>{c=c.insert(u,h.overlayedDocument)})),c}))))}getOverlayedDocuments(e,t){const r=ft();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const s=[];return r.forEach((o=>{t.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(e,s).next((o=>{o.forEach(((c,u)=>{t.set(c,u)}))}))}computeViews(e,t,r,s){let o=Ui();const c=vn(),u=(function(){return vn()})();return t.forEach(((h,f)=>{const I=r.get(f.key);s.has(f.key)&&(I===void 0||I.mutation instanceof Mr)?o=o.insert(f.key,f):I!==void 0?(c.set(f.key,I.mutation.getFieldMask()),In(I.mutation,f,I.mutation.getFieldMask(),Ee.now())):c.set(f.key,et.empty())})),this.recalculateAndSaveOverlays(e,o).next((h=>(h.forEach(((f,I)=>c.set(f,I))),t.forEach(((f,I)=>{var A;return u.set(f,new wf(I,(A=c.get(f))!==null&&A!==void 0?A:null))})),u)))}recalculateAndSaveOverlays(e,t){const r=vn();let s=new Ae(((c,u)=>c-u)),o=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((c=>{for(const u of c)u.keys().forEach((h=>{const f=t.get(h);if(f===null)return;let I=r.get(h)||et.empty();I=u.applyToLocalView(f,I),r.set(h,I);const A=(s.get(u.batchId)||Ie()).add(h);s=s.insert(u.batchId,A)}))})).next((()=>{const c=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),f=h.key,I=h.value,A=Tc();I.forEach((S=>{if(!o.has(S)){const C=Rc(t.get(S),r.get(S));C!==null&&A.set(S,C),o=o.add(S)}})),c.push(this.documentOverlayCache.saveOverlays(e,f,A))}return b.waitFor(c)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(c){return x.isDocumentKey(c.path)&&c.collectionGroup===null&&c.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):qd(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((o=>{const c=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):b.resolve(ft());let u=-1,h=o;return c.next((f=>b.forEach(f,((I,A)=>(u<A.largestBatchId&&(u=A.largestBatchId),o.get(I)?b.resolve():this.remoteDocumentCache.getEntry(e,I).next((S=>{h=h.insert(I,S)}))))).next((()=>this.populateOverlays(e,f,o))).next((()=>this.computeViews(e,h,f,Ie()))).next((I=>({batchId:u,changes:Qd(I)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next((r=>{let s=or();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let c=or();return this.indexManager.getCollectionParents(e,o).next((u=>b.forEach(u,(h=>{const f=(function(A,S){return new is(S,null,A.explicitOrderBy.slice(),A.filters.slice(),A.limit,A.limitType,A.startAt,A.endAt)})(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,f,r,s).next((I=>{I.forEach(((A,S)=>{c=c.insert(A,S)}))}))})).next((()=>c))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((c=>(o=c,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s)))).next((c=>{o.forEach(((h,f)=>{const I=f.getKey();c.get(I)===null&&(c=c.insert(I,Se.newInvalidDocument(I)))}));let u=or();return c.forEach(((h,f)=>{const I=o.get(h);I!==void 0&&In(I.mutation,f,et.empty(),Ee.now()),ss(t,f)&&(u=u.insert(h,f))})),u}))}}/**
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
 */class Af{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:ia(s.createTime)}})(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(s){return{name:s.name,query:_f(s.bundledQuery),readTime:ia(s.readTime)}})(t)),b.resolve()}}/**
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
 */class bf{constructor(){this.overlays=new Ae(x.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=ft();return b.forEach(t,(s=>this.getOverlay(e,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,o)=>{this.ht(e,t,o)})),b.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const s=ft(),o=t.length+1,c=new x(t.child("")),u=this.overlays.getIteratorFrom(c);for(;u.hasNext();){const h=u.getNext().value,f=h.getKey();if(!t.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new Ae(((f,I)=>f-I));const c=this.overlays.getIterator();for(;c.hasNext();){const f=c.getNext().value;if(f.getKey().getCollectionGroup()===t&&f.largestBatchId>r){let I=o.get(f.largestBatchId);I===null&&(I=ft(),o=o.insert(f.largestBatchId,I)),I.set(f.getKey(),f)}}const u=ft(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,I)=>u.set(f,I))),!(u.size()>=s)););return b.resolve(u)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const c=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,c)}this.overlays=this.overlays.insert(r.key,new lf(t,r));let o=this.Ir.get(t);o===void 0&&(o=Ie(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
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
 */class Sf{constructor(){this.sessionToken=st.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
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
 */class cs{constructor(){this.Tr=new de(Z.Er),this.dr=new de(Z.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new Z(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new Z(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new x(new ie([])),r=new Z(t,e),s=new Z(t,e+1),o=[];return this.dr.forEachInRange([r,s],(c=>{this.Vr(c),o.push(c.key)})),o}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new x(new ie([])),r=new Z(t,e),s=new Z(t,e+1);let o=Ie();return this.dr.forEachInRange([r,s],(c=>{o=o.add(c.key)})),o}containsKey(e){const t=new Z(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Z{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return x.comparator(e.key,t.key)||q(e.wr,t.wr)}static Ar(e,t){return q(e.wr,t.wr)||x.comparator(e.key,t.key)}}/**
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
 */class Rf{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new de(Z.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const c=new cf(o,t,r,s);this.mutationQueue.push(c);for(const u of s)this.br=this.br.add(new Z(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return b.resolve(c)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Z(t,0),s=new Z(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],(c=>{const u=this.Dr(c.wr);o.push(u)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new de(q);return t.forEach((s=>{const o=new Z(s,0),c=new Z(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,c],(u=>{r=r.add(u.wr)}))})),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;x.isDocumentKey(o)||(o=o.child(""));const c=new Z(new x(o),0);let u=new de(q);return this.br.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(u=u.add(h.wr)),!0)}),c),b.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach((r=>{const s=this.Dr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){ye(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(t.mutations,(s=>{const o=new Z(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new Z(t,0),s=this.br.firstAfterOrEqual(r);return b.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Cf{constructor(e){this.Mr=e,this.docs=(function(){return new Ae(x.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,c=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:c}),this.size+=c-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=Ui();return t.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Se.newInvalidDocument(s))})),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=Ui();const c=t.path,u=new x(c.child("")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:f,value:{document:I}}=h.getNext();if(!c.isPrefixOf(f.path))break;f.path.length>c.length+1||Ad(Td(I),r)<=0||(s.has(I.key)||ss(t,I))&&(o=o.insert(I.key,I.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(e,t,r,s){j()}Or(e,t){return b.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new Pf(this)}getSize(e){return b.resolve(this.size)}}class Pf extends Ef{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)})),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class kf{constructor(e){this.persistence=e,this.Nr=new Wt((t=>ns(t)),rs),this.lastRemoteSnapshotVersion=G.min(),this.highestTargetId=0,this.Lr=0,this.Br=new cs,this.targetCount=0,this.kr=$t.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,s)=>t(s))),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new $t(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.Nr.forEach(((c,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.Nr.delete(c),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),b.waitFor(o).next((()=>s))}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach((c=>{o.push(s.markPotentiallyOrphaned(e,c))})),b.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
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
 */class Of{constructor(e,t){this.qr={},this.overlays={},this.Qr=new dc(0),this.Kr=!1,this.Kr=!0,this.$r=new Sf,this.referenceDelegate=e(this),this.Ur=new kf(this),this.indexManager=new vf,this.remoteDocumentCache=(function(s){return new Cf(s)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new yf(t),this.Gr=new Af(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new bf,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Rf(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);const s=new Df(this.Qr.next());return this.referenceDelegate.zr(),r(s).next((o=>this.referenceDelegate.jr(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Hr(e,t){return b.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class Df extends bd{constructor(e){super(),this.currentSequenceNumber=e}}class ls{constructor(e){this.persistence=e,this.Jr=new cs,this.Yr=null}static Zr(e){return new ls(e)}get Xr(){if(this.Yr)return this.Yr;throw j()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((s=>this.Xr.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((o=>this.Xr.add(o.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,(r=>{const s=x.fromPath(r);return this.ei(e,s).next((o=>{o||t.removeEntry(s,G.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class us{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=Ie(),s=Ie();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new us(e,t.fromCache,r,s)}}/**
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
 */class Nf{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Lf{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Ku()?8:Sd(fe())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.Yi(e,t).next((c=>{o.result=c})).next((()=>{if(!o.result)return this.Zi(e,t,s,r).next((c=>{o.result=c}))})).next((()=>{if(o.result)return;const c=new Nf;return this.Xi(e,t,c).next((u=>{if(o.result=u,this.zi)return this.es(e,t,c,u.size)}))})).next((()=>o.result))}es(e,t,r,s){return r.documentReadCount<this.ji?(pn()<=M.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(pn()<=M.DEBUG&&O("QueryEngine","Query:",gn(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(pn()<=M.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,mt(t))):b.resolve())}Yi(e,t){if(Zo(t))return b.resolve(null);let r=mt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Fi(t,null,"F"),r=mt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((o=>{const c=Ie(...o);return this.Ji.getDocuments(e,c).next((u=>this.indexManager.getMinOffset(e,r).next((h=>{const f=this.ts(t,u);return this.ns(t,f,c,h.readTime)?this.Yi(e,Fi(t,null,"F")):this.rs(e,f,t,h)}))))})))))}Zi(e,t,r,s){return Zo(t)||s.isEqual(G.min())?b.resolve(null):this.Ji.getDocuments(e,r).next((o=>{const c=this.ts(t,o);return this.ns(t,c,r,s)?b.resolve(null):(pn()<=M.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),gn(t)),this.rs(e,c,t,wd(s,-1)).next((u=>u)))}))}ts(e,t){let r=new de(Gd(e));return t.forEach(((s,o)=>{ss(e,o)&&(r=r.add(o))})),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return pn()<=M.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",gn(t)),this.Ji.getDocumentsMatchingQuery(e,t,it.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next((o=>(t.forEach((c=>{o=o.insert(c.key,c)})),o)))}}/**
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
 */class Mf{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new Ae(q),this._s=new Wt((o=>ns(o)),rs),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Tf(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function Vf(n,e,t,r){return new Mf(n,e,t,r)}async function kc(n,e){const t=se(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((o=>{const c=[],u=[];let h=Ie();for(const f of s){c.push(f.batchId);for(const I of f.mutations)h=h.add(I.key)}for(const f of o){u.push(f.batchId);for(const I of f.mutations)h=h.add(I.key)}return t.localDocuments.getDocuments(r,h).next((f=>({hs:f,removedBatchIds:c,addedBatchIds:u})))}))}))}class oa{constructor(){this.activeTargetIds=Yd()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xf{constructor(){this.so=new oa,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new oa,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Ff{_o(e){}shutdown(){}}/**
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
 */class aa{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){O("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){O("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ar=null;function yi(){return ar===null?ar=(function(){return 268435456+Math.round(2147483648*Math.random())})():ar++,"0x"+ar.toString(16)}/**
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
 */const Uf={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Bf{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const ue="WebChannelConnection";class jf extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo="projects/".concat(s,"/databases/").concat(o),this.Co=this.databaseId.database==="(default)"?"project_id=".concat(s):"project_id=".concat(s,"&database_id=").concat(o)}get Fo(){return!1}Mo(t,r,s,o,c){const u=yi(),h=this.xo(t,r.toUriEncodedString());O("RestConnection","Sending RPC '".concat(t,"' ").concat(u,":"),h,s);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,c),this.No(t,h,f,s).then((I=>(O("RestConnection","Received RPC '".concat(t,"' ").concat(u,": "),I),I)),(I=>{throw yr("RestConnection","RPC '".concat(t,"' ").concat(u," failed with error: "),I,"url: ",h,"request:",s),I}))}Lo(t,r,s,o,c,u){return this.Mo(t,r,s,o,c)}Oo(t,r,s){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Kt})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((o,c)=>t[c]=o)),s&&s.headers.forEach(((o,c)=>t[c]=o))}xo(t,r){const s=Uf[t];return"".concat(this.Do,"/v1/").concat(r,":").concat(s)}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const o=yi();return new Promise(((c,u)=>{const h=new oc;h.setWithCredentials(!0),h.listenOnce(ac.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case lr.NO_ERROR:const I=h.getResponseJson();O(ue,"XHR for RPC '".concat(e,"' ").concat(o," received:"),JSON.stringify(I)),c(I);break;case lr.TIMEOUT:O(ue,"RPC '".concat(e,"' ").concat(o," timed out")),u(new L(P.DEADLINE_EXCEEDED,"Request time out"));break;case lr.HTTP_ERROR:const A=h.getStatus();if(O(ue,"RPC '".concat(e,"' ").concat(o," failed with status:"),A,"response text:",h.getResponseText()),A>0){let S=h.getResponseJson();Array.isArray(S)&&(S=S[0]);const C=S==null?void 0:S.error;if(C&&C.status&&C.message){const k=(function(N){const X=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(X)>=0?X:P.UNKNOWN})(C.status);u(new L(k,C.message))}else u(new L(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new L(P.UNAVAILABLE,"Connection failed."));break;default:j()}}finally{O(ue,"RPC '".concat(e,"' ").concat(o," completed."))}}));const f=JSON.stringify(s);O(ue,"RPC '".concat(e,"' ").concat(o," sending request:"),s),h.send(t,"POST",f,r,15)}))}Bo(e,t,r){const s=yi(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],c=uc(),u=lc(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(h.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(h.useFetchStreams=!0),this.Oo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const I=o.join("");O(ue,"Creating RPC '".concat(e,"' stream ").concat(s,": ").concat(I),h);const A=c.createWebChannel(I,h);let S=!1,C=!1;const k=new Bf({Io:N=>{C?O(ue,"Not sending because RPC '".concat(e,"' stream ").concat(s," is closed:"),N):(S||(O(ue,"Opening RPC '".concat(e,"' stream ").concat(s," transport.")),A.open(),S=!0),O(ue,"RPC '".concat(e,"' stream ").concat(s," sending:"),N),A.send(N))},To:()=>A.close()}),F=(N,X,W)=>{N.listen(X,(K=>{try{W(K)}catch(J){setTimeout((()=>{throw J}),0)}}))};return F(A,mn.EventType.OPEN,(()=>{C||(O(ue,"RPC '".concat(e,"' stream ").concat(s," transport opened.")),k.yo())})),F(A,mn.EventType.CLOSE,(()=>{C||(C=!0,O(ue,"RPC '".concat(e,"' stream ").concat(s," transport closed")),k.So())})),F(A,mn.EventType.ERROR,(N=>{C||(C=!0,yr(ue,"RPC '".concat(e,"' stream ").concat(s," transport errored:"),N),k.So(new L(P.UNAVAILABLE,"The operation could not be completed")))})),F(A,mn.EventType.MESSAGE,(N=>{var X;if(!C){const W=N.data[0];ye(!!W);const K=W,J=K.error||((X=K[0])===null||X===void 0?void 0:X.error);if(J){O(ue,"RPC '".concat(e,"' stream ").concat(s," received error:"),J);const Pe=J.status;let Y=(function(m){const y=Q[m];if(y!==void 0)return uf(y)})(Pe),v=J.message;Y===void 0&&(Y=P.INTERNAL,v="Unknown error status: "+Pe+" with message "+J.message),C=!0,k.So(new L(Y,v)),A.close()}else O(ue,"RPC '".concat(e,"' stream ").concat(s," received:"),W),k.bo(W)}})),F(u,cc.STAT_EVENT,(N=>{N.stat===Ni.PROXY?O(ue,"RPC '".concat(e,"' stream ").concat(s," detected buffering proxy")):N.stat===Ni.NOPROXY&&O(ue,"RPC '".concat(e,"' stream ").concat(s," detected no buffering proxy"))})),setTimeout((()=>{k.wo()}),0),k}}function _i(){return typeof document<"u"?document:null}/**
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
 */function Oc(n){return new hf(n,!0)}/**
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
 */class $f{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&O("ExponentialBackoff","Backing off for ".concat(s," ms (base delay: ").concat(this.Ko," ms, delay with jitter: ").concat(t," ms, last attempt: ").concat(r," ms ago)")),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Hf extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new L(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Mo(e,sa(t,r),s,o,c))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new L(P.UNKNOWN,o.toString())}))}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([c,u])=>this.connection.Lo(e,sa(t,r),s,c,u,o))).catch((c=>{throw c.name==="FirebaseError"?(c.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),c):new L(P.UNKNOWN,c.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class qf{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_("Connection failed 1 times. Most recent error: ".concat(e.toString())),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t="Could not reach Cloud Firestore backend. ".concat(e,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this.D_?(Dn(t),this.D_=!1):O("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class zf{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o((c=>{r.enqueueAndForget((async()=>{hs(this)&&(O("RemoteStore","Restarting streams for network reachability change."),await(async function(h){const f=se(h);f.L_.add(4),await Nn(f),f.q_.set("Unknown"),f.L_.delete(4),await Vr(f)})(this))}))})),this.q_=new qf(r,s)}}async function Vr(n){if(hs(n))for(const e of n.B_)await e(!0)}async function Nn(n){for(const e of n.B_)await e(!1)}function hs(n){return se(n).L_.size===0}async function ca(n,e){const t=se(n);t.asyncQueue.verifyOperationInProgress(),O("RemoteStore","RemoteStore received new credentials");const r=hs(t);t.L_.add(3),await Nn(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Vr(t)}async function Gf(n,e){const t=se(n);e?(t.L_.delete(2),await Vr(t)):e||(t.L_.add(2),await Nn(t),t.q_.set("Unknown"))}/**
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
 */class ds{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Nt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((c=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const c=Date.now()+r,u=new ds(e,t,c,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new L(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Kf(n,e){if(Dn("AsyncQueue","".concat(e,": ").concat(n)),Xi(n))return new L(P.UNAVAILABLE,"".concat(e,": ").concat(n));throw n}class Wf{constructor(){this.queries=la(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=se(t),o=s.queries;s.queries=la(),o.forEach(((c,u)=>{for(const h of u.j_)h.onError(r)}))})(this,new L(P.ABORTED,"Firestore shutting down"))}}function la(){return new Wt((n=>Ec(n)),Ic)}function Qf(n){n.Y_.forEach((e=>{e.next()}))}var ua,ha;(ha=ua||(ua={})).ea="default",ha.Cache="cache";class Jf{constructor(e,t,r,s,o,c){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=c,this.Ca={},this.Fa=new Wt((u=>Ec(u)),Ic),this.Ma=new Map,this.xa=new Set,this.Oa=new Ae(x.comparator),this.Na=new Map,this.La=new cs,this.Ba={},this.ka=new Map,this.qa=$t.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}function da(n,e,t){const r=se(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach(((o,c)=>{const u=c.view.Z_(e);u.snapshot&&s.push(u.snapshot)})),(function(c,u){const h=se(c);h.onlineState=u;let f=!1;h.queries.forEach(((I,A)=>{for(const S of A.j_)S.Z_(u)&&(f=!0)})),f&&Qf(h)})(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Xf(n,e,t){const r=se(n),s=[],o=[],c=[];r.Fa.isEmpty()||(r.Fa.forEach(((u,h)=>{c.push(r.Ka(h,e,t).then((f=>{var I;if((f||t)&&r.isPrimaryClient){const A=f?!f.fromCache:(I=void 0)===null||I===void 0?void 0:I.current;r.sharedClientState.updateQueryState(h.targetId,A?"current":"not-current")}if(f){s.push(f);const A=us.Wi(h.targetId,f);o.push(A)}})))})),await Promise.all(c),r.Ca.d_(s),await(async function(h,f){const I=se(h);try{await I.persistence.runTransaction("notifyLocalViewChanges","readwrite",(A=>b.forEach(f,(S=>b.forEach(S.$i,(C=>I.persistence.referenceDelegate.addReference(A,S.targetId,C))).next((()=>b.forEach(S.Ui,(C=>I.persistence.referenceDelegate.removeReference(A,S.targetId,C)))))))))}catch(A){if(!Xi(A))throw A;O("LocalStore","Failed to update sequence numbers: "+A)}for(const A of f){const S=A.targetId;if(!A.fromCache){const C=I.os.get(S),k=C.snapshotVersion,F=C.withLastLimboFreeSnapshotVersion(k);I.os=I.os.insert(S,F)}}})(r.localStore,o))}async function Yf(n,e){const t=se(n);if(!t.currentUser.isEqual(e)){O("SyncEngine","User change. New user:",e.toKey());const r=await kc(t.localStore,e);t.currentUser=e,(function(o,c){o.ka.forEach((u=>{u.forEach((h=>{h.reject(new L(P.CANCELLED,c))}))})),o.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Xf(t,r.hs)}}class Ar{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Oc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Vf(this.persistence,new Lf,e.initialUser,this.serializer)}Ga(e){return new Of(ls.Zr,this.serializer)}Wa(e){return new xf}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ar.provider={build:()=>new Ar};class $i{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>da(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Yf.bind(null,this.syncEngine),await Gf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Wf})()}createDatastore(e){const t=Oc(e.databaseInfo.databaseId),r=(function(o){return new jf(o)})(e.databaseInfo);return(function(o,c,u,h){return new Hf(o,c,u,h)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,o,c,u){return new zf(r,s,o,c,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>da(this.syncEngine,t,0)),(function(){return aa.D()?new aa:new Ff})())}createSyncEngine(e,t){return(function(s,o,c,u,h,f,I){const A=new Jf(s,o,c,u,h,f);return I&&(A.Qa=!0),A})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const o=se(s);O("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await Nn(o),o.k_.shutdown(),o.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}$i.provider={build:()=>new $i};/**
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
 */class Zf{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=he.UNAUTHENTICATED,this.clientId=Id.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async c=>{O("FirestoreClient","Received user=",c.uid),await this.authCredentialListener(c),this.user=c})),this.appCheckCredentials.start(r,(c=>(O("FirestoreClient","Received new app check token=",c),this.appCheckCredentialListener(c,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Nt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Kf(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function vi(n,e){n.asyncQueue.verifyOperationInProgress(),O("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await kc(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function fa(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Dc(n);O("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>ca(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>ca(e.remoteStore,s))),n._onlineComponents=e}async function Dc(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O("FirestoreClient","Using user provided OfflineComponentProvider");try{await vi(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;yr("Error using user provided cache. Falling back to memory cache: "+t),await vi(n,new Ar)}}else O("FirestoreClient","Using default OfflineComponentProvider"),await vi(n,new Ar);return n._offlineComponents}async function ep(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O("FirestoreClient","Using user provided OnlineComponentProvider"),await fa(n,n._uninitializedComponentsProvider._online)):(O("FirestoreClient","Using default OnlineComponentProvider"),await fa(n,new $i))),n._onlineComponents}function Nc(n){return Dc(n).then((e=>e.persistence))}function Lc(n){return ep(n).then((e=>e.remoteStore))}function tp(n){return n.asyncQueue.enqueue((async()=>{const e=await Nc(n),t=await Lc(n);return e.setNetworkEnabled(!0),(function(s){const o=se(s);return o.L_.delete(0),Vr(o)})(t)}))}function np(n){return n.asyncQueue.enqueue((async()=>{const e=await Nc(n),t=await Lc(n);return e.setNetworkEnabled(!1),(async function(s){const o=se(s);o.L_.add(0),await Nn(o),o.q_.set("Offline")})(t)}))}/**
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
 */const pa=new Map;function rp(n,e,t,r){if(e===!0&&r===!0)throw new L(P.INVALID_ARGUMENT,"".concat(n," and ").concat(t," cannot be used together."))}function ip(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n="".concat(n.substring(0,20),"...")),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?"a custom ".concat(e," object"):"an object"}}return typeof n=="function"?"a function":j()}function fs(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new L(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ip(n);throw new L(P.INVALID_ARGUMENT,"Expected type '".concat(e.name,"', but it was: ").concat(t))}}return n}/**
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
 */class ga{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new L(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new L(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}rp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Mc((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new L(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (must not be NaN)"));if(o.timeoutSeconds<5)throw new L(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (minimum allowed value is 5)"));if(o.timeoutSeconds>30)throw new L(P.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(o.timeoutSeconds," (maximum allowed value is 30)"))}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Vc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ga({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new L(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new L(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ga(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new dd;switch(r.type){case"firstParty":return new md(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new L(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=pa.get(t);r&&(O("ComponentProvider","Removing Datastore"),pa.delete(t),r.terminate())})(this),Promise.resolve()}}function sp(n,e,t,r={}){var s;const o=(n=fs(n,Vc))._getSettings(),c="".concat(e,":").concat(t);if(o.host!=="firestore.googleapis.com"&&o.host!==c&&yr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:c,ssl:!1})),r.mockUserToken){let u,h;if(typeof r.mockUserToken=="string")u=r.mockUserToken,h=he.MOCK_USER;else{u=ju(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const f=r.mockUserToken.sub||r.mockUserToken.user_id;if(!f)throw new L(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");h=new he(f)}n._authCredentials=new fd(new hc(u,h))}}/**
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
 */class ma{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new $f(this,"async_queue_retry"),this.Vu=()=>{const r=_i();r&&O("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=_i();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=_i();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new Nt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Xi(e))throw e;O("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const s=(function(c){let u=c.message||"";return c.stack&&(u=c.stack.includes(c.message)?c.stack:c.message+"\n"+c.stack),u})(r);throw Dn("INTERNAL UNHANDLED ERROR: ",s),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=ds.createAndSchedule(this,e,t,r,(o=>this.yu(o)));return this.Tu.push(s),s}fu(){this.Eu&&j()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class ps extends Vc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new ma,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ma(e),this._firestoreClient=void 0,await e}}}function op(n,e){const t=typeof n=="object"?n:Qi(),r=typeof n=="string"?n:"(default)",s=bt(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Uu("firestore");o&&sp(s,...o)}return s}function xc(n){if(n._terminated)throw new L(P.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ap(n),n._firestoreClient}function ap(n){var e,t,r;const s=n._freezeSettings(),o=(function(u,h,f,I){return new kd(u,h,f,I.host,I.ssl,I.experimentalForceLongPolling,I.experimentalAutoDetectLongPolling,Mc(I.experimentalLongPollingOptions),I.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Zf(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&(function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}})(n._componentsProvider))}function cp(n){return tp(xc(n=fs(n,ps)))}function lp(n){return np(xc(n=fs(n,ps)))}(function(e,t=!0){(function(s){Kt=s})(Gt),De(new Re("firestore",((r,{instanceIdentifier:s,options:o})=>{const c=r.getProvider("app").getImmediate(),u=new ps(new pd(r.getProvider("auth-internal")),new _d(r.getProvider("app-check-internal")),(function(f,I){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new L(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new vr(f.options.projectId,I)})(c,s),c);return o=Object.assign({useFetchStreams:t},o),u._setSettings(o),u}),"PUBLIC").setMultipleInstances(!0)),Te(zo,"4.7.3",e),Te(zo,"4.7.3","esm2017")})();var up="firebase",hp="10.14.1";/**
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
 */Te(up,hp,"app");function gs(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Fc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const dp=Fc,Uc=new At("auth","Firebase",Fc());/**
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
 */const br=new Nr("@firebase/auth");function fp(n,...e){br.logLevel<=M.WARN&&br.warn("Auth (".concat(Gt,"): ").concat(n),...e)}function hr(n,...e){br.logLevel<=M.ERROR&&br.error("Auth (".concat(Gt,"): ").concat(n),...e)}/**
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
 */function $e(n,...e){throw ms(n,...e)}function ke(n,...e){return ms(n,...e)}function Bc(n,e,t){const r=Object.assign(Object.assign({},dp()),{[e]:t});return new At("auth","Firebase",r).create(e,{appName:n.name})}function _t(n){return Bc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ms(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Uc.create(n,...e)}function D(n,e,...t){if(!n)throw ms(e,...t)}function Fe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw hr(e),new Error(e)}function He(n,e){n||Fe(e)}/**
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
 */function Hi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function pp(){return ya()==="http:"||ya()==="https:"}function ya(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function gp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(pp()||Ja()||"connection"in navigator)?navigator.onLine:!0}function mp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ln{constructor(e,t){this.shortDelay=e,this.longDelay=t,He(t>e,"Short delay should be less than long delay!"),this.isMobile=$u()||zu()}get(){return gp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ys(n,e){He(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?"".concat(t).concat(e.startsWith("/")?e.slice(1):e):t}/**
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
 */class jc{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Fe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Fe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Fe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const yp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const _p=new Ln(3e4,6e4);function _s(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Qt(n,e,t,r,s={}){return $c(n,s,async()=>{let o={},c={};r&&(e==="GET"?c=r:o={body:JSON.stringify(r)});const u=On(Object.assign({key:n.config.apiKey},c)).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const f=Object.assign({method:e,headers:h},o);return qu()||(f.referrerPolicy="no-referrer"),jc.fetch()(Hc(n,n.config.apiHost,t,u),f)})}async function $c(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},yp),e);try{const s=new Ip(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const c=await o.json();if("needConfirmation"in c)throw cr(n,"account-exists-with-different-credential",c);if(o.ok&&!("errorMessage"in c))return c;{const u=o.ok?c.errorMessage:c.error.message,[h,f]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw cr(n,"credential-already-in-use",c);if(h==="EMAIL_EXISTS")throw cr(n,"email-already-in-use",c);if(h==="USER_DISABLED")throw cr(n,"user-disabled",c);const I=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Bc(n,I,f);$e(n,I)}}catch(s){if(s instanceof Ce)throw s;$e(n,"network-request-failed",{message:String(s)})}}async function vp(n,e,t,r,s={}){const o=await Qt(n,e,t,r,s);return"mfaPendingCredential"in o&&$e(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Hc(n,e,t,r){const s="".concat(e).concat(t,"?").concat(r);return n.config.emulator?ys(n.config,s):"".concat(n.config.apiScheme,"://").concat(s)}class Ip{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ke(this.auth,"network-request-failed")),_p.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function cr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ke(n,e,r);return s.customData._tokenResponse=t,s}/**
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
 */async function Ep(n,e){return Qt(n,"POST","/v1/accounts:delete",e)}async function qc(n,e){return Qt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function En(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}async function wp(n,e=!1){const t=at(n),r=await t.getIdToken(e),s=vs(r);D(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,c=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:En(Ii(s.auth_time)),issuedAtTime:En(Ii(s.iat)),expirationTime:En(Ii(s.exp)),signInProvider:c||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Ii(n){return Number(n)*1e3}function vs(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return hr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ga(t);return s?JSON.parse(s):(hr("Failed to decode base64 JWT payload"),null)}catch(s){return hr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function _a(n){const e=vs(n);return D(e,"internal-error"),D(typeof e.exp<"u","internal-error"),D(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Pn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ce&&Tp(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Tp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Ap{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class qi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=En(this.lastLoginAt),this.creationTime=En(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Sr(n){var e;const t=n.auth,r=await n.getIdToken(),s=await Pn(n,qc(t,{idToken:r}));D(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const c=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?zc(o.providerUserInfo):[],u=Sp(n.providerData,c),h=n.isAnonymous,f=!(n.email&&o.passwordHash)&&!(u!=null&&u.length),I=h?f:!1,A={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:u,metadata:new qi(o.createdAt,o.lastLoginAt),isAnonymous:I};Object.assign(n,A)}async function bp(n){const e=at(n);await Sr(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Sp(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function zc(n){return n.map(e=>{var{providerId:t}=e,r=gs(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Rp(n,e){const t=await $c(n,{},async()=>{const r=On({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,c=Hc(n,s,"/v1/token","key=".concat(o)),u=await n._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",jc.fetch()(c,{method:"POST",headers:u,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Cp(n,e){return Qt(n,"POST","/v2/accounts:revokeToken",_s(n,e))}/**
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
 */class Lt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){D(e.idToken,"internal-error"),D(typeof e.idToken<"u","internal-error"),D(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):_a(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){D(e.length!==0,"internal-error");const t=_a(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(D(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await Rp(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,c=new Lt;return r&&(D(typeof r=="string","internal-error",{appName:e}),c.refreshToken=r),s&&(D(typeof s=="string","internal-error",{appName:e}),c.accessToken=s),o&&(D(typeof o=="number","internal-error",{appName:e}),c.expirationTime=o),c}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Lt,this.toJSON())}_performRefresh(){return Fe("not implemented")}}/**
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
 */function We(n,e){D(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ue{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=gs(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ap(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new qi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await Pn(this,this.stsTokenManager.getToken(this.auth,e));return D(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wp(this,e)}reload(){return bp(this)}_assign(e){this!==e&&(D(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){D(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Sr(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(_t(this.auth));const e=await this.getIdToken();return await Pn(this,Ep(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,c,u,h,f,I;const A=(r=t.displayName)!==null&&r!==void 0?r:void 0,S=(s=t.email)!==null&&s!==void 0?s:void 0,C=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,k=(c=t.photoURL)!==null&&c!==void 0?c:void 0,F=(u=t.tenantId)!==null&&u!==void 0?u:void 0,N=(h=t._redirectEventId)!==null&&h!==void 0?h:void 0,X=(f=t.createdAt)!==null&&f!==void 0?f:void 0,W=(I=t.lastLoginAt)!==null&&I!==void 0?I:void 0,{uid:K,emailVerified:J,isAnonymous:Pe,providerData:Y,stsTokenManager:v}=t;D(K&&v,e,"internal-error");const p=Lt.fromJSON(this.name,v);D(typeof K=="string",e,"internal-error"),We(A,e.name),We(S,e.name),D(typeof J=="boolean",e,"internal-error"),D(typeof Pe=="boolean",e,"internal-error"),We(C,e.name),We(k,e.name),We(F,e.name),We(N,e.name),We(X,e.name),We(W,e.name);const m=new Ue({uid:K,auth:e,email:S,emailVerified:J,displayName:A,isAnonymous:Pe,photoURL:k,phoneNumber:C,tenantId:F,stsTokenManager:p,createdAt:X,lastLoginAt:W});return Y&&Array.isArray(Y)&&(m.providerData=Y.map(y=>Object.assign({},y))),N&&(m._redirectEventId=N),m}static async _fromIdTokenResponse(e,t,r=!1){const s=new Lt;s.updateFromServerResponse(t);const o=new Ue({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Sr(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];D(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?zc(s.providerUserInfo):[],c=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),u=new Lt;u.updateFromIdToken(r);const h=new Ue({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:c}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new qi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,f),h}}/**
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
 */const va=new Map;function Be(n){He(n instanceof Function,"Expected a class definition");let e=va.get(n);return e?(He(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,va.set(n,e),e)}/**
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
 */class Gc{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Gc.type="NONE";const Ia=Gc;/**
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
 */function dr(n,e,t){return"firebase:".concat(n,":").concat(e,":").concat(t)}class Mt{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=dr(this.userKey,s.apiKey,o),this.fullPersistenceKey=dr("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ue._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Mt(Be(Ia),e,r);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=s[0]||Be(Ia);const c=dr(r,e.config.apiKey,e.name);let u=null;for(const f of t)try{const I=await f._get(c);if(I){const A=Ue._fromJSON(e,I);f!==o&&(u=A),o=f;break}}catch(I){}const h=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new Mt(o,e,r):(o=h[0],u&&await o._set(c,u.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(c)}catch(I){}})),new Mt(o,e,r))}}/**
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
 */function Ea(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Jc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Kc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Yc(e))return"Blackberry";if(Zc(e))return"Webos";if(Wc(e))return"Safari";if((e.includes("chrome/")||Qc(e))&&!e.includes("edge/"))return"Chrome";if(Xc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Kc(n=fe()){return/firefox\//i.test(n)}function Wc(n=fe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Qc(n=fe()){return/crios\//i.test(n)}function Jc(n=fe()){return/iemobile/i.test(n)}function Xc(n=fe()){return/android/i.test(n)}function Yc(n=fe()){return/blackberry/i.test(n)}function Zc(n=fe()){return/webos/i.test(n)}function Is(n=fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Pp(n=fe()){var e;return Is(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function kp(){return Gu()&&document.documentMode===10}function el(n=fe()){return Is(n)||Xc(n)||Zc(n)||Yc(n)||/windows phone/i.test(n)||Jc(n)}/**
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
 */function tl(n,e=[]){let t;switch(n){case"Browser":t=Ea(fe());break;case"Worker":t="".concat(Ea(fe()),"-").concat(n);break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return"".concat(t,"/JsCore/").concat(Gt,"/").concat(r)}/**
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
 */class Op{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((c,u)=>{try{const h=e(o);c(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch(o){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Dp(n,e={}){return Qt(n,"GET","/v2/passwordPolicy",_s(n,e))}/**
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
 */const Np=6;class Lp{constructor(e){var t,r,s,o;const c=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=c.minPasswordLength)!==null&&t!==void 0?t:Np,c.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=c.maxPasswordLength),c.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=c.containsLowercaseCharacter),c.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=c.containsUppercaseCharacter),c.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=c.containsNumericCharacter),c.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=c.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,c,u;const h={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,h),this.validatePasswordCharacterOptions(e,h),h.isValid&&(h.isValid=(t=h.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),h.isValid&&(h.isValid=(r=h.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),h.isValid&&(h.isValid=(s=h.containsLowercaseLetter)!==null&&s!==void 0?s:!0),h.isValid&&(h.isValid=(o=h.containsUppercaseLetter)!==null&&o!==void 0?o:!0),h.isValid&&(h.isValid=(c=h.containsNumericCharacter)!==null&&c!==void 0?c:!0),h.isValid&&(h.isValid=(u=h.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),h}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
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
 */class Mp{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new wa(this),this.idTokenSubscription=new wa(this),this.beforeStateQueue=new Op(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Uc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Be(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Mt.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(o){}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await qc(this,{idToken:e}),r=await Ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ze(this.app)){const c=this.app.settings.authIdToken;return c?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(c).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const c=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=s==null?void 0:s._redirectEventId,h=await this.tryRedirectSignIn(e);(!c||c===u)&&(h!=null&&h.user)&&(s=h.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(c){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(c))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return D(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(r){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Sr(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=mp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(_t(this));const t=e?at(e):null;return t&&D(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&D(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(_t(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(_t(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Be(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Dp(this),t=new Lp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new At("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Cp(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Be(e)||this._popupRedirectResolver;D(t,this,"argument-error"),this.redirectPersistenceManager=await Mt.create(this,[Be(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return"".concat(this.config.authDomain,":").concat(this.config.apiKey,":").concat(this.name)}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let c=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(D(u,this,"internal-error"),u.then(()=>{c||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{c=!0,h()}}else{const h=e.addObserver(t);return()=>{c=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return D(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=tl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&fp("Error while retrieving App Check token: ".concat(t.error)),t==null?void 0:t.token}}function Es(n){return at(n)}class wa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zu(t=>this.observer=t)}get next(){return D(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ws={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Vp(n){ws=n}function xp(n){return ws.loadJS(n)}function Fp(){return ws.gapiScript}function Up(n){return"__".concat(n).concat(Math.floor(Math.random()*1e6))}/**
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
 */function Bp(n,e){const t=bt(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(An(o,e!=null?e:{}))return s;$e(s,"already-initialized")}return t.initialize({options:e})}function jp(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Be);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function $p(n,e,t){const r=Es(n);D(r._canInitEmulator,r,"emulator-config-failed"),D(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=nl(e),{host:c,port:u}=Hp(e),h=u===null?"":":".concat(u);r.config.emulator={url:"".concat(o,"//").concat(c).concat(h,"/")},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:c,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),qp()}function nl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Hp(n){const e=nl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:Ta(r.substr(o.length+1))}}else{const[o,c]=r.split(":");return{host:o,port:Ta(c)}}}function Ta(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function qp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class rl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Fe("not implemented")}_getIdTokenResponse(e){return Fe("not implemented")}_linkToIdToken(e,t){return Fe("not implemented")}_getReauthenticationResolver(e){return Fe("not implemented")}}/**
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
 */async function Vt(n,e){return vp(n,"POST","/v1/accounts:signInWithIdp",_s(n,e))}/**
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
 */const zp="http://localhost";class Et extends rl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Et(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=gs(t,["providerId","signInMethod"]);if(!r||!s)return null;const c=new Et(r,s);return c.idToken=o.idToken||void 0,c.accessToken=o.accessToken||void 0,c.secret=o.secret,c.nonce=o.nonce,c.pendingToken=o.pendingToken||null,c}_getIdTokenResponse(e){const t=this.buildRequest();return Vt(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Vt(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Vt(e,t)}buildRequest(){const e={requestUri:zp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=On(t)}return e}}/**
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
 */class il{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Mn extends il{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Qe extends Mn{constructor(){super("facebook.com")}static credential(e){return Et._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qe.credential(e.oauthAccessToken)}catch(t){return null}}}Qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qe.PROVIDER_ID="facebook.com";/**
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
 */class Je extends Mn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Et._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Je.credential(t,r)}catch(s){return null}}}Je.GOOGLE_SIGN_IN_METHOD="google.com";Je.PROVIDER_ID="google.com";/**
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
 */class Xe extends Mn{constructor(){super("github.com")}static credential(e){return Et._fromParams({providerId:Xe.PROVIDER_ID,signInMethod:Xe.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xe.credentialFromTaggedObject(e)}static credentialFromError(e){return Xe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xe.credential(e.oauthAccessToken)}catch(t){return null}}}Xe.GITHUB_SIGN_IN_METHOD="github.com";Xe.PROVIDER_ID="github.com";/**
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
 */class Ye extends Mn{constructor(){super("twitter.com")}static credential(e,t){return Et._fromParams({providerId:Ye.PROVIDER_ID,signInMethod:Ye.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ye.credentialFromTaggedObject(e)}static credentialFromError(e){return Ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Ye.credential(t,r)}catch(s){return null}}}Ye.TWITTER_SIGN_IN_METHOD="twitter.com";Ye.PROVIDER_ID="twitter.com";/**
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
 */class Ht{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await Ue._fromIdTokenResponse(e,r,s),c=Aa(r);return new Ht({user:o,providerId:c,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Aa(r);return new Ht({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Aa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Rr extends Ce{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Rr.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new Rr(e,t,r,s)}}function sl(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?Rr._fromErrorAndOperation(n,o,e,r):o})}async function Gp(n,e,t=!1){const r=await Pn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ht._forOperation(n,"link",r)}/**
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
 */async function Kp(n,e,t=!1){const{auth:r}=n;if(Ze(r.app))return Promise.reject(_t(r));const s="reauthenticate";try{const o=await Pn(n,sl(r,s,e,n),t);D(o.idToken,r,"internal-error");const c=vs(o.idToken);D(c,r,"internal-error");const{sub:u}=c;return D(n.uid===u,r,"user-mismatch"),Ht._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&$e(r,"user-mismatch"),o}}/**
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
 */async function Wp(n,e,t=!1){if(Ze(n.app))return Promise.reject(_t(n));const r="signIn",s=await sl(n,r,e),o=await Ht._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function Qp(n,e,t,r){return at(n).onIdTokenChanged(e,t,r)}function Jp(n,e,t){return at(n).beforeAuthStateChanged(e,t)}const Cr="__sak";/**
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
 */class ol{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Cr,"1"),this.storage.removeItem(Cr),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Xp=1e3,Yp=10;class al extends ol{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=el(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((c,u,h)=>{this.notifyListeners(c,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const c=this.storage.getItem(r);!t&&this.localCache[r]===c||this.notifyListeners(r,c)},o=this.storage.getItem(r);kp()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Yp):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Xp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}al.type="LOCAL";const Zp=al;/**
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
 */class cl extends ol{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}cl.type="SESSION";const ll=cl;/**
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
 */function eg(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class xr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new xr(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,c=this.handlersMap[s];if(!(c!=null&&c.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(c).map(async f=>f(t.origin,o)),h=await eg(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}xr.receivers=[];/**
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
 */function Ts(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class tg{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,c;return new Promise((u,h)=>{const f=Ts("",20);s.port1.start();const I=setTimeout(()=>{h(new Error("unsupported_event"))},r);c={messageChannel:s,onMessage(A){const S=A;if(S.data.eventId===f)switch(S.data.status){case"ack":clearTimeout(I),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(S.data.response);break;default:clearTimeout(I),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(c),s.port1.addEventListener("message",c.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{c&&this.removeMessageHandler(c)})}}/**
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
 */function Oe(){return window}function ng(n){Oe().location.href=n}/**
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
 */function ul(){return typeof Oe().WorkerGlobalScope<"u"&&typeof Oe().importScripts=="function"}async function rg(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(n){return null}}function ig(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function sg(){return ul()?self:null}/**
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
 */const hl="firebaseLocalStorageDb",og=1,Pr="firebaseLocalStorage",dl="fbase_key";class Vn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Fr(n,e){return n.transaction([Pr],e?"readwrite":"readonly").objectStore(Pr)}function ag(){const n=indexedDB.deleteDatabase(hl);return new Vn(n).toPromise()}function zi(){const n=indexedDB.open(hl,og);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Pr,{keyPath:dl})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Pr)?e(r):(r.close(),await ag(),e(await zi()))})})}async function ba(n,e,t){const r=Fr(n,!0).put({[dl]:e,value:t});return new Vn(r).toPromise()}async function cg(n,e){const t=Fr(n,!1).get(e),r=await new Vn(t).toPromise();return r===void 0?null:r.value}function Sa(n,e){const t=Fr(n,!0).delete(e);return new Vn(t).toPromise()}const lg=800,ug=3;class fl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await zi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>ug)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ul()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=xr._getInstance(sg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await rg(),!this.activeServiceWorker)return;this.sender=new tg(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ig()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await zi();return await ba(e,Cr,"1"),await Sa(e,Cr),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ba(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>cg(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Sa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Fr(s,!1).getAll();return new Vn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}fl.type="LOCAL";const hg=fl;new Ln(3e4,6e4);/**
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
 */function dg(n,e){return e?Be(e):(D(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class As extends rl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function fg(n){return Wp(n.auth,new As(n),n.bypassAuthState)}function pg(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Kp(t,new As(n),n.bypassAuthState)}async function gg(n){const{auth:e,user:t}=n;return D(t,e,"internal-error"),Gp(t,new As(n),n.bypassAuthState)}/**
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
 */class pl{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:c,type:u}=e;if(c){this.reject(c);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fg;case"linkViaPopup":case"linkViaRedirect":return gg;case"reauthViaPopup":case"reauthViaRedirect":return pg;default:$e(this.auth,"internal-error")}}resolve(e){He(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){He(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const mg=new Ln(2e3,1e4);class Ot extends pl{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,Ot.currentPopupAction&&Ot.currentPopupAction.cancel(),Ot.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return D(e,this.auth,"internal-error"),e}async onExecution(){He(this.filter.length===1,"Popup operations only handle one event");const e=Ts();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ke(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ke(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ot.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ke(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,mg.get())};e()}}Ot.currentPopupAction=null;/**
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
 */const yg="pendingRedirect",fr=new Map;class _g extends pl{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=fr.get(this.auth._key());if(!e){try{const r=await vg(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}fr.set(this.auth._key(),e)}return this.bypassAuthState||fr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vg(n,e){const t=wg(e),r=Eg(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function Ig(n,e){fr.set(n._key(),e)}function Eg(n){return Be(n._redirectPersistence)}function wg(n){return dr(yg,n.config.apiKey,n.name)}async function Tg(n,e,t=!1){if(Ze(n.app))return Promise.reject(_t(n));const r=Es(n),s=dg(r,e),c=await new _g(r,s,t).execute();return c&&!t&&(delete c.user._redirectEventId,await r._persistUserIfCurrent(c.user),await r._setRedirectUser(null,e)),c}/**
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
 */const Ag=600*1e3;class bg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Sg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!gl(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ke(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ag&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ra(e))}saveEventToCache(e){this.cachedEventUids.add(Ra(e)),this.lastProcessedEventTime=Date.now()}}function Ra(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function gl({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Sg(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gl(n);default:return!1}}/**
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
 */async function Rg(n,e={}){return Qt(n,"GET","/v1/projects",e)}/**
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
 */const Cg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pg=/^https?/;async function kg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Rg(n);for(const t of e)try{if(Og(t))return}catch(r){}$e(n,"unauthorized-domain")}function Og(n){const e=Hi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const c=new URL(n);return c.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&c.hostname===r}if(!Pg.test(t))return!1;if(Cg.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const Dg=new Ln(3e4,6e4);function Ca(){const n=Oe().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ng(n){return new Promise((e,t)=>{var r,s,o;function c(){Ca(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ca(),t(ke(n,"network-request-failed"))},timeout:Dg.get()})}if(!((s=(r=Oe().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=Oe().gapi)===null||o===void 0)&&o.load)c();else{const u=Up("iframefcb");return Oe()[u]=()=>{gapi.load?c():t(ke(n,"network-request-failed"))},xp("".concat(Fp(),"?onload=").concat(u)).catch(h=>t(h))}}).catch(e=>{throw pr=null,e})}let pr=null;function Lg(n){return pr=pr||Ng(n),pr}/**
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
 */const Mg=new Ln(5e3,15e3),Vg="__/auth/iframe",xg="emulator/auth/iframe",Fg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ug=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Bg(n){const e=n.config;D(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ys(e,xg):"https://".concat(n.config.authDomain,"/").concat(Vg),r={apiKey:e.apiKey,appName:n.name,v:Gt},s=Ug.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),"".concat(t,"?").concat(On(r).slice(1))}async function jg(n){const e=await Lg(n),t=Oe().gapi;return D(t,n,"internal-error"),e.open({where:document.body,url:Bg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fg,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const c=ke(n,"network-request-failed"),u=Oe().setTimeout(()=>{o(c)},Mg.get());function h(){Oe().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{o(c)})}))}/**
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
 */const $g={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hg=500,qg=600,zg="_blank",Gg="http://localhost";class Pa{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}function Kg(n,e,t,r=Hg,s=qg){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),c=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h=Object.assign(Object.assign({},$g),{width:r.toString(),height:s.toString(),top:o,left:c}),f=fe().toLowerCase();t&&(u=Qc(f)?zg:t),Kc(f)&&(e=e||Gg,h.scrollbars="yes");const I=Object.entries(h).reduce((S,[C,k])=>"".concat(S).concat(C,"=").concat(k,","),"");if(Pp(f)&&u!=="_self")return Wg(e||"",u),new Pa(null);const A=window.open(e||"",u,I);D(A,n,"popup-blocked");try{A.focus()}catch(S){}return new Pa(A)}function Wg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Qg="__/auth/handler",Jg="emulator/auth/handler",Xg=encodeURIComponent("fac");async function ka(n,e,t,r,s,o){D(n.config.authDomain,n,"auth-domain-config-required"),D(n.config.apiKey,n,"invalid-api-key");const c={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Gt,eventId:s};if(e instanceof il){e.setDefaultLanguage(n.languageCode),c.providerId=e.providerId||"",Yu(e.getCustomParameters())||(c.customParameters=JSON.stringify(e.getCustomParameters()));for(const[I,A]of Object.entries({}))c[I]=A}if(e instanceof Mn){const I=e.getScopes().filter(A=>A!=="");I.length>0&&(c.scopes=I.join(","))}n.tenantId&&(c.tid=n.tenantId);const u=c;for(const I of Object.keys(u))u[I]===void 0&&delete u[I];const h=await n._getAppCheckToken(),f=h?"#".concat(Xg,"=").concat(encodeURIComponent(h)):"";return"".concat(Yg(n),"?").concat(On(u).slice(1)).concat(f)}function Yg({config:n}){return n.emulator?ys(n,Jg):"https://".concat(n.authDomain,"/").concat(Qg)}/**
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
 */const Ei="webStorageSupport";class Zg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ll,this._completeRedirectFn=Tg,this._overrideRedirectResult=Ig}async _openPopup(e,t,r,s){var o;He((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const c=await ka(e,t,r,Hi(),s);return Kg(e,c,Ts())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await ka(e,t,r,Hi(),s);return ng(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(He(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await jg(e),r=new bg(e);return t.register("authEvent",s=>(D(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ei,{type:Ei},s=>{var o;const c=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[Ei];c!==void 0&&t(!!c),$e(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return el()||Wc()||Is()}}const em=Zg;var Oa="@firebase/auth",Da="1.7.9";/**
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
 */class tm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){D(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function nm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rm(n){De(new Re("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:c,authDomain:u}=r.options;D(c&&!c.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:c,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:tl(n)},f=new Mp(r,s,o,h);return jp(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),De(new Re("auth-internal",e=>{const t=Es(e.getProvider("auth").getImmediate());return(r=>new tm(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Te(Oa,Da,nm(n)),Te(Oa,Da,"esm2017")}/**
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
 */const im=300,sm=Qa("authIdTokenMaxAge")||im;let Na=null;const om=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>sm)return;const s=t==null?void 0:t.token;Na!==s&&(Na=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:"Bearer ".concat(s)}:{}}))};function am(n=Qi()){const e=bt(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Bp(n,{popupRedirectResolver:em,persistence:[hg,Zp,ll]}),r=Qa("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const c=om(o.toString());Jp(t,c,()=>c(t.currentUser)),Qp(t,u=>c(u))}}const s=Ka("auth");return s&&$p(t,"http://".concat(s)),t}function cm(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Vp({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=ke("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",cm().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rm("Browser");const ml="@firebase/installations",bs="0.6.9";/**
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
 */const yl=1e4,_l="w:".concat(bs),vl="FIS_v2",lm="https://firebaseinstallations.googleapis.com/v1",um=3600*1e3,hm="installations",dm="Installations";/**
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
 */const fm={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},wt=new At(hm,dm,fm);function Il(n){return n instanceof Ce&&n.code.includes("request-failed")}/**
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
 */function El({projectId:n}){return"".concat(lm,"/projects/").concat(n,"/installations")}function wl(n){return{token:n.token,requestStatus:2,expiresIn:gm(n.expiresIn),creationTime:Date.now()}}async function Tl(n,e){const r=(await e.json()).error;return wt.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Al({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function pm(n,{refreshToken:e}){const t=Al(n);return t.append("Authorization",mm(e)),t}async function bl(n){const e=await n();return e.status>=500&&e.status<600?n():e}function gm(n){return Number(n.replace("s","000"))}function mm(n){return"".concat(vl," ").concat(n)}/**
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
 */async function ym({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=El(n),s=Al(n),o=e.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const c={fid:t,authVersion:vl,appId:n.appId,sdkVersion:_l},u={method:"POST",headers:s,body:JSON.stringify(c)},h=await bl(()=>fetch(r,u));if(h.ok){const f=await h.json();return{fid:f.fid||t,registrationStatus:2,refreshToken:f.refreshToken,authToken:wl(f.authToken)}}else throw await Tl("Create Installation",h)}/**
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
 */function Sl(n){return new Promise(e=>{setTimeout(e,n)})}/**
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
 */function _m(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const vm=/^[cdef][\w-]{21}$/,Gi="";function Im(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=Em(n);return vm.test(t)?t:Gi}catch(n){return Gi}}function Em(n){return _m(n).substr(0,22)}/**
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
 */function Ur(n){return"".concat(n.appName,"!").concat(n.appId)}/**
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
 */const Rl=new Map;function Cl(n,e){const t=Ur(n);Pl(t,e),wm(t,e)}function Pl(n,e){const t=Rl.get(n);if(t)for(const r of t)r(e)}function wm(n,e){const t=Tm();t&&t.postMessage({key:n,fid:e}),Am()}let pt=null;function Tm(){return!pt&&"BroadcastChannel"in self&&(pt=new BroadcastChannel("[Firebase] FID Change"),pt.onmessage=n=>{Pl(n.data.key,n.data.fid)}),pt}function Am(){Rl.size===0&&pt&&(pt.close(),pt=null)}/**
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
 */const bm="firebase-installations-database",Sm=1,Tt="firebase-installations-store";let wi=null;function Ss(){return wi||(wi=tc(bm,Sm,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Tt)}}})),wi}async function kr(n,e){const t=Ur(n),s=(await Ss()).transaction(Tt,"readwrite"),o=s.objectStore(Tt),c=await o.get(t);return await o.put(e,t),await s.done,(!c||c.fid!==e.fid)&&Cl(n,e.fid),e}async function kl(n){const e=Ur(n),r=(await Ss()).transaction(Tt,"readwrite");await r.objectStore(Tt).delete(e),await r.done}async function Br(n,e){const t=Ur(n),s=(await Ss()).transaction(Tt,"readwrite"),o=s.objectStore(Tt),c=await o.get(t),u=e(c);return u===void 0?await o.delete(t):await o.put(u,t),await s.done,u&&(!c||c.fid!==u.fid)&&Cl(n,u.fid),u}/**
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
 */async function Rs(n){let e;const t=await Br(n.appConfig,r=>{const s=Rm(r),o=Cm(n,s);return e=o.registrationPromise,o.installationEntry});return t.fid===Gi?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function Rm(n){const e=n||{fid:Im(),registrationStatus:0};return Ol(e)}function Cm(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(wt.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Pm(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:km(n)}:{installationEntry:e}}async function Pm(n,e){try{const t=await ym(n,e);return kr(n.appConfig,t)}catch(t){throw Il(t)&&t.customData.serverCode===409?await kl(n.appConfig):await kr(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function km(n){let e=await La(n.appConfig);for(;e.registrationStatus===1;)await Sl(100),e=await La(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await Rs(n);return r||t}return e}function La(n){return Br(n,e=>{if(!e)throw wt.create("installation-not-found");return Ol(e)})}function Ol(n){return Om(n)?{fid:n.fid,registrationStatus:0}:n}function Om(n){return n.registrationStatus===1&&n.registrationTime+yl<Date.now()}/**
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
 */async function Dm({appConfig:n,heartbeatServiceProvider:e},t){const r=Nm(n,t),s=pm(n,t),o=e.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const c={installation:{sdkVersion:_l,appId:n.appId}},u={method:"POST",headers:s,body:JSON.stringify(c)},h=await bl(()=>fetch(r,u));if(h.ok){const f=await h.json();return wl(f)}else throw await Tl("Generate Auth Token",h)}function Nm(n,{fid:e}){return"".concat(El(n),"/").concat(e,"/authTokens:generate")}/**
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
 */async function Cs(n,e=!1){let t;const r=await Br(n.appConfig,o=>{if(!Dl(o))throw wt.create("not-registered");const c=o.authToken;if(!e&&Vm(c))return o;if(c.requestStatus===1)return t=Lm(n,e),o;{if(!navigator.onLine)throw wt.create("app-offline");const u=Fm(o);return t=Mm(n,u),u}});return t?await t:r.authToken}async function Lm(n,e){let t=await Ma(n.appConfig);for(;t.authToken.requestStatus===1;)await Sl(100),t=await Ma(n.appConfig);const r=t.authToken;return r.requestStatus===0?Cs(n,e):r}function Ma(n){return Br(n,e=>{if(!Dl(e))throw wt.create("not-registered");const t=e.authToken;return Um(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function Mm(n,e){try{const t=await Dm(n,e),r=Object.assign(Object.assign({},e),{authToken:t});return await kr(n.appConfig,r),t}catch(t){if(Il(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await kl(n.appConfig);else{const r=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await kr(n.appConfig,r)}throw t}}function Dl(n){return n!==void 0&&n.registrationStatus===2}function Vm(n){return n.requestStatus===2&&!xm(n)}function xm(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+um}function Fm(n){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},n),{authToken:e})}function Um(n){return n.requestStatus===1&&n.requestTime+yl<Date.now()}/**
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
 */async function Bm(n){const e=n,{installationEntry:t,registrationPromise:r}=await Rs(e);return r?r.catch(console.error):Cs(e).catch(console.error),t.fid}/**
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
 */async function jm(n,e=!1){const t=n;return await $m(t),(await Cs(t,e)).token}async function $m(n){const{registrationPromise:e}=await Rs(n);e&&await e}/**
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
 */function Hm(n){if(!n||!n.options)throw Ti("App Configuration");if(!n.name)throw Ti("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Ti(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Ti(n){return wt.create("missing-app-config-values",{valueName:n})}/**
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
 */const Nl="installations",qm="installations-internal",zm=n=>{const e=n.getProvider("app").getImmediate(),t=Hm(e),r=bt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Gm=n=>{const e=n.getProvider("app").getImmediate(),t=bt(e,Nl).getImmediate();return{getId:()=>Bm(t),getToken:s=>jm(t,s)}};function Km(){De(new Re(Nl,zm,"PUBLIC")),De(new Re(qm,Gm,"PRIVATE"))}Km();Te(ml,bs);Te(ml,bs,"esm2017");/**
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
 */const Or="analytics",Wm="firebase_id",Qm="origin",Jm=60*1e3,Xm="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ps="https://www.googletagmanager.com/gtag/js";/**
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
 */const _e=new Nr("@firebase/analytics");/**
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
 */const Ym={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},we=new At("analytics","Analytics",Ym);/**
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
 */function Zm(n){if(!n.startsWith(Ps)){const e=we.create("invalid-gtag-resource",{gtagURL:n});return _e.warn(e.message),""}return n}function Ll(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function ey(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function ty(n,e){const t=ey("firebase-js-sdk-policy",{createScriptURL:Zm}),r=document.createElement("script"),s="".concat(Ps,"?l=").concat(n,"&id=").concat(e);r.src=t?t==null?void 0:t.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function ny(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function ry(n,e,t,r,s,o){const c=r[s];try{if(c)await e[c];else{const h=(await Ll(t)).find(f=>f.measurementId===s);h&&await e[h.appId]}}catch(u){_e.error(u)}n("config",s,o)}async function iy(n,e,t,r,s){try{let o=[];if(s&&s.send_to){let c=s.send_to;Array.isArray(c)||(c=[c]);const u=await Ll(t);for(const h of c){const f=u.find(A=>A.measurementId===h),I=f&&e[f.appId];if(I)o.push(I);else{o=[];break}}}o.length===0&&(o=Object.values(e)),await Promise.all(o),n("event",r,s||{})}catch(o){_e.error(o)}}function sy(n,e,t,r){async function s(o,...c){try{if(o==="event"){const[u,h]=c;await iy(n,e,t,u,h)}else if(o==="config"){const[u,h]=c;await ry(n,e,t,r,u,h)}else if(o==="consent"){const[u,h]=c;n("consent",u,h)}else if(o==="get"){const[u,h,f]=c;n("get",u,h,f)}else if(o==="set"){const[u]=c;n("set",u)}else n(o,...c)}catch(u){_e.error(u)}}return s}function oy(n,e,t,r,s){let o=function(...c){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=sy(o,n,e,t),{gtagCore:o,wrappedGtag:window[s]}}function ay(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(Ps)&&t.src.includes(n))return t;return null}/**
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
 */const cy=30,ly=1e3;class uy{constructor(e={},t=ly){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Ml=new uy;function hy(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function dy(n){var e;const{appId:t,apiKey:r}=n,s={method:"GET",headers:hy(r)},o=Xm.replace("{app-id}",t),c=await fetch(o,s);if(c.status!==200&&c.status!==304){let u="";try{const h=await c.json();!((e=h.error)===null||e===void 0)&&e.message&&(u=h.error.message)}catch(h){}throw we.create("config-fetch-failed",{httpStatus:c.status,responseMessage:u})}return c.json()}async function fy(n,e=Ml,t){const{appId:r,apiKey:s,measurementId:o}=n.options;if(!r)throw we.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:r};throw we.create("no-api-key")}const c=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new my;return setTimeout(async()=>{u.abort()},Jm),Vl({appId:r,apiKey:s,measurementId:o},c,u,e)}async function Vl(n,{throttleEndTimeMillis:e,backoffCount:t},r,s=Ml){var o;const{appId:c,measurementId:u}=n;try{await py(r,e)}catch(h){if(u)return _e.warn("Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ".concat(u,' provided in the "measurementId" field in the local Firebase config. [').concat(h==null?void 0:h.message,"]")),{appId:c,measurementId:u};throw h}try{const h=await dy(n);return s.deleteThrottleMetadata(c),h}catch(h){const f=h;if(!gy(f)){if(s.deleteThrottleMetadata(c),u)return _e.warn("Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ".concat(u,' provided in the "measurementId" field in the local Firebase config. [').concat(f==null?void 0:f.message,"]")),{appId:c,measurementId:u};throw h}const I=Number((o=f==null?void 0:f.customData)===null||o===void 0?void 0:o.httpStatus)===503?Mo(t,s.intervalMillis,cy):Mo(t,s.intervalMillis),A={throttleEndTimeMillis:Date.now()+I,backoffCount:t+1};return s.setThrottleMetadata(c,A),_e.debug("Calling attemptFetch again in ".concat(I," millis")),Vl(n,A,r,s)}}function py(n,e){return new Promise((t,r)=>{const s=Math.max(e-Date.now(),0),o=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(o),r(we.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function gy(n){if(!(n instanceof Ce)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class my{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function yy(n,e,t,r,s){if(s&&s.global){n("event",t,r);return}else{const o=await e,c=Object.assign(Object.assign({},r),{send_to:o});n("event",t,c)}}/**
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
 */async function _y(){if(Xa())try{await Ya()}catch(n){return _e.warn(we.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return _e.warn(we.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function vy(n,e,t,r,s,o,c){var u;const h=fy(n);h.then(C=>{t[C.measurementId]=C.appId,n.options.measurementId&&C.measurementId!==n.options.measurementId&&_e.warn("The measurement ID in the local Firebase config (".concat(n.options.measurementId,") does not match the measurement ID fetched from the server (").concat(C.measurementId,"). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config."))}).catch(C=>_e.error(C)),e.push(h);const f=_y().then(C=>{if(C)return r.getId()}),[I,A]=await Promise.all([h,f]);ay(o)||ty(o,I.measurementId),s("js",new Date);const S=(u=c==null?void 0:c.config)!==null&&u!==void 0?u:{};return S[Qm]="firebase",S.update=!0,A!=null&&(S[Wm]=A),s("config",I.measurementId,S),I.measurementId}/**
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
 */class Iy{constructor(e){this.app=e}_delete(){return delete wn[this.app.options.appId],Promise.resolve()}}let wn={},Va=[];const xa={};let Ai="dataLayer",Ey="gtag",Fa,xl,Ua=!1;function wy(){const n=[];if(Ja()&&n.push("This is a browser extension environment."),Wu()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,s)=>"(".concat(s+1,") ").concat(r)).join(" "),t=we.create("invalid-analytics-context",{errorInfo:e});_e.warn(t.message)}}function Ty(n,e,t){wy();const r=n.options.appId;if(!r)throw we.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)_e.warn('The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID '.concat(n.options.measurementId,' provided in the "measurementId" field in the local Firebase config.'));else throw we.create("no-api-key");if(wn[r]!=null)throw we.create("already-exists",{id:r});if(!Ua){ny(Ai);const{wrappedGtag:o,gtagCore:c}=oy(wn,Va,xa,Ai,Ey);xl=o,Fa=c,Ua=!0}return wn[r]=vy(n,Va,xa,e,Fa,Ai,t),new Iy(n)}function Ay(n=Qi()){n=at(n);const e=bt(n,Or);return e.isInitialized()?e.getImmediate():by(n)}function by(n,e={}){const t=bt(n,Or);if(t.isInitialized()){const s=t.getImmediate();if(An(e,t.getOptions()))return s;throw we.create("already-initialized")}return t.initialize({options:e})}function Sy(n,e,t,r){n=at(n),yy(xl,wn[n.app.options.appId],e,t,r).catch(s=>_e.error(s))}const Ba="@firebase/analytics",ja="0.10.8";function Ry(){De(new Re(Or,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return Ty(r,s,t)},"PUBLIC")),De(new Re("analytics-internal",n,"PRIVATE")),Te(Ba,ja),Te(Ba,ja,"esm2017");function n(e){try{const t=e.getProvider(Or).getImmediate();return{logEvent:(r,s,o)=>Sy(t,r,s,o)}}catch(t){throw we.create("interop-component-reg-failed",{reason:t})}}}Ry();const Fl={apiKey:void 0,authDomain:void 0,projectId:void 0,storageBucket:void 0,messagingSenderId:void 0,appId:void 0,measurementId:void 0},ks=nc(Fl),Ul=op(ks);am(ks);Ay(ks);window.addEventListener("online",async()=>{try{await cp(Ul),console.log("🔥 Firebase: Back online")}catch(n){console.error("Firebase network enable error:",n)}});window.addEventListener("offline",async()=>{try{await lp(Ul),console.log("🔥 Firebase: Offline mode")}catch(n){console.error("Firebase network disable error:",n)}});try{console.log("🔥 Firebase initialized successfully with project:",Fl.projectId)}catch(n){console.error("Firebase initialization error:",n)}const Os=Ou.API_BASE;console.log("API_BASE ->",Os||"(same-origin)");const Dt=[{name:"Sarah",comment:"🔥 Best ramen spot ever!",emoji:"🍜",avatar:"https://i.pravatar.cc/80?img=32"},{name:"James",comment:"💯 Always go for the sushi here",emoji:"🍣",avatar:"https://i.pravatar.cc/80?img=12"},{name:"Aisha",comment:"👌 Perfect comfort food when tired",emoji:"🍲",avatar:"https://i.pravatar.cc/80?img=58"}],Cy=[{food:{emoji:"🍜",name:"Tonkotsu Ramen"},friendMessage:"Warming and soothing — perfect for stressed vibes.",availabilityNote:"Try Koya Soho or Tonkotsu (open now)",culturalNote:"Ramen culture in London has exploded — Soho has great late-night bowls.",weatherNote:"Rainy/cold? Hot broth hits just right.",source:"local-fallback"},{food:{emoji:"🍣",name:"Sushi Set"},friendMessage:"Clean and fresh — light but satisfying.",availabilityNote:"Sushi Atelier or Kanada-Ya nearby",culturalNote:"Japanese spots cluster around Fitzrovia & Soho.",weatherNote:"Great choice when you want something not too heavy.",source:"local-fallback"},{food:{emoji:"🥙",name:"Mezze Plate"},friendMessage:"Shareable, bright flavors, and not heavy.",availabilityNote:"Check Arabica Borough or a local Levantine spot",culturalNote:"Londons Middle Eastern scene is strong — Borough & Edgware Road.",weatherNote:"Good in any weather; easy on the stomach.",source:"local-fallback"}],Py=6;let xt=JSON.parse(localStorage.getItem("vfied_recent")||"[]");function ky(n){n&&(xt=[n,...xt.filter(e=>e.toLowerCase()!==n.toLowerCase())].slice(0,Py),localStorage.setItem("vfied_recent",JSON.stringify(xt)))}let rt=[],kn={},Ki=[];document.addEventListener("DOMContentLoaded",()=>{Jy(),Qy(),Oy(),Gy(),xy(),Uy(),$y(),qy(),Gl(),console.log("🚀 VFIED unified main loaded")});function Oy(){const n=B("decide-button"),e=B("detect-mood-btn"),t=B("accept-btn"),r=B("try-again-btn"),s=B("insights-toggle");n&&n.addEventListener("click",xn),e&&e.addEventListener("click",Ky),t&&t.addEventListener("click",My),r&&r.addEventListener("click",Vy),s&&s.addEventListener("click",()=>{const h=B("insights-content");h.classList.contains("hidden")?(h.classList.remove("hidden"),s.textContent="🤖 Hide insights ↑"):(h.classList.add("hidden"),s.textContent="🤖 Why this choice? ↓")});const o=B("see-more-gems"),c=B("gems-modal"),u=B("gems-modal-close");o&&o.addEventListener("click",()=>{jy(),Zy(c)}),u&&u.addEventListener("click",()=>Ha(c)),c&&c.addEventListener("click",h=>{h.target===c&&Ha(c)})}function Dy(n,e=!0){try{const t=n||document.getElementById("decide-button");if(!t)return;t.disabled=!!e;const r=document.getElementById("button-icon"),s=document.getElementById("button-text");e?(r&&(r.textContent="⏳"),s&&(s.textContent="Thinking…")):(r&&(r.textContent="🎯"),s&&(s.textContent="DECIDE FOR ME"))}catch(t){console.warn("setThinking failed:",t)}}async function Ny(n){const e=await fetch("".concat(Os,"/v1/quick_decision"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!e.ok){const t=await e.text().catch(()=>"");throw new Error("[quick_decision] ".concat(e.status," ").concat(t))}return e.json()}function Ly(n){const e=Array.isArray(n==null?void 0:n.decisions)?n.decisions:[];if(!e.length)return null;const t=new Set(xt.map(o=>o.toLowerCase())),r=e.filter(o=>(o==null?void 0:o.name)&&!t.has(o.name.toLowerCase())),s=r.length?r[Math.floor(Math.random()*r.length)]:e[Math.floor(Math.random()*e.length)];return{food:{name:s.name,emoji:s.emoji||"🍽️"},friendMessage:s.explanation||"Solid local pick.",source:"quick"}}async function xn(){var e,t,r,s;const n=document.getElementById("decide-button");Dy(n,!0),Wy(),Tn("Analyzing your mood, weather, and local options...");try{const o=((t=(e=document.getElementById("mood-input"))==null?void 0:e.value)==null?void 0:t.trim())||"hungry",c=Array.from(document.querySelectorAll(".diet-chip.active")).map(f=>f.dataset.diet),u=await fetch("".concat(Os,"/v1/recommend"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({location:{city:"London",country:"United Kingdom",country_code:"GB"},mood_text:o,dietary:c,budget:"medium",menu_source:"global_database",recent_suggestions:xt})});if(!u.ok){const f=await u.text();throw new Error("HTTP ".concat(u.status,": ").concat(f))}const h=await u.json();if(h.success){const f=Si(h);bi(f),$a({timeSavedMin:3})}else throw new Error(h.error||"Recommendation failed")}catch(o){console.error("Decision error:",o);try{const u=((s=(r=document.getElementById("mood-input"))==null?void 0:r.value)==null?void 0:s.trim())||"hungry",h=Array.from(document.querySelectorAll(".diet-chip.active")).map(A=>A.dataset.diet),f=await Ny({location:{city:"London",country_code:"GB"},dietary:h,mood_text:u,recent_suggestions:xt}),I=Ly(f);if(I){const A=Si(I);bi(A),$a({timeSavedMin:2}),Tn("Using the fast shortlist while the main AI was busy.");return}}catch(u){console.warn("quick_decision fallback failed:",u.message)}qt("Server unavailable: ".concat(o.message),"warn");const c=Si(Yy(Cy));bi(c),Tn("Using offline suggestion (server unavailable)")}}function bi(n){var e,t,r;Xy("suggestion-result"),gt("result-emoji",((e=n.food)==null?void 0:e.emoji)||"🍽️"),gt("result-name",((t=n.food)==null?void 0:t.name)||"Something delicious"),gt("result-description",n.friendMessage||n.reasoning||"Perfect for your mood!"),gt("restaurant-info",n.availabilityNote||""),Ri("cultural-note",n.culturalNote?"<strong>🌍 Cultural insight</strong><br>".concat(n.culturalNote):""),Ri("personal-note",n.personalNote?"<strong>🧠 Personal note</strong><br>".concat(n.personalNote):""),Ri("weather-note",n.weatherNote?"<strong>🌤️ Weather</strong><br>".concat(n.weatherNote):""),Fy(n),Tn("🎉 Perfect match found! How does this sound?"),ky((r=n.food)==null?void 0:r.name)}function My(){Kl("suggestion-result"),Tn("🎉 Decision made! Ready for your next food adventure."),qt("✅ Enjoy your meal!","success")}function Vy(){Kl("suggestion-result"),xn()}function xy(){const n=B("friend-chips");n&&(n.innerHTML="",Dt.forEach(e=>{const t=document.createElement("button");t.className="friend-chip",t.innerHTML='\n      <img class="friend-avatar" src="'.concat(e.avatar,'" alt="').concat(zt(e.name),'" />\n      <span>').concat(e.emoji," <strong>").concat(zt(e.name),"</strong></span>\n    "),t.addEventListener("click",()=>Bl(e.name)),n.appendChild(t)}))}function Bl(n){const e=Dt.find(r=>r.name===n);if(!e)return;qt("💬 Asking ".concat(e.name,': "').concat(e.comment,'"'),"info");const t=B("mood-input");t&&(e.emoji==="🍜"?t.value="need something warming and comforting":e.emoji==="🍣"?t.value="feeling adventurous, want something fresh":t.value="need comfort food")}function Si(n){var r;const e=(((r=n.food)==null?void 0:r.name)||"").toLowerCase();let t=Dt[Math.floor(Math.random()*Dt.length)];if((e.includes("ramen")||e.includes("noodle"))&&(t=Dt[0]),(e.includes("sushi")||e.includes("japanese"))&&(t=Dt[1]),n.socialSignal={type:"friend",friend:t,message:"".concat(t.name,': "').concat(t.comment,'"')},rt.length){const s=rt[Math.floor(Math.random()*rt.length)];n.localSignal={type:"local_list",list:s,message:'Popular in "'.concat(s.name,'" (').concat(s.area,")")}}return n}function Fy(n){const e=B("social-signals");if(!e)return;let t="";n.socialSignal&&(t+='\n      <div class="social-signal friend-signal">\n        <span class="signal-icon">👥</span>\n        <span class="signal-text">'.concat(n.socialSignal.message,"</span>\n      </div>")),n.localSignal&&(t+='\n      <div class="social-signal local-signal">\n        <span class="signal-icon">📍</span>\n        <span class="signal-text">'.concat(n.localSignal.message,"</span>\n      </div>")),e.innerHTML=t}async function Uy(){try{rt=await(await fetch("/data/local_lists.json",{cache:"no-store"})).json()}catch(n){rt=[]}By()}function By(){const n=B("local-gems-grid");if(!n)return;const e=rt.slice(0,8);n.innerHTML="",e.forEach(t=>{const r=document.createElement("div");r.className="gem-card",r.innerHTML='\n      <div class="gem-emoji">'.concat(t.emoji,'</div>\n      <div class="gem-name">').concat(zt(t.name),'</div>\n      <div class="gem-area">').concat(zt(t.area),"</div>\n    "),r.addEventListener("click",()=>jl(t.name)),n.appendChild(r)})}function jl(n){const e=rt.find(r=>r.name===n);if(!e)return;const t=B("mood-input");t&&(t.value="want something from ".concat(e.name," list in ").concat(e.area)),xn()}function jy(){const n=B("gems-modal-list");n&&(n.innerHTML=rt.map(e=>'\n      <li>\n        <span style="font-size:18px;margin-right:6px;">'.concat(e.emoji,"</span>\n        <strong>").concat(e.name,'</strong> <span style="opacity:.8">• ').concat(e.area,"</span>\n      </li>")).join(""))}async function $y(){try{kn=await(await fetch("/data/travel_lists.json",{cache:"no-store"})).json()}catch(n){kn={}}Hy(),$l()}function Hy(){const n=B("travel-city-select");if(!n)return;const e=Object.keys(kn);n.innerHTML=e.map(t=>'<option value="'.concat(t,'">').concat(t,"</option>")).join(""),n.addEventListener("change",()=>$l())}function $l(){var r;const n=((r=B("travel-city-select"))==null?void 0:r.value)||Object.keys(kn)[0],e=(kn[n]||[]).slice(0,10),t=B("travel-grid");t&&(t.innerHTML="",e.forEach(s=>{const o=document.createElement("div");o.className="travel-card",o.innerHTML='\n      <div class="travel-emoji">'.concat(s.emoji,'</div>\n      <div class="travel-body">\n        <div class="travel-title">').concat(zt(s.name),'</div>\n        <div class="travel-note">').concat(zt(s.note||""),"</div>\n      </div>\n    "),o.addEventListener("click",()=>Hl(n,s.name)),t.appendChild(o)}))}function Hl(n,e){const t=B("mood-input");t&&(t.value="travel mode: try ".concat(e," in ").concat(n)),xn()}async function qy(){try{Ki=await(await fetch("/data/events.json",{cache:"no-store"})).json()}catch(n){Ki=[]}zy()}function zy(){const n=B("events-grid");n&&(n.innerHTML="",Ki.forEach(e=>{const t=document.createElement("div");t.className="event-card";const r=document.createElement("div");r.className="event-badge",r.textContent=e.emoji;const s=document.createElement("div");s.className="event-body";const o=document.createElement("div");o.className="event-title",o.textContent=e.title;const c=document.createElement("div");c.className="event-meta",c.textContent="".concat(e.date," • ").concat(e.area," • ").concat(e.price||"Free");const u=document.createElement("div");u.className="event-cta";const h=document.createElement("button");h.className="insights-toggle",h.textContent="Details",h.addEventListener("click",()=>ql(e.title));const f=document.createElement("button");f.className="insights-toggle",f.textContent="Directions",f.addEventListener("click",()=>zl(encodeURIComponent(e.map||e.title))),u.append(h,f),s.append(o,c,u),t.append(r,s),n.appendChild(t)}))}function ql(n){qt("🎪 ".concat(n,"\n(Integrate ticket link or detail view here)"),"info")}function zl(n){window.open("https://www.google.com/maps/search/?api=1&query=".concat(n),"_blank")}function Gy(){document.querySelectorAll(".tab-btn").forEach(n=>{n.addEventListener("click",()=>{var t;document.querySelectorAll(".tab-btn").forEach(r=>r.classList.remove("active")),n.classList.add("active");const e=n.dataset.tab;document.querySelectorAll(".tabpanel").forEach(r=>r.classList.add("hidden")),(t=B(e))==null||t.classList.remove("hidden")})})}function Ky(){var t;const n=B("mood-input");if(!((t=n==null?void 0:n.value)==null?void 0:t.trim()))return qt("🧠 Please enter your mood first!","warn");qt("🧠 Mood analyzed — using it in your next suggestion!","info"),xn()}function $a({timeSavedMin:n=2}={}){const e=localStorage.getItem("vfied_stats"),t=e?JSON.parse(e):{totalDecisions:0,timeSaved:0};t.totalDecisions+=1,t.timeSaved+=n,localStorage.setItem("vfied_stats",JSON.stringify(t)),Gl()}function Gl(){const n=localStorage.getItem("vfied_stats"),e=n?JSON.parse(n):{totalDecisions:0,timeSaved:0};gt("decisions-count",e.totalDecisions),gt("time-saved",e.timeSaved)}function Wy(){const n=B("suggestion-skeleton"),e=B("suggestion-result");n&&n.classList.remove("hidden"),e&&e.classList.add("hidden")}function Qy(){if(B("vfied-toast-host"))return;const n=document.createElement("div");n.id="vfied-toast-host",document.body.appendChild(n)}function qt(n,e="info"){const t=B("vfied-toast-host");if(!t)return console.log(n);const r=document.createElement("div");r.className="vfied-toast ".concat(e),r.textContent=n,t.appendChild(r),requestAnimationFrame(()=>r.classList.add("show")),setTimeout(()=>{r.classList.remove("show"),setTimeout(()=>t.removeChild(r),250)},2600)}function Jy(){if(document.getElementById("vfied-runtime-styles"))return;const n="\n  #vfied-toast-host {\n    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);\n    display: flex; flex-direction: column; gap: 8px; z-index: 9999; pointer-events: none;\n  }\n  .vfied-toast {\n    pointer-events: auto;\n    min-width: 240px; max-width: 92vw;\n    padding: 10px 14px; border-radius: 10px; backdrop-filter: blur(8px);\n    background: rgba(0,0,0,.65); color: #fff; font-weight: 600; font-size: 14px;\n    opacity: 0; transform: translateY(8px); transition: all .25s ease;\n    border: 1px solid rgba(255,255,255,.15);\n  }\n  .vfied-toast.show { opacity: 1; transform: translateY(0); }\n  .vfied-toast.success { background: rgba(34,197,94,.85); }\n  .vfied-toast.warn { background: rgba(245,158,11,.9); }\n  .vfied-toast.error { background: rgba(239,68,68,.9); }\n\n  .skeleton-card {\n    background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.18);\n    border-radius: 16px; padding: 18px; max-width: 420px; margin: 8px auto;\n  }\n  .sk-line {\n    height: 14px; margin: 10px 0;\n    background: linear-gradient(90deg, rgba(255,255,255,.15), rgba(255,255,255,.25), rgba(255,255,255,.15));\n    background-size: 200% 100%; animation: sk-shimmer 1.4s infinite;\n    border-radius: 8px;\n  }\n  .sk-emoji { height: 46px; width: 46px; border-radius: 50%; margin: 0 auto 10px; }\n  .sk-title { height: 18px; width: 70%; margin: 12px auto; }\n  .sk-sub { width: 90%; margin: 10px auto; }\n  .sk-sub.short { width: 60%; }\n  @keyframes sk-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }\n\n  /* Friend avatar chip (if your CSS doesn't already style it) */\n  .friend-chip { display:inline-flex; align-items:center; gap:8px; }\n  .friend-avatar { width:22px; height:22px; border-radius:50%; object-fit:cover; }\n  ",e=document.createElement("style");e.id="vfied-runtime-styles",e.textContent=n,document.head.appendChild(e)}function B(n){return document.getElementById(n)}function gt(n,e){const t=B(n);t&&(t.textContent=e)}function Ri(n,e){const t=B(n);t&&(t.innerHTML=e)}function Xy(n){const e=B(n);e&&e.classList.remove("hidden")}function Kl(n){const e=B(n);e&&e.classList.add("hidden")}function Tn(n){gt("context-info",n)}function Yy(n){return n[Math.floor(Math.random()*n.length)]}function zt(n){return String(n).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[e])}function Zy(n){n&&(n.setAttribute("aria-hidden","false"),n.classList.add("open"))}function Ha(n){n&&(n.setAttribute("aria-hidden","true"),n.classList.remove("open"))}window.VFIED={askFriend:Bl,exploreGem:jl,tryTravel:Hl,goEvent:ql,goMaps:zl};export{e_ as __vite_legacy_guard};
//# sourceMappingURL=index-Ce_EJmZz.js.map
