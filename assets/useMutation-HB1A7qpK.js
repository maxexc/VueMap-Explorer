import{h as i,a as v,d as y,e as b,C as h,c as k,m as _,O as w,r as c,Q as S,S as V}from"./main-CHpESDCB.js";const B={class:"w-full text-border"},I={class:"block"},O={class:"block text-xs px-3 mb-0.5 lg:mb-1"},g="w-full text-sm rounded-[4px] border-borderInput border-[1px] py-2 px-3 appearance-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-white",C=Object.assign({inheritAttrs:!1},{__name:"IInput",props:{modelValue:String,label:String,placeholder:String,type:{default:"text",type:String}},emits:["update:modelValue"],setup(l,{emit:r}){const e=l,t=r,a=i(()=>e.type==="textarea"),s=i(()=>a.value?g+" resize-none":g),d=i(()=>a.value?"textarea":"input");return(n,o)=>(v(),y("div",B,[b("label",I,[b("span",O,h(e.label),1),(v(),k(w(d.value),_({rows:"3",class:s.value},{...n.$props,...n.$attrs},{value:l.modelValue,onInput:o[0]||(o[0]=u=>t("update:modelValue",u.target.value))}),null,16,["class","value"]))])]))}}),D=({mutationFn:l,onSuccess:r,onError:e})=>{const t=c(),a=c(!1),s=c(null);return{data:t,isLoading:a,error:s,mutation:async(...n)=>{var o,u,m,f;a.value=!0,S();try{t.value=await l(...n),s.value=null,r==null||r(t)}catch(p){t.value=null;const x=((u=(o=p.response)==null?void 0:o.data)==null?void 0:u.error)||((f=(m=p.response)==null?void 0:m.data)==null?void 0:f.message);s.value=x||"Oops, App took a coffe break!",console.error("Error:",p),e==null||e(s)}finally{a.value=!1,V()}}}};export{C as _,D as u};
