import { reactive } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import setupDB from "../data/indexedDB-setup";
import RecipesRepo from "../data/RecipesRepo";
import SuppliesRepo from "../data/SuppliesRepo";
import HomeView from "../views/HomeView.vue";

const db = await setupDB();
const suppliesRepo = SuppliesRepo(db);
const recipesRepo = RecipesRepo(db);

const suppliesList = reactive(suppliesRepo.select());
const recipesList = reactive(recipesRepo.select());

const insertSupply = (data) => {
  console.log("insertSupply", data);
  suppliesRepo.insert(data);
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
