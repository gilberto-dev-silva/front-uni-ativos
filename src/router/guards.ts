import type { Router } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export function setupAuthGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Verifica se a rota requer autenticação
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    console.log(`🛡️ Guard: ${to.path} (requiresAuth: ${requiresAuth})`);

    if (requiresAuth && !authStore.isAuthenticated) {
      console.log("🔒 Redirecionando para login");
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    } else if (to.name === "Login" && authStore.isAuthenticated) {
      console.log("🔓 Já autenticado, redirecionando para dashboard");
      next({ name: "Dashboard" });
    } else {
      next();
    }
  });
}
