import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("./components/LoginForm.vue"),
    meta: {
      requiresAuth: false,
      title: "Login",
      layout: "auth",
    },
  },
];
