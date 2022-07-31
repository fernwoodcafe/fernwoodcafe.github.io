import materializeMenuItems from "@/cqrs-es/materializeMenuItems";
import materializeSupplies from "@/cqrs-es/materializeSupplies";
import initializeRepository from "@/data/indexedDB/initializeRepository";
import formatLink from "@/formatters/formatLink";
import type { CafeGoals } from "@/types/CafeDomain";
import { reactive, watch } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import handleCommand from "../cqrs-es/handleCommand";

const domainEventsRepo = initializeRepository();
const domainEvents = await domainEventsRepo.select();

const menuItems = materializeMenuItems(
  reactive({ items: [] }),
  ...domainEvents
);

const supplies = materializeSupplies(reactive({ items: [] }), ...domainEvents);

const sendCommand = handleCommand({
  menuItems,
  supplies,
  materializeMenuItems,
  materializeSupplies,
  domainEventsRepo,
});

const cafeGoals = reactive<CafeGoals>({
  weightedAverageMarkup: 3.5,
});

const buildMenuItemRoutes = () =>
  menuItems.items.map((menuItem) => ({
    path: `/menu-items/${formatLink(menuItem.menuItemName)}`,
    component: () => import("../views/MenuItemView.vue"),
    props: {
      menuItem,
      suppliesList: supplies,
      cafeGoals,
      sendCommand,
    },
  }));

const router = createRouter({
  // We use hash navigation because GitHub Pages does not support a simple catch-all fallback route
  // to the server.See https://router.vuejs.org/guide/essentials/history-mode.html#html5-mode for
  // more details and see also https://stackoverflow.com/q/47677220/1108891.
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
        suppliesList: supplies,
        sendCommand,
      },
    },
    {
      path: "/menu-items",
      name: "menuItems",
      component: () => import("../views/MenuItemsListView.vue"),
      props: {
        menuItemsList: menuItems,
        suppliesList: supplies,
        cafeGoals,
        sendCommand,
      },
    },
    ...buildMenuItemRoutes(),
  ],
});

watch(menuItems, () => {
  const routes = buildMenuItemRoutes();
  routes.forEach((route) => {
    router.addRoute(route);
  });

  console.log("routes", router.getRoutes());
});

export default router;
