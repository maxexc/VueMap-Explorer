import{z as w,r as y,a as o,d as v,b as r,e as u,A as x,c as d,B as V,w as c,f as S,I as B,C as k,D as C,_ as I,q as L,l as s,g as f,x as h,T as _,s as E}from"./main-D6F667nY.js";import{_ as b,E as D,a as N}from"./EyeIcon-BlO1F0-j.js";import{u as $}from"./useMutation-YwnQLcba.js";const q={class:"relative"},P={__name:"LoginForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(p,{emit:m}){const l=p,i=m,a=w({email:"",password:""}),e=y(!1),g=()=>{e.value=!e.value};return(F,t)=>(o(),v("form",{onSubmit:t[2]||(t[2]=k(n=>i("submit",C(a)),["prevent"]))},[r(b,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Email Address",placeholder:"email@gmail.com",type:"email",modelValue:a.email,"onUpdate:modelValue":t[0]||(t[0]=n=>a.email=n),autocomplete:"email",required:""},null,8,["modelValue"]),u("div",q,[r(b,{label:"Password",class:"lg:text-lg",type:e.value?"text":"password",modelValue:a.password,"onUpdate:modelValue":t[1]||(t[1]=n=>a.password=n),autocomplete:"current-password",required:""},null,8,["type","modelValue"]),u("button",{onClick:g,type:"button",class:x(["absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity",e.value?"opacity-100":"opacity-50"])},[(o(),d(V(e.value?D:N)))],2)]),r(B,{class:"mt-8 lg:mt-9 w-full",variant:"gradient",type:"submit","is-loading":l.isLoading},{default:c(()=>t[3]||(t[3]=[S("Sign In")])),_:1},8,["is-loading"])],32))}},T={class:"relative"},z={key:0,class:"text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold"},A={__name:"LoginView",setup(p){const m=L(),{isLoading:l,error:i,mutation:a}=$({mutationFn:e=>E.login(e),onSuccess:()=>m.push("/map")});return(e,g)=>(o(),d(_,{name:"fade",appear:""},{default:c(()=>[u("div",T,[s(l)?f("",!0):(o(),d(P,{key:0,onSubmit:s(a),"is-loading":s(l),class:"transition-all"},null,8,["onSubmit","is-loading"])),r(_,{name:"fade-slide"},{default:c(()=>[s(i)?(o(),v("div",z,h(s(i)),1)):f("",!0)]),_:1})])]),_:1}))}},O=I(A,[["__scopeId","data-v-c86532fc"]]);export{O as default};
