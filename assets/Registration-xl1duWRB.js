import{D as y,r as w,a as m,d as b,b as o,e as p,v as x,c as v,O as V,w as c,f as S,I as C,z as B,P as I,_ as R,L as k,l as u,C as E,g as N,T as f,M as A,Q as D,S as L}from"./main-JiuJrYlZ.js";import{E as P,a as T}from"./EyeIcon-DBsjFeDG.js";import{_ as d,u as $}from"./useMutation-2m7euteF.js";const h={class:"relative"},q={__name:"RegistrationForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(g,{emit:i}){const l=g,n=i,t=y({name:"",email:"",password:""}),a=w(!1),r=()=>{a.value=!a.value};return(_,e)=>(m(),b("form",{onSubmit:e[3]||(e[3]=B(s=>n("submit",I(t)),["prevent"]))},[o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Full Name",modelValue:t.name,"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),required:""},null,8,["modelValue"]),o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Email Address",placeholder:"email@gmail.com",type:"email",modelValue:t.email,"onUpdate:modelValue":e[1]||(e[1]=s=>t.email=s),autocomplete:"email",required:""},null,8,["modelValue"]),p("div",h,[o(d,{label:"Password",class:"lg:text-lg",type:a.value?"text":"password",modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=s=>t.password=s),autocomplete:"current-password",required:""},null,8,["type","modelValue"]),p("button",{onClick:r,type:"button",class:x(["absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity",a.value?"opacity-100":"opacity-50"])},[(m(),v(V(a.value?P:T)))],2)]),o(C,{class:"mt-8 lg:mt-10 w-full",variant:"gradient",type:"submit","is-loading":l.isLoading},{default:c(()=>e[4]||(e[4]=[S("Create Account")])),_:1},8,["is-loading"])],32))}},F={key:0,class:"text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold"},M={__name:"Registration",setup(g){const i=k(),{isLoading:l,error:n,mutation:t}=$({mutationFn:r=>A.register(r),onSuccess:()=>i.replace("/map")});function a(){console.log("It is a spinner!"),l.value=!0,D(),setTimeout(()=>{L(),l.value=!1,i.replace("/map")},3e3)}return(r,_)=>(m(),v(f,{name:"fade",appear:""},{default:c(()=>[p("div",null,[o(q,{onSubmit:a,"is-loading":u(l)},null,8,["is-loading"]),o(f,{name:"fade-slide"},{default:c(()=>[u(n)?(m(),b("div",F,E(u(n)),1)):N("",!0)]),_:1})])]),_:1}))}},Q=R(M,[["__scopeId","data-v-02785bd5"]]);export{Q as default};