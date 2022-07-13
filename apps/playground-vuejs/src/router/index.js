import setupDB from "@/data/indexedDB-setup";
import RecipesRepo from "@/data/RecipesRepo";
import SuppliesRepo from "@/data/SuppliesRepo";
import { createRouter, createWebHistory } from "vue-router";

const db = await setupDB();

const recipesRepo = RecipesRepo(db);
const recipesList = await recipesRepo.select();

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
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesListView.vue"),
      props: {
        recipesList,
      },
    },
  ],
});

recipesList.items.forEach((recipe) => {
  router.addRoute("recipes", {
    path: `/recipes/${recipe.recipeId}`,
    component: () => import("../views/RecipeView.vue"),
    props: {
      recipe,
      suppliesList,
    },
  });
});

export default router;
