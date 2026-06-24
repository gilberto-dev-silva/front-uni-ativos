import type { RouteRecordRaw } from "vue-router";

const ativosRoutes: RouteRecordRaw[] = [
  {
    path: "/ativos",
    name: "ativos",
    component: () => import("../views/AtivosView.vue"),
    meta: {
      title: "Ativos",
      requiresAuth: true,
    },
  },
];

export default ativosRoutes;
