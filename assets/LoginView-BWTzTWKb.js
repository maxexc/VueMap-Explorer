import{M as w,r as y,a as o,d as v,b as r,e as u,E as x,c as d,C as V,w as c,f as S,I as k,J as B,Z as C,_ as E,V as I,T as g,R as L,l as s,g as _,D as h}from"./main-DNzSAs6Z.js";import{_ as b,u as D}from"./useMutation-BaGb2dF8.js";import{E as N,a as $}from"./EyeIcon-CYsEejpN.js";const M={class:"relative"},P={__name:"LoginForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(p,{emit:m}){const l=p,i=m,a=w({email:"",password:""}),e=y(!1),f=()=>{e.value=!e.value};return(F,t)=>(o(),v("form",{onSubmit:t[2]||(t[2]=B(n=>i("submit",C(a)),["prevent"]))},[r(b,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Email Address",placeholder:"email@gmail.com",type:"email",modelValue:a.email,"onUpdate:modelValue":t[0]||(t[0]=n=>a.email=n),autocomplete:"email",required:""},null,8,["modelValue"]),u("div",M,[r(b,{label:"Password",class:"lg:text-lg",type:e.value?"text":"password",modelValue:a.password,"onUpdate:modelValue":t[1]||(t[1]=n=>a.password=n),autocomplete:"current-password",required:""},null,8,["type","modelValue"]),u("button",{onClick:f,type:"button",class:x(["absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity",e.value?"opacity-100":"opacity-50"])},[(o(),d(V(e.value?N:$)))],2)]),r(k,{class:"mt-8 lg:mt-9 w-full",variant:"gradient",type:"submit","is-loading":l.isLoading},{default:c(()=>t[3]||(t[3]=[S("Sign In")])),_:1},8,["is-loading"])],32))}},R={class:"relative"},T={key:0,class:"text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold"},q={__name:"LoginView",setup(p){const m=I(),{isLoading:l,error:i,mutation:a}=D({mutationFn:e=>L.login(e),onSuccess:()=>m.push("/map")});return(e,f)=>(o(),d(g,{name:"fade",appear:""},{default:c(()=>[u("div",R,[s(l)?_("",!0):(o(),d(P,{key:0,onSubmit:s(a),"is-loading":s(l),class:"transition-all"},null,8,["onSubmit","is-loading"])),r(g,{name:"fade-slide"},{default:c(()=>[s(i)?(o(),v("div",T,h(s(i)),1)):_("",!0)]),_:1})])]),_:1}))}},J=E(q,[["__scopeId","data-v-f5b3546f"]]);export{J as default};
