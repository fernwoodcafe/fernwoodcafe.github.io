import setupDB from "@/data/indexedDB-setup";
import MenuItemRepo from "@/data/MenuItemRepo";
import SuppliesRepo from "@/data/SuppliesRepo";
import { createRouter, createWebHistory } from "vue-router";

const db = await setupDB();

const menuItemRepo = MenuItemRepo(db);
const menuItemList = await menuItemRepo.select();

const suppliesRepo = SuppliesRepo(db);
const suppliesList = await suppliesRepo.select();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/supplies",
    },
    {
      path: "/supplies",
      name: "supplies",
      component: () => import("../views/SuppliesListView.vue"),
      props: {
        suppliesList,
        updateSupply: suppliesRepo.update,
        insertSupply: suppliesRepo.insert,
      },
    },
    {
      path: "/menu-items",
      name: "menuItems",
      component: () => import("../views/MenuItemListView.vue"),
      props: {
        menuItemList: menuItemList,
      },
    },
  ],
});

const menuItemRoutes = menuItemList.items.map((menuItem) => ({
  path: `/menuItems/${menuItem.menuItemId}`,
  component: () => import("../views/MenuItemView.vue"),
  props: {
    menuItem,
    suppliesList,
    updateMenuItem: menuItemRepo.update,
    insertMenuItem: menuItemRepo.insert,
  },
}));

menuItemRoutes.forEach((route) => {
  router.addRoute("menuItems", route);
});

export default router;
