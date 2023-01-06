import { createRouter, createWebHistory,createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{ path: "/", redirect: "/search" },
		{ path: "/search", name: "搜索", component: () => import("@/view/SearchCom.vue") },
	],
});

export default router;
