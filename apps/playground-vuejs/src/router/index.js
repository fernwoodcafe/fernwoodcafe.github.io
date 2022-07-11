import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import("../views/RecipesView.vue"),
    },
    {
      path: "/staff",
      name: "staff",
      component: () => import("../views/StaffView.vue"),
    },
    {
      path: "/schedules",
      name: "schedules",
      component: () => import("../views/SchedulesView.vue"),
    },
  ],
});

export default router;
