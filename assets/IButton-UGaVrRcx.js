import{_ as l,e as t,R as d,o as c,c as u,w as p,i as m,x as f,k as v}from"./index-CMoUXXcZ.js";const _={__name:"IButton",props:{variant:{default:"primary",type:String,validator:a=>["primary","gradient","outlined"].includes(a)},to:String},setup(a){const e=a,n=t(()=>e.variant==="gradient"?"bg-gradient-to-r from-secondary to-primary":"bg-secondary"),o=t(()=>!!e.to),r=t(()=>o.value?d:"button"),s=t(()=>o.value?e.to:null);return(i,g)=>(c(),u(v(r),{is:r.value,to:s.value,class:f(["rounded-xl py-3 px-10 font-bold tracking-wider text-white overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg active:scale-95",n.value])},{default:p(()=>[m(i.$slots,"default",{},void 0,!0)]),_:3},8,["is","to","class"]))}},h=l(_,[["__scopeId","data-v-80718f25"]]);export{h as I};
