if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const u=s=>i(s,l),t={module:{uri:l},exports:o,require:u};e[l]=Promise.all(n.map((s=>t[s]||u(s)))).then((s=>(r(...s),o)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AuthView-CWPE7bjA.js",revision:null},{url:"assets/BaseLayout-BQBhDKvr.js",revision:null},{url:"assets/EyeIcon-L1Q_YuuA.js",revision:null},{url:"assets/GreetingView-CfJDTfsp.js",revision:null},{url:"assets/GreetingView-D12QG1qY.css",revision:null},{url:"assets/HomepageView-8GqsbUo8.js",revision:null},{url:"assets/HomepageView-8upX5h2_.css",revision:null},{url:"assets/LoginView-BVjTTBTi.js",revision:null},{url:"assets/LoginView-DR8GpR-K.css",revision:null},{url:"assets/main-BByDkrXG.js",revision:null},{url:"assets/main-DmgA5snD.css",revision:null},{url:"assets/Registration-DuUvE2RL.js",revision:null},{url:"assets/Registration-KVNAHI-D.css",revision:null},{url:"assets/useMutation-BiXsYwIX.js",revision:null},{url:"index.html",revision:"d820768daf9fb7118f25d39c3b301e10"},{url:"registerSW.js",revision:"182dd87becbd6545e78af8bb70527d71"},{url:"apple-touch-icon.png",revision:"7e4350fba9d290f60c9ed4e2f73ab40b"},{url:"img/android-chrome-192x192.png",revision:"fa1754c9f141eb2d5ee824a94f34c242"},{url:"img/android-chrome-512x512.png",revision:"0654afbcd5c55689048313b5d24c633a"},{url:"manifest.webmanifest",revision:"fb7f37a2bc47360353c943f36f285494"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
