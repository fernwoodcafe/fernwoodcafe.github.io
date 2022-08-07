import {
  handleCommand,
  materializeMenuItems,
  materializeSupplies,
} from "@packages/cqrs-es";
import initializeRepository from "@packages/data/excelDB/initializeRepository";
import type { CafeGoals, CafeSupplyTaxes } from "@packages/domain/types";
import { formatLink } from "@ui/formatters";
import { reactive, watch } from "vue";
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const domainEventsRepo = initializeRepository();
const domainEvents = await domainEventsRepo.select();

const menuItemsList = materializeMenuItems(
  reactive({ items: [] }),
  ...domainEvents
);

const suppliesList = materializeSupplies(
  reactive({ items: [] }),
  ...domainEvents
);

const sendCommand = handleCommand({
  menuItems: menuItemsList,
  supplies: suppliesList,
  materializeMenuItems,
  materializeSupplies,
  domainEventsRepo,
});

const cafeGoals = reactive<CafeGoals>({
  weightedAverageMarkup: 3.5,
});

const supplyTaxes = reactive<CafeSupplyTaxes>({
  PST: 0.06,
});

const buildMenuItemRoutes = (): RouteRecordRaw[] =>
  menuItemsList.items.map<RouteRecordRaw>((menuItem) => ({
    name: menuItem.menuItemName,
    path: `/menu-items/${formatLink(menuItem.menuItemName)}`,
    component: () => import("../views/MenuItemView.vue"),
    props: {
      menuItem,
      suppliesList,
      supplyTaxes,
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
        suppliesList: suppliesList,
        sendCommand,
      },
    },
    {
      path: "/menu-items",
      name: "menuItems",
      component: () => import("../views/MenuItemsListView.vue"),
      props: {
        menuItemsList,
        suppliesList,
        supplyTaxes,
        cafeGoals,
        sendCommand,
      },
    },
    ...buildMenuItemRoutes(),
  ],
});

watch(menuItemsList, () => {
  const routes = buildMenuItemRoutes();
  routes.forEach((route) => {
    router.removeRoute(route.name);
    router.addRoute(route);
  });

  console.log("routes", router.getRoutes());
});

export default router;
