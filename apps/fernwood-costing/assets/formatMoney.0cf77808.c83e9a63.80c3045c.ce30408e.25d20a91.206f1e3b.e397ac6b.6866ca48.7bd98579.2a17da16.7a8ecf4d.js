import{A as n,S as c,C as p,I as v,_ as l,w as r,P as m,j as d,x as i,b as _,s as A,a as b}from"./index.f2722804.js";import"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.675c7fab.31a80f34.67f1413d.858b2485.81dacb2e.js";const f=e=>(i("data-v-86ad9c0e"),e=e(),_(),e),w=f(()=>A("option",{disabled:"",value:{}},"Please select one",-1)),x=["value"],S=n({__name:"AgSelectEditor",props:{params:null},setup(e,{expose:t}){const a=c(e.params.value);return t({getValue:()=>a.value}),(u,s)=>p((l(),r("select",{"onUpdate:modelValue":s[0]||(s[0]=o=>a.value=o)},[w,(l(!0),r(m,null,d(e.params.options,o=>(l(),r("option",{value:o.value},b(o.label),9,x))),256))],512)),[[v,a.value]])}}),C=(e,t)=>{const a=e.__vccOpts||e;for(const[u,s]of t)a[u]=s;return a},P=C(S,[["__scopeId","data-v-86ad9c0e"]]);var I=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"});const g=e=>isNaN(e)?"-":I.format(e);export{P as N,g as S,C as w};
