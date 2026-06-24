import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { setupAuthGuard } from "./guards";
import { authRoutes } from "@/modules/auth";
import { campanhasRoutes } from "@/modules/campanhas";
import { dashboardRoutes } from "@/modules/dashboard";
import { ativosRoutes } from "@/modules/ativos";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  ...dashboardRoutes,
  ...authRoutes,
  ...campanhasRoutes,
  ...ativosRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/shared/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configura o guard de autenticação
setupAuthGuard(router);

export default router;
