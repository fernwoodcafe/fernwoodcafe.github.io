import{P as U,u as D,U as N,s as S,d as w,c as q,i as _,o as p,a as c,b as Q,m as $,e as P,f as T,g as b,q as r,l as L,h as V,j as x,k as G}from"./index.e470cb4d.js";import{F as K}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.675c7fab.31a80f34.js";import{J as M,V as C,x as k}from"./formatMoney.0cf77808.c83e9a63.80c3045c.ce30408e.25d20a91.206f1e3b.e397ac6b.6866ca48.js";const B=U({__name:"AgGridMenuItemSuppliesComponent",props:{menuItem:null,suppliesList:null},emits:["menuItemSupplyUpdated","menuItemSupplyDeleted"],setup(t,{emit:n}){const l=t,y=e=>n("menuItemSupplyUpdated",e),I=e=>n("menuItemSupplyDeleted",e),i=D({items:l.menuItem.menuItemSupplies});N(l.menuItem,e=>{const s=new Set(i.items),o=new Set(e.menuItemSupplies),f=[...o].filter(d=>!s.has(d)),v=[...s].filter(d=>!o.has(d));i.items=i.items.filter(d=>!v.includes(d)).concat(f)});const m=[{field:"supplyDetails",cellEditor:M,cellEditorParams:{options:l.suppliesList.items.map(e=>({value:`${e.supplyName}`,label:`${e.supplyName}`}))},valueGetter:({data:e})=>{const s=l.suppliesList.items.find(f=>f.uniqueId==e.supplyUniqueId),o=C(s.purchasePriceBeforeTax/s.purchaseQuantity);return`${s.supplyName} @ ${o} per ${s.supplyUnits}`}},{field:"supplyQuantity",valueParser:e=>Number(e.newValue)},{field:"supplyCost",headerName:"Supply Cost (Calculated)",editable:!1,valueGetter:({data:e})=>{const s=l.suppliesList.items.find(o=>o.uniqueId==e.supplyUniqueId);return e.supplyQuantity*(s.purchasePriceBeforeTax/s.purchaseQuantity)},valueFormatter:e=>C(e.value)}];return(e,s)=>(S(),w(K,{gridData:i,gridColumns:["supplyDetails","supplyQuantity","supplyCost"],gridColumnDefs:m,onGridDataUpdate:y,onGridRowDelete:I},null,8,["gridData"]))}}),F=t=>(x("data-v-1706aa7e"),t=t(),G(),t),A=F(()=>p("option",{disabled:"",value:null},"Please select one",-1)),E=["value"],J=["enabled"],R=U({__name:"FrcSelectOption",props:{title:null,options:null,optionKey:null},emits:["submitSelect"],setup(t,{emit:n}){const l=q(null),y=()=>{n("submitSelect",l.value),l.value=null};return(I,i)=>(S(),_("fieldset",null,[p("label",null,c(t.title),1),Q(p("select",{"onUpdate:modelValue":i[0]||(i[0]=m=>l.value=m)},[A,(S(!0),_(P,null,T(t.options,m=>(S(),_("option",{value:m},c(m[t.optionKey]),9,E))),256))],512),[[$,l.value]]),p("button",{enabled:l.value!=null,onClick:y}," Add "+c(l.value?.[t.optionKey]),9,J)]))}}),g=k(R,[["__scopeId","data-v-1706aa7e"]]),O=p("dt",null,"Total Cost",-1),j=p("dt",null,"Recommended Menu Price @ 3.5",-1),H=U({__name:"MenuItemView",props:{menuItem:null,suppliesList:null,sendCommand:null},setup(t){const n=t,l=n.suppliesList.items.filter(u=>u.supplyType.toLocaleLowerCase()=="ingredient");q({});const y=n.suppliesList.items.filter(u=>u.supplyType.toLocaleLowerCase()=="packaging"),I=u=>{const a={uniqueId:crypto.randomUUID(),menuItemUniqueId:n.menuItem.uniqueId,supplyUniqueId:u.uniqueId,supplyName:u.supplyName};n.sendCommand({type:"add_supply_to_menu_item",payload:a})},i=u=>I(u),m=u=>I(u),e=u=>n.sendCommand({type:"update_supply_on_menu_item",payload:u}),s=u=>n.sendCommand({type:"remove_supply_from_menu_item",payload:u}),o=()=>n.menuItem.menuItemSupplies.map(u=>{const a=n.suppliesList.items.find(h=>h.uniqueId==u.supplyUniqueId);return{unitPrice:a==null?0:a.purchasePriceBeforeTax/a.purchaseQuantity,...u}}).reduce((u,a)=>u+a.supplyQuantity*a.unitPrice,0),f=()=>v.value*3.5,v=b(()=>o()),d=b(()=>f());return(u,a)=>(S(),_(P,null,[p("h2",null,c(t.menuItem.menuItemName),1),p("dl",null,[p("div",null,[O,p("dd",null,c(r(C)(r(v))),1)]),p("div",null,[j,p("dd",null,c(r(C)(r(d))),1)])]),p("form",{onSubmit:a[0]||(a[0]=V(()=>{},["prevent"]))},[L(g,{title:"Ingredient",options:r(l),optionKey:"supplyName",onSubmitSelect:i},null,8,["options"]),L(g,{title:"Packaging",options:r(y),optionKey:"supplyName",onSubmitSelect:m},null,8,["options"])],32),L(B,{menuItem:t.menuItem,suppliesList:t.suppliesList,onMenuItemSupplyUpdated:e,onMenuItemSupplyDeleted:s},null,8,["menuItem","suppliesList"])],64))}});export{H as default};
