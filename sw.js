if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AuthView--q1tKfq6.js",revision:null},{url:"assets/BaseLayout-DZvFx2yb.js",revision:null},{url:"assets/EyeIcon-sc6rrMel.js",revision:null},{url:"assets/GreetingView-D12QG1qY.css",revision:null},{url:"assets/GreetingView-DdNhe_cR.js",revision:null},{url:"assets/HomepageView-DUzBDWfg.js",revision:null},{url:"assets/HomepageView-jTulhEN_.css",revision:null},{url:"assets/LoginView-DBw69D1J.js",revision:null},{url:"assets/LoginView-DR8GpR-K.css",revision:null},{url:"assets/main-BZqQvxZK.js",revision:null},{url:"assets/main-X7SQh58n.css",revision:null},{url:"assets/Registration-Byg1HLYS.js",revision:null},{url:"assets/Registration-KVNAHI-D.css",revision:null},{url:"assets/useMutation-BMiEUm4g.js",revision:null},{url:"index.html",revision:"c1440926efe2ddf66e79220d4185700c"},{url:"registerSW.js",revision:"182dd87becbd6545e78af8bb70527d71"},{url:"apple-touch-icon.png",revision:"7e4350fba9d290f60c9ed4e2f73ab40b"},{url:"img/android-chrome-192x192.png",revision:"fa1754c9f141eb2d5ee824a94f34c242"},{url:"img/android-chrome-512x512.png",revision:"0654afbcd5c55689048313b5d24c633a"},{url:"manifest.webmanifest",revision:"9120a260b7284a2464a605031b0f0252"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
