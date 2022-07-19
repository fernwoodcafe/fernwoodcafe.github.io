import{F as I}from"./AgGridComponent.vue_vue_type_style_index_0_lang.fa2b8661.39d83dec.a6d67679.57858042.68162d1f.2657f579.675c7fab.js";import{P as l,m as r,J as o,l as d,Z as c,L as _,a as L,s as p,o as g,t as C,d as D,c as M}from"./index.85b905c7.js";const y=l({__name:"AgRouterLinkRenderer",props:{params:null},setup(t){const e=t;return console.log("params",e.params),(n,a)=>{const u=r("RouterLink");return o(),d(u,{to:`/menu-items/${e.params.value}`},{default:c(()=>[_(L(e.params.value),1)]),_:1},8,["to"])}}}),f=l({__name:"AgGridMenuItemsComponent",props:{menuItemsList:null},emits:["menuItemUpdated","menuItemDeleted"],setup(t,{emit:e}){const n=m=>e("menuItemUpdated",m),a=m=>e("menuItemDeleted",m),u=[{field:"menuItemName",cellRenderer:y}];return(m,s)=>(o(),d(I,{gridData:t.menuItemsList,gridColumns:["menuItemName"],gridColumnDefs:u,onGridDataUpdate:n,onGridRowDelete:a},null,8,["gridData"]))}}),w=p("h1",null,"Menu Items",-1),N=l({__name:"MenuItemsListView",props:{menuItemsList:null,sendCommand:null},setup(t){const e=t,n=g(""),a=()=>{console.log("onClickNewMenuItem",n),e.sendCommand({type:"create_menu_item",payload:{uniqueId:crypto.randomUUID(),menuItemName:`New Menu Item ${e.menuItemsList.items.length}`,menuItemSupplies:[]}})},u=s=>{console.log("onMenuItemUpdated",n),e.sendCommand({type:"update_menu_item",payload:s})},m=s=>{console.log("onMenuItemDeleted",n),e.sendCommand({type:"delete_menu_item",payload:s})};return(s,R)=>{const i=r("RouterView");return o(),C(M,null,[w,p("button",{onClick:a},"New Menu Item"),D(f,{menuItemsList:t.menuItemsList,onMenuItemUpdated:u,onMenuItemDeleted:m},null,8,["menuItemsList"]),(o(),d(i,{key:s.$route.fullPath}))],64)}}});export{N as default};
