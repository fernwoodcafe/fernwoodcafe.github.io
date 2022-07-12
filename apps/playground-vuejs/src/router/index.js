import { reactive, ref } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const counterOuter = ref(0);
const incrementOuter = () => counterOuter.value++;

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
      props: {
        counterOuter,
        incrementOuter,
      },
    },
    {
      path: "/supplies",
      name: "supplies",
      component: () => import("../views/SuppliesView.vue"),
      props: {
        counterOuter,
        incrementOuter,
        suppliesList,
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesView.vue"),
      props: {
        counterOuter,
        incrementOuter,
        suppliesList,
      },
    },
  ],
});

export default router;
