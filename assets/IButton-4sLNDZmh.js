import{e as t,R as l,o as d,c,w as u,i as p,x as m,k as f}from"./index-BjjtZvya.js";import{_ as v}from"./_plugin-vue_export-helper-DlAUqK2U.js";const _={__name:"IButton",props:{variant:{default:"primary",type:String,validator:o=>["primary","gradient","outlined"].includes(o)},to:String},setup(o){const a=o,n=t(()=>a.variant==="gradient"?"bg-gradient-to-r from-secondary to-primary":"bg-secondary"),e=t(()=>!!a.to),r=t(()=>e.value?l:"button"),s=t(()=>e.value?a.to:null);return(i,g)=>(d(),c(f(r),{is:r.value,to:s.value,class:m(["rounded-xl py-3 px-10 font-bold tracking-wider text-white overflow-hidden shadow-md transform transition duration-200 hover:shadow-lg active:scale-95",n.value])},{default:u(()=>[p(i.$slots,"default",{},void 0,!0)]),_:3},8,["is","to","class"]))}},k=v(_,[["__scopeId","data-v-80718f25"]]);export{k as I};
