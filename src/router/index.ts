import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("view/index/index.vue"),
    meta: {
      title: "This is a demo",
      description: "This is a demo",
      keywords: "This is a demo",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/view/login/Login.vue"),
    meta: {
      title: "登录",
      description: "This is a demo",
      keywords: "This is a demo",
    },
  },
];

const router = createRouter({
  history: createWebHistory(""),
  routes,
});

export default router;
