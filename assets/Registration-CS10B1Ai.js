import{l as y,r as x,a as m,d as b,b as o,e as p,n as w,c as v,m as V,w as c,f as S,I as B,p as C,q as I,_ as R,s as k,u,t as E,g as N,T as f,v as q,x as A,y as T}from"./main-Dn5eM6Uh.js";import{_ as d,E as $,a as h,u as D}from"./useMutation-BmYpQ4ky.js";const F={class:"relative"},L={__name:"RegistrationForm",props:{isLoading:{default:!1,type:Boolean}},emits:["submit"],setup(g,{emit:n}){const l=g,i=n,t=y({name:"",email:"",password:""}),a=x(!1),r=()=>{a.value=!a.value};return(_,e)=>(m(),b("form",{onSubmit:e[3]||(e[3]=C(s=>i("submit",I(t)),["prevent"]))},[o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Full Name",modelValue:t.name,"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),required:""},null,8,["modelValue"]),o(d,{class:"mb-3 lg:mb-3 lg:text-lg",label:"Email Address",placeholder:"email@gmail.com",type:"email",modelValue:t.email,"onUpdate:modelValue":e[1]||(e[1]=s=>t.email=s),autocomplete:"email",required:""},null,8,["modelValue"]),p("div",F,[o(d,{label:"Password",class:"lg:text-lg",type:a.value?"text":"password",modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=s=>t.password=s),autocomplete:"current-password",required:""},null,8,["type","modelValue"]),p("button",{onClick:r,type:"button",class:w(["absolute bottom-[7px] lg:bottom-[9px] right-0 pr-3 flex items-center transition-opacity",a.value?"opacity-100":"opacity-50"])},[(m(),v(V(a.value?$:h)))],2)]),o(B,{class:"mt-8 lg:mt-10 w-full",variant:"gradient",type:"submit","is-loading":l.isLoading},{default:c(()=>e[4]||(e[4]=[S("Create Account")])),_:1},8,["is-loading"])],32))}},P={key:0,class:"text-red-500 -mb-6 lg:mt-2 lg:-mb-8 text-center font-semibold"},U={__name:"Registration",setup(g){const n=k(),{isLoading:l,error:i,mutation:t}=D({mutationFn:r=>q.register(r),onSuccess:()=>n.replace("/map")});function a(){console.log("It is a spinner!"),l.value=!0,A(),setTimeout(()=>{T(),l.value=!1,n.replace("/map")},3e3)}return(r,_)=>(m(),v(f,{name:"fade",appear:""},{default:c(()=>[p("div",null,[o(L,{onSubmit:a,"is-loading":u(l)},null,8,["is-loading"]),o(f,{name:"fade-slide"},{default:c(()=>[u(i)?(m(),b("div",P,E(u(i)),1)):N("",!0)]),_:1})])]),_:1}))}},O=R(U,[["__scopeId","data-v-02785bd5"]]);export{O as default};
