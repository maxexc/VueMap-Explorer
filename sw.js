if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AuthView-BgWiEdU6.js",revision:null},{url:"assets/BaseLayout-CjiGU9Qp.js",revision:null},{url:"assets/EyeIcon-0y8cOqaV.js",revision:null},{url:"assets/GreetingView-D12QG1qY.css",revision:null},{url:"assets/GreetingView-DGFP-zXR.js",revision:null},{url:"assets/HomepageView-CykHz68A.css",revision:null},{url:"assets/HomepageView-nQcCeSBI.js",revision:null},{url:"assets/LoginView-B5C70XIV.js",revision:null},{url:"assets/LoginView-DR8GpR-K.css",revision:null},{url:"assets/main-CTg6CeyI.js",revision:null},{url:"assets/main-uKqBaN0_.css",revision:null},{url:"assets/Registration-8jYLJAju.js",revision:null},{url:"assets/Registration-KVNAHI-D.css",revision:null},{url:"assets/useMutation-DflI9I-L.js",revision:null},{url:"index.html",revision:"4f736a3cebacf645efecdde6d6da16d7"},{url:"registerSW.js",revision:"182dd87becbd6545e78af8bb70527d71"},{url:"apple-touch-icon.png",revision:"7e4350fba9d290f60c9ed4e2f73ab40b"},{url:"img/android-chrome-192x192.png",revision:"fa1754c9f141eb2d5ee824a94f34c242"},{url:"img/android-chrome-512x512.png",revision:"0654afbcd5c55689048313b5d24c633a"},{url:"manifest.webmanifest",revision:"fb7f37a2bc47360353c943f36f285494"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
