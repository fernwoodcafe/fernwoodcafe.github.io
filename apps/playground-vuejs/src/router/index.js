import { reactive } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const suppliesList = reactive([
  {
    supplierId: "Country Grocer",
    itemId: "Cheese",
    cost: 10,
    totalUnits: 10,
    units: "grams",
  },
  {
    supplierId: "Cysco",
    itemId: "Cheese",
    cost: 10,
    totalUnits: 10,
    units: "grams",
  },
]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/supplies",
      name: "supplies",
      component: () => import("../views/SuppliesView.vue"),
      props: {
        suppliesList,
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesView.vue"),
      props: {
        suppliesList,
      },
    },
  ],
});

export default router;
