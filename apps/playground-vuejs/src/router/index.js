import { reactive } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import RecipesRepo from "../data/RecipesRepo";
import SuppliesRepo from "../data/SuppliesRepo";
import HomeView from "../views/HomeView.vue";

const suppliesList = reactive(SuppliesRepo.getAll());
const recipesList = reactive(RecipesRepo.getAll());

const insertSupply = (data) => {
  console.log("insertSupply", data);
  suppliesList.push(data);
};

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
      component: () => import("../views/SuppliesListView.vue"),
      props: {
        suppliesList,
        insertSupply,
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesListView.vue"),
      props: {
        suppliesList,
        recipesList,
      },
    },
  ],
});

export default router;
