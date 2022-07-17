import DomainEventsRepo from "@/data/DomainEventsRepo";
import setupDB from "@/data/indexedDB-setup";
import materializeMenuItems from "@/data/materializeMenuItems";
import materializeSupplies from "@/data/materializeSupplies";
import { reactive, watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const db = await setupDB();

const domainEventsRepo = DomainEventsRepo(db);
const domainEvents = await domainEventsRepo.select();

const menuItemsList = await materializeMenuItems(
  reactive({ items: [] }),
  ...domainEvents
);

const suppliesList = await materializeSupplies(
  reactive({ items: [] }),
  ...domainEvents
);

const sendCommand = async (command) => {
  if (command.type == "create_new_menu_item") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "new_menu_item_created",
      payload: command.payload,
    });

    materializeMenuItems(menuItemsList, event);
  }

  if (command.type == "create_new_supply") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "new_supply_created",
      payload: command.payload,
    });

    materializeSupplies(suppliesList, event);
  }

  if (command.type == "update_supply") {
    const event = await domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "supply_updated",
      payload: command.payload,
    });

    materializeSupplies(suppliesList, event);
  }
};

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
        sendCommand,
      },
    },
    {
      path: "/menu-items",
      name: "menuItems",
      component: () => import("../views/MenuItemsListView.vue"),
      props: {
        menuItemsList,
        sendCommand,
      },
      children: menuItemsList.items.map((menuItem) => ({
        path: `/menu-items/${menuItem.menuItemId}`,
        component: () => import("../views/MenuItemView.vue"),
        props: {
          menuItem,
          suppliesList,
        },
      })),
    },
  ],
});

watch(menuItemsList, () => {
  const routeData = router.options.routes.find(
    (route) => route.name == "menuItems"
  );

  routeData.children = menuItemsList.items.map((menuItem) => ({
    path: `/menu-items/${menuItem.menuItemId}`,
    component: () => import("../views/MenuItemView.vue"),
    props: {
      menuItem,
      suppliesList,
    },
  }));

  router.addRoute(routeData);
});

export default router;
