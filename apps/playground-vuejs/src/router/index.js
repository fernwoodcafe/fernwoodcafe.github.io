import setupDB from "@/data/indexedDB-setup";
import RecipesRepo from "@/data/RecipesRepo";
import SuppliesRepo from "@/data/SuppliesRepo";
import { watch } from "vue";
import { createRouter, createWebHistory } from "vue-router";

const db = await setupDB();

const recipesRepo = RecipesRepo(db);
const recipesList = await recipesRepo.select();
const getRecipe = recipesRepo.single;

// TODO: Why not pass the whole repo in as props? Might save boilerplate.
const suppliesRepo = SuppliesRepo(db);
const suppliesList = await suppliesRepo.select();
const insertSupply = suppliesRepo.insert;
const updateSupply = suppliesRepo.update;

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
        insertSupply,
        updateSupply,
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

watch(recipesList, (_, updatedRecipesList) => {
  updatedRecipesList.items.forEach((recipe) => {
    router.addRoute("recipes", {
      path: `/recipes/${recipe.recipeId}`,
      component: () => import("../views/RecipeView.vue"),
      props: {
        recipe,
      },
    });
  });
});

export default router;
