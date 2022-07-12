import { reactive } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import setupDB from "../data/indexedDB-setup";
import RecipesRepo from "../data/RecipesRepo";
import SuppliesRepo from "../data/SuppliesRepo";
import HomeView from "../views/HomeView.vue";

const db = await setupDB();
const suppliesRepo = SuppliesRepo(db);
const recipesRepo = RecipesRepo(db);

const recipesList = [];
const suppliesList = reactive({ items: [] });

recipesRepo.select();
suppliesRepo.select().then((items) => {
  suppliesList.items.push(...items);
});

const insertSupply = (data) => {
  console.log("insertSupply", data);
  suppliesList.items = suppliesList.items.slice().concat([data]);
  suppliesRepo.insertOrUpdate(data);
};

const updateSupply = (data) => {
  console.log("updateSupply", data);
  suppliesList.items = suppliesList.items.map((oldItem) =>
    oldItem.id == data.id ? data : oldItem
  );
  suppliesRepo.insertOrUpdate(data);
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
        updateSupply,
      },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesListView.vue"),
      props: {
        suppliesList,
        recipesList,
        insertSupply,
        updateSupply,
      },
    },
  ],
});

export default router;
