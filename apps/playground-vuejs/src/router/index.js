import { createRouter, createWebHistory } from "vue-router";
import setupDB from "../data/indexedDB-setup";
import RecipesRepo from "../data/RecipesRepo";
import SuppliesRepo from "../data/SuppliesRepo";
import HomeView from "../views/HomeView.vue";

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
      children: [
        {
          path: "/recipes/:id",
          name: "recipe",
          component: () => import("../views/RecipeView.vue"),
          props: (route) => ({
            id: route.params.id,
            suppliesList,
            getRecipe,
          }),
        },
      ],
    },
  ],
});

export default router;
