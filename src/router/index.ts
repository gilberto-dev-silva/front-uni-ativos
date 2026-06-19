import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { authRoutes } from "@/modules/auth";
import { campanhasRoutes } from "@/modules/campanhas";
import { setupAuthGuard } from "./guards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      requiresAuth: true,
      title: "Dashboard",
    },
  },
  // Adiciona as rotas dos módulos
  ...authRoutes,
  ...campanhasRoutes,
  // Rota 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configura o guard de autenticação
setupAuthGuard(router);

export default router;
