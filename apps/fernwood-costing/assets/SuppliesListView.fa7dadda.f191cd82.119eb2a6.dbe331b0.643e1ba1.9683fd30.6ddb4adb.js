import{P as u,o as d,r as c,j as h,J as r,t as n,k as P,l as f,s as m,d as v,c as C}from"./index.85b905c7.js";import{F as T}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.675c7fab.js";import{X as i,C as o}from"./formatMoney.0cf77808.c83e9a63.80c3045c.ce30408e.25d20a91.206f1e3b.e397ac6b.js";var g=new Intl.NumberFormat("en-CA",{style:"percent"});const S=a=>isNaN(a)?"-":g.format(a),x=u({__name:"AgCheckboxEditor",props:{params:null},setup(a,{expose:s}){const l=d(a.params.value);return s({getValue:()=>l.value}),(t,p)=>c((r(),n("input",{type:"checkbox","onUpdate:modelValue":p[0]||(p[0]=e=>l.value=e)},null,512)),[[h,l.value]])}}),U=u({__name:"AgPercentEditor",props:{params:null},setup(a,{expose:s}){const l=d(a.params.value);return s({getValue:()=>l.value/100}),(t,p)=>c((r(),n("input",{type:"number","onUpdate:modelValue":p[0]||(p[0]=e=>l.value=e)},null,512)),[[P,l.value]])}}),_=.06,N=a=>{const s=a.hasPST?a.purchasePriceBeforeTax*(1+_):a.purchasePriceBeforeTax,l=a.purchaseQuantity*a.percentWaste,t=a.purchaseQuantity-l,p=s/t;return console.log("calculatePerUnitSupplyCost",JSON.stringify({hasPST:a.hasPST,purchasePriceBeforeTax:a.purchasePriceBeforeTax,costAfterPST:s,purchaseQuantity:a.purchaseQuantity,percentWaste:a.percentWaste,wasteQuantity:l,unwastedQuantity:t},void 0,2)),p},D=u({__name:"AgGridSuppliesComponent",props:{suppliesList:null},emits:["supplyUpdated","supplyDeleted"],setup(a,{emit:s}){const l=e=>s("supplyUpdated",e),t=e=>s("supplyDeleted",e),p=[{field:"supplyType",cellEditor:i,cellEditorParams:{options:["ingredient","packaging"].map(e=>({value:e,label:e}))}},{field:"supplyUnits",cellEditor:i,cellEditorParams:{options:["gram","litre","ounce","item"].map(e=>({value:e,label:e}))}},{field:"purchasePriceBeforeTax",headerName:"Purchase Price before Tax",valueFormatter:e=>o(e.value)},{field:"percentWaste",cellEditor:U,valueFormatter:e=>S(e.value)},{field:"hasPST",cellEditor:x},{field:"unitCost",headerName:"Unit Cost (Calculated)",editable:!1,valueGetter:({data:e})=>N(e),valueFormatter:e=>o(e.value)}];return(e,y)=>(r(),f(T,{gridData:a.suppliesList,gridColumns:["supplyName","supplyType","supplyUnits","purchaseQuantity","purchasePriceBeforeTax","percentWaste","hasPST","unitCost"],gridColumnDefs:p,onGridDataUpdate:l,onGridRowDelete:t},null,8,["gridData"]))}}),b=m("h1",null,"Supplies",-1),w=u({__name:"SuppliesListView",props:{suppliesList:null,sendCommand:null},setup(a){const s=a,l=e=>s.sendCommand({type:"update_supply",payload:e}),t=e=>s.sendCommand({type:"delete_supply",payload:e}),p=()=>{s.sendCommand({type:"create_supply",payload:{uniqueId:crypto.randomUUID(),supplyUnits:"",supplyName:`New Supply ${s.suppliesList.items.length}`,supplyType:"ingredient",percentWaste:0,hasPST:!1,purchaseQuantity:0,purchasePriceBeforeTax:0}})};return(e,y)=>(r(),n(C,null,[b,m("button",{onClick:p},"New Supply"),v(D,{suppliesList:a.suppliesList,onSupplyUpdated:l,onSupplyDeleted:t},null,8,["suppliesList"])],64))}});export{w as default};
