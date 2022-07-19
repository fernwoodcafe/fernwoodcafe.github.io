import{I as u,Q as d,Y as c,o as h,H as r,X as n,r as f,n as P,s as m,l as v,j as T}from"./index.5d30adf9.js";import{F as g}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.js";import{j as i,x as o}from"./formatMoney.0cf77808.c83e9a63.80c3045c.ce30408e.25d20a91.206f1e3b.js";var C=new Intl.NumberFormat("en-CA",{style:"percent"});const S=t=>isNaN(t)?"-":C.format(t),x=u({__name:"AgCheckboxEditor",props:{params:null},setup(t,{expose:a}){const s=d(t.params.value);return a({getValue:()=>s.value}),(l,p)=>c((r(),n("input",{type:"checkbox","onUpdate:modelValue":p[0]||(p[0]=e=>s.value=e)},null,512)),[[h,s.value]])}}),U=u({__name:"AgPercentEditor",props:{params:null},setup(t,{expose:a}){const s=d(t.params.value);return a({getValue:()=>s.value/100}),(l,p)=>c((r(),n("input",{type:"number","onUpdate:modelValue":p[0]||(p[0]=e=>s.value=e)},null,512)),[[f,s.value]])}}),_=.06,N=t=>{const a=t.hasPST?t.purchasePriceBeforeTax*(1+_):t.purchasePriceBeforeTax,s=t.purchaseQuantity*t.percentWaste,l=t.purchaseQuantity-s,p=a/l;return console.log("calculatePerUnitSupplyCost",JSON.stringify({hasPST:t.hasPST,purchasePriceBeforeTax:t.purchasePriceBeforeTax,costAfterPST:a,purchaseQuantity:t.purchaseQuantity,percentWaste:t.percentWaste,wasteQuantity:s,unwastedQuantity:l},void 0,2)),p},D=u({__name:"AgGridSuppliesComponent",props:{suppliesList:null},emits:["supplyUpdated","supplyDeleted"],setup(t,{emit:a}){const s=e=>a("supplyUpdated",e),l=e=>a("supplyDeleted",e),p=[{field:"supplyType",cellEditor:i,cellEditorParams:{options:["ingredient","packaging"].map(e=>({value:e,label:e}))}},{field:"supplyUnits",cellEditor:i,cellEditorParams:{options:["gram","litre","ounce","item"].map(e=>({value:e,label:e}))}},{field:"purchasePriceBeforeTax",headerName:"Purchase Price before Tax",valueFormatter:e=>o(e.value)},{field:"percentWaste",cellEditor:U,valueFormatter:e=>S(e.value)},{field:"hasPST",cellEditor:x},{field:"unitCost",headerName:"Unit Cost (Calculated)",editable:!1,valueGetter:({data:e})=>N(e),valueFormatter:e=>o(e.value)}];return(e,y)=>(r(),P(g,{gridData:t.suppliesList,gridColumns:["supplyName","supplyType","supplyUnits","purchaseQuantity","purchasePriceBeforeTax","percentWaste","hasPST","unitCost"],gridColumnDefs:p,onGridDataUpdate:s,onGridRowDelete:l},null,8,["gridData"]))}}),Q=m("h1",null,"Supplies",-1),L=u({__name:"SuppliesListView",props:{suppliesList:null,sendCommand:null},setup(t){const a=t,s=e=>a.sendCommand({type:"update_supply",payload:e}),l=e=>a.sendCommand({type:"delete_supply",payload:e}),p=()=>{a.sendCommand({type:"create_supply",payload:{uniqueId:crypto.randomUUID(),supplyUnits:"",supplyName:`New Supply ${a.suppliesList.items.length}`,supplyType:"ingredient",percentWaste:0,hasPST:!1,purchaseQuantity:0,purchasePriceBeforeTax:0}})};return(e,y)=>(r(),n(T,null,[Q,m("button",{onClick:p},"New Supply"),v(D,{suppliesList:t.suppliesList,onSupplyUpdated:s,onSupplyDeleted:l},null,8,["suppliesList"])],64))}});export{L as default};
