import{z as y,r as w,a as m,d as b,b as o,e as p,n as x,c as _,K as V,w as c,f as S,I as B,t as C,L as E,_ as I,E as N,l as u,y as R,g as k,T as f,G as A,M as L,N as T}from"./main-CAHbyG9g.js";import{E as $,a as h}from"./EyeIcon-BepgTwgf.js";import{_ as d,u as q}from"./useMutation-hVDiCxkj.js";const D={class:"relative"},F={__name:"RegistrationForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(g,{emit:n}){const l=g,i=n,t=y({name:"",email:"",password:""}),a=w(!1),r=()=>{a.value=!a.value};return(v,e)=>(m(),b("form",{onSubmit:e[3]||(e[3]=C(s=>i("submit",E(t)),["prevent"]))},[o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Full Name",modelValue:t.name,"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),required:""},null,8,["modelValue"]),o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Email Address",placeholder:"email@gmail.com",type:"email",modelValue:t.email,"onUpdate:modelValue":e[1]||(e[1]=s=>t.email=s),autocomplete:"email",required:""},null,8,["modelValue"]),p("div",D,[o(d,{label:"Password",class:"lg:text-lg",type:a.value?"text":"password",modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=s=>t.password=s),autocomplete:"current-password",required:""},null,8,["type","modelValue"]),p("button",{onClick:r,type:"button",class:x(["absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity",a.value?"opacity-100":"opacity-50"])},[(m(),_(V(a.value?$:h)))],2)]),o(B,{class:"mt-8 lg:mt-10 w-full",variant:"gradient",type:"submit","is-loading":l.isLoading},{default:c(()=>e[4]||(e[4]=[S("Create Account")])),_:1},8,["is-loading"])],32))}},M={key:0,class:"text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold"},P={__name:"Registration",setup(g){const n=N(),{isLoading:l,error:i,mutation:t}=q({mutationFn:r=>A.register(r),onSuccess:()=>n.replace("/map")});function a(){console.log("It is a spinner!"),l.value=!0,L(),setTimeout(()=>{T(),l.value=!1,n.replace("/map")},3e3)}return(r,v)=>(m(),_(f,{name:"fade",appear:""},{default:c(()=>[p("div",null,[o(F,{onSubmit:a,"is-loading":u(l)},null,8,["is-loading"]),o(f,{name:"fade-slide"},{default:c(()=>[u(i)?(m(),b("div",M,R(u(i)),1)):k("",!0)]),_:1})])]),_:1}))}},K=I(P,[["__scopeId","data-v-02785bd5"]]);export{K as default};
