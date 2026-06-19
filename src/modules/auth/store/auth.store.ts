import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginCredentials } from "../types";
import { authService } from "../services/auth.service";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = null;

    console.log("🔐 Iniciando login...");

    try {
      const response = await authService.login(credentials);

      token.value = response.token;
      user.value = response.user;

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      console.log("✅ Login concluído:", response.user.name);

      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao fazer login";
      console.error("❌ Erro no login:", error.value);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    console.log("🔒 Iniciando logout...");

    try {
      await authService.logout();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      token.value = null;
      user.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("✅ Logout concluído");
    }
  }

  async function checkAuth() {
    console.log("🔍 Verificando autenticação...");

    if (!token.value) {
      console.log("❌ Sem token armazenado");
      return;
    }

    try {
      loading.value = true;
      user.value = await authService.getCurrentUser();
      console.log("✅ Autenticação verificada:", user.value.name);
    } catch (err) {
      console.error("❌ Falha na verificação:", err);
      token.value = null;
      user.value = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      loading.value = false;
    }
  }

  // Recupera dados do localStorage se existirem
  function restoreSession() {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken && storedUser) {
      token.value = storedToken;
      user.value = JSON.parse(storedUser);
      console.log("📦 Sessão restaurada do localStorage");
    }
  }

  // Restaura sessão ao criar a store
  restoreSession();

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    checkAuth,
    restoreSession,
  };
});
