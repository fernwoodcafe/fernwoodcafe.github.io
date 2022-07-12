import { watch } from "vue";
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
        ...[
          {
            path: "/recipes/Foo",
            component: () => import("../views/RecipeView.vue"),
            props: {
              recipeId: "Foo",
            },
          },
          {
            path: "/recipes/Bar",
            component: () => import("../views/RecipeView.vue"),
            props: {
              recipeId: "Bar",
            },
          },
        ],
        ...recipesList.items.map((x) => ({
          path: "/recipes/Americano",
          component: () => import("../views/RecipeView.vue"),
        })),
      ],
    },
  ],
});

watch(recipesList, (_, updatedRecipesList) => {
  console.log(
    "recipesList",
    // updatedRecipesList.items.length,
    updatedRecipesList.items.map((x) => x)
  );

  updatedRecipesList.items.forEach((recipe) => {
    console.log("recipe", recipe);
    router.addRoute("recipes", {
      path: `/recipes/${recipe.recipeId}`,
      component: () => import("../views/RecipeView.vue"),
      props: {
        recipeId: recipe.recipeId,
      },
    });
  });
});

export default router;
