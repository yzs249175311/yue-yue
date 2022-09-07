import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", redirect: "/search" },
    { path: "/search", component: () => import("../components/SearchCom.vue") },
  ],
});

export default router;
