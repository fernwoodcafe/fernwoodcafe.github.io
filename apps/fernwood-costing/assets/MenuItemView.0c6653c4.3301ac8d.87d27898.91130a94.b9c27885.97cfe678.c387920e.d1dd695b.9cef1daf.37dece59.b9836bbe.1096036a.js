import{A as g,u as P,U as h,j as S,M as $,L as N,C,o as p,a as y,I as w,$ as M,b as q,O as Q,g as U,N as r,l as L,V as T,E as V,c as E}from"./index.096102b3.js";import{F as G}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.675c7fab.31a80f34.67f1413d.858b2485.81dacb2e.ffe31efd.js";import{P as K,g as _,C as k}from"./formatMoney.0cf77808.c83e9a63.80c3045c.ce30408e.25d20a91.206f1e3b.e397ac6b.6866ca48.7bd98579.2a17da16.7a8ecf4d.4f044aac.js";const x=g({__name:"AgGridMenuItemSuppliesComponent",props:{menuItem:null,suppliesList:null},emits:["menuItemSupplyUpdated","menuItemSupplyDeleted"],setup(t,{emit:n}){const l=t,c=e=>n("menuItemSupplyUpdated",e),I=e=>n("menuItemSupplyDeleted",e),i=P({items:l.menuItem.menuItemSupplies});h(l.menuItem,e=>{const s=new Set(i.items),o=new Set(e.menuItemSupplies),f=[...o].filter(d=>!s.has(d)),v=[...s].filter(d=>!o.has(d));i.items=i.items.filter(d=>!v.includes(d)).concat(f)});const m=[{field:"supplyDetails",cellEditor:K,cellEditorParams:{options:l.suppliesList.items.map(e=>({value:`${e.supplyName}`,label:`${e.supplyName}`}))},valueGetter:({data:e})=>{const s=l.suppliesList.items.find(f=>f.uniqueId==e.supplyUniqueId),o=_(s.purchasePriceBeforeTax/s.purchaseQuantity);return`${s.supplyName} @ ${o} per ${s.supplyUnits}`}},{field:"supplyQuantity",valueParser:e=>Number(e.newValue)},{field:"supplyCost",headerName:"Supply Cost (Calculated)",editable:!1,valueGetter:({data:e})=>{const s=l.suppliesList.items.find(o=>o.uniqueId==e.supplyUniqueId);return e.supplyQuantity*(s.purchasePriceBeforeTax/s.purchaseQuantity)},valueFormatter:e=>_(e.value)}];return(e,s)=>(S(),$(G,{gridData:i,gridColumns:["supplyDetails","supplyQuantity","supplyCost"],gridColumnDefs:m,onGridDataUpdate:c,onGridRowDelete:I},null,8,["gridData"]))}}),A=t=>(V("data-v-1706aa7e"),t=t(),E(),t),B=A(()=>p("option",{disabled:"",value:null},"Please select one",-1)),F=["value"],O=["enabled"],j=g({__name:"FrcSelectOption",props:{title:null,options:null,optionKey:null},emits:["submitSelect"],setup(t,{emit:n}){const l=N(null),c=()=>{n("submitSelect",l.value),l.value=null};return(I,i)=>(S(),C("fieldset",null,[p("label",null,y(t.title),1),w(p("select",{"onUpdate:modelValue":i[0]||(i[0]=m=>l.value=m)},[B,(S(!0),C(q,null,Q(t.options,m=>(S(),C("option",{value:m},y(m[t.optionKey]),9,F))),256))],512),[[M,l.value]]),p("button",{enabled:l.value!=null,onClick:c}," Add "+y(l.value?.[t.optionKey]),9,O)]))}}),b=k(j,[["__scopeId","data-v-1706aa7e"]]),R=p("dt",null,"Total Cost",-1),H=p("dt",null,"Recommended Menu Price @ 3.5",-1),W=g({__name:"MenuItemView",props:{menuItem:null,suppliesList:null,sendCommand:null},setup(t){const n=t,l=n.suppliesList.items.filter(u=>u.supplyType.toLocaleLowerCase()=="ingredient");N({});const c=n.suppliesList.items.filter(u=>u.supplyType.toLocaleLowerCase()=="packaging"),I=u=>{const a={uniqueId:crypto.randomUUID(),menuItemUniqueId:n.menuItem.uniqueId,supplyUniqueId:u.uniqueId,supplyName:u.supplyName};n.sendCommand({type:"add_supply_to_menu_item",payload:a})},i=u=>I(u),m=u=>I(u),e=u=>n.sendCommand({type:"update_supply_on_menu_item",payload:u}),s=u=>n.sendCommand({type:"remove_supply_from_menu_item",payload:u}),o=()=>n.menuItem.menuItemSupplies.map(u=>{const a=n.suppliesList.items.find(D=>D.uniqueId==u.supplyUniqueId);return{unitPrice:a==null?0:a.purchasePriceBeforeTax/a.purchaseQuantity,...u}}).reduce((u,a)=>u+a.supplyQuantity*a.unitPrice,0),f=()=>v.value*3.5,v=U(()=>o()),d=U(()=>f());return(u,a)=>(S(),C(q,null,[p("h2",null,y(t.menuItem.menuItemName),1),p("dl",null,[p("div",null,[R,p("dd",null,y(r(_)(r(v))),1)]),p("div",null,[H,p("dd",null,y(r(_)(r(d))),1)])]),p("form",{onSubmit:a[0]||(a[0]=T(()=>{},["prevent"]))},[L(b,{title:"Ingredient",options:r(l),optionKey:"supplyName",onSubmitSelect:i},null,8,["options"]),L(b,{title:"Packaging",options:r(c),optionKey:"supplyName",onSubmitSelect:m},null,8,["options"])],32),L(x,{menuItem:t.menuItem,suppliesList:t.suppliesList,onMenuItemSupplyUpdated:e,onMenuItemSupplyDeleted:s},null,8,["menuItem","suppliesList"])],64))}});export{W as default};
