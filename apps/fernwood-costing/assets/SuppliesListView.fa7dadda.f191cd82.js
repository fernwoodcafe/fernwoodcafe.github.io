import{v as u,M as d,F as c,H as h,S as n,k as f,j as v,s as m,l as T,T as P,A as r}from"./index.033f7a07.js";import{G as S}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.js";import{k as i,w as o}from"./formatMoney.0cf77808.c83e9a63.js";var g=new Intl.NumberFormat("en-CA",{style:"percent"});const C=a=>isNaN(a)?"-":g.format(a),x=u({__name:"AgCheckboxEditor",props:{params:null},setup(a,{expose:s}){const p=d(a.params.value);return s({getValue:()=>p.value}),(t,l)=>c((r(),n("input",{type:"checkbox","onUpdate:modelValue":l[0]||(l[0]=e=>p.value=e)},null,512)),[[h,p.value]])}}),U=u({__name:"AgPercentEditor",props:{params:null},setup(a,{expose:s}){const p=d(a.params.value);return s({getValue:()=>p.value/100}),(t,l)=>c((r(),n("input",{type:"number","onUpdate:modelValue":l[0]||(l[0]=e=>p.value=e)},null,512)),[[f,p.value]])}}),N=.06,_=a=>{const s=a.hasPST?a.purchasePriceBeforeTax*(1+N):a.purchasePriceBeforeTax,p=a.purchaseQuantity*a.percentWaste,t=a.purchaseQuantity-p,l=s/t;return console.log("calculatePerUnitSupplyCost",JSON.stringify({hasPST:a.hasPST,purchasePriceBeforeTax:a.purchasePriceBeforeTax,costAfterPST:s,purchaseQuantity:a.purchaseQuantity,percentWaste:a.percentWaste,wasteQuantity:p,unwastedQuantity:t},void 0,2)),l},b=u({__name:"AgGridSuppliesComponent",props:{suppliesList:null},emits:["supplyUpdated","supplyDeleted"],setup(a,{emit:s}){const p=e=>s("supplyUpdated",e),t=e=>s("supplyDeleted",e),l=[{field:"supplyType",cellEditor:i,cellEditorParams:{options:["ingredient","packaging"].map(e=>({value:e,label:e}))}},{field:"supplyUnits",cellEditor:i,cellEditorParams:{options:["gram","litre","ounce","item"].map(e=>({value:e,label:e}))}},{field:"purchasePriceBeforeTax",headerName:"Purchase Price before Tax",valueFormatter:e=>o(e.value)},{field:"percentWaste",cellEditor:U,valueFormatter:e=>C(e.value)},{field:"hasPST",cellEditor:x},{field:"unitCost",headerName:"Unit Cost (Calculated)",editable:!1,valueGetter:({data:e})=>_(e),valueFormatter:e=>o(e.value)}];return(e,y)=>(r(),v(S,{gridData:a.suppliesList,gridColumns:["supplyName","supplyType","supplyUnits","purchaseQuantity","purchasePriceBeforeTax","percentWaste","hasPST","unitCost"],gridColumnDefs:l,onGridDataUpdate:p,onGridRowDelete:t},null,8,["gridData"]))}}),D=m("h1",null,"Supplies",-1),L=u({__name:"SuppliesListView",props:{suppliesList:null,sendCommand:null},setup(a){const s=a,p=e=>s.sendCommand({type:"update_supply",payload:e}),t=e=>s.sendCommand({type:"delete_supply",payload:e}),l=()=>{s.sendCommand({type:"create_supply",payload:{uniqueId:crypto.randomUUID(),supplyUnits:"",supplyName:`New Supply ${s.suppliesList.items.length}`,supplyType:"ingredient",percentWaste:0,hasPST:!1,purchaseQuantity:0,purchasePriceBeforeTax:0}})};return(e,y)=>(r(),n(P,null,[D,m("button",{onClick:l},"New Supply"),T(b,{suppliesList:a.suppliesList,onSupplyUpdated:p,onSupplyDeleted:t},null,8,["suppliesList"])],64))}});export{L as default};
