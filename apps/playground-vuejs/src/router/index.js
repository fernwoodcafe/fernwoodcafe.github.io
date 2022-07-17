import materializeMenuItems from "@/cqrs-es/materializeMenuItems";
import materializeSupplies from "@/cqrs-es/materializeSupplies";
import DomainEventsRepo from "@/data/DomainEventsRepo";
import setupDB from "@/data/indexedDB-setup";
import { reactive, watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { handleCommand } from "../cqrs-es/handleCommand";

const db = await setupDB();

export const domainEventsRepo = DomainEventsRepo(db);
const domainEvents = await domainEventsRepo.select();

export const menuItemsList = await materializeMenuItems(
  reactive({ items: [] }),
  ...domainEvents
);

export const suppliesList = await materializeSupplies(
  reactive({ items: [] }),
  ...domainEvents
);

const buildMenuItemChildRoutes = () =>
  menuItemsList.items.map((menuItem) => ({
    path: `/menu-items/${menuItem.menuItemId}`,
    component: () => import("../views/MenuItemView.vue"),
    props: {
      menuItem,
      suppliesList,
      sendCommand: handleCommand,
    },
  }));

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
        sendCommand: handleCommand,
      },
    },
    {
      path: "/menu-items",
      name: "menuItems",
      component: () => import("../views/MenuItemsListView.vue"),
      props: {
        menuItemsList,
        sendCommand: handleCommand,
      },
      children: buildMenuItemChildRoutes(),
    },
  ],
});

watch(menuItemsList, () => {
  const routeData = router.options.routes.find(
    ({ name }) => name == "menuItems"
  );

  routeData.children = buildMenuItemChildRoutes();

  router.addRoute(routeData);
});

export default router;
