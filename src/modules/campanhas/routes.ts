import type { RouteRecordRaw } from "vue-router";

export const campanhasRoutes: RouteRecordRaw[] = [
  {
    path: "/campanhas",
    name: "Campanhas",
    component: () => import("./components/CampanhaList.vue"),
    meta: {
      requiresAuth: true,
      title: "Campanhas",
    },
  },
];
