import type { RouteRecordRaw } from "vue-router";

export const campanhasRoutes: RouteRecordRaw[] = [
  {
    path: "/campanhas",
    name: "Campanhas",
    component: () => import("./views/CampanhasView.vue"),
    meta: {
      requiresAuth: true,
      title: "Campanhas",
    },
  },
];
