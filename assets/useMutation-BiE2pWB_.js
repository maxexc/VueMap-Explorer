import{r as n,H as m,J as c}from"./main-CPLNMhzW.js";const g=({mutationFn:f,onSuccess:t,onError:r})=>{const a=n(),l=n(!1),e=n(null);return{data:a,isLoading:l,error:e,mutation:async(...v)=>{var o,u,i,p;l.value=!0,m();try{a.value=await f(...v),e.value=null,t==null||t(a)}catch(s){a.value=null;const d=((u=(o=s.response)==null?void 0:o.data)==null?void 0:u.error)||((p=(i=s.response)==null?void 0:i.data)==null?void 0:p.message);e.value=d||"Oops, App took a coffe break!",console.error("Error:",s),r==null||r(e)}finally{l.value=!1,c()}}}};export{g as u};
