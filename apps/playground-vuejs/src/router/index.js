import DomainEventsRepo from "@/data/DomainEventsRepo";
import setupDB from "@/data/indexedDB-setup";
import MenuItemRepo from "@/data/MenuItemRepo";
import SuppliesMaterializer from "@/data/SuppliesMaterializer";
import { createRouter, createWebHistory } from "vue-router";

const db = await setupDB();

const menuItemRepo = MenuItemRepo(db);
const menuItemsList = await menuItemRepo.select();

const suppliesMaterializer = SuppliesMaterializer(db);
const suppliesList = await suppliesMaterializer.select();

const domainEventsRepo = DomainEventsRepo(db);
const sendCommand = async (command) => {
  if (command.type == "CREATE_NEW_SUPPLY") {
    const event = domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "NEW_SUPPLY_CREATED",
      payload: command.payload,
    });

    suppliesMaterializer.materialize(event);
  }

  if (command.type == "UPDATE_SUPPLY") {
    const event = domainEventsRepo.insert({
      id: self.crypto.randomUUID(),
      type: "SUPPLY_UPDATED",
      payload: command.payload,
    });

    suppliesMaterializer.materialize(event);
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
      },
      children: [
        // @ts-ignore
        {
          path: "/menu-items",
          redirect: `/menu-items/${menuItemsList.items[0].menuItemId}`,
        },
        ...menuItemsList.items.map((menuItem) => ({
          path: `/menu-items/${menuItem.menuItemId}`,
          component: () => import("../views/MenuItemView.vue"),
          props: {
            menuItem,
            suppliesList,
            updateMenuItem: menuItemRepo.update,
            insertMenuItem: menuItemRepo.insert,
          },
        })),
      ],
    },
  ],
});

export default router;
