import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth.store";
import type { LoginCredentials } from "../types";

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();

  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Validações
  const isEmailValid = computed(() => {
    if (!email.value) return true; // Não mostra erro se campo vazio
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  });

  const isFormValid = computed(() => {
    return email.value && password.value && isEmailValid.value;
  });

  // Preenche campos automaticamente para testes (remova em produção)
  const fillTestCredentials = () => {
    email.value = "admin@admin.com";
    password.value = "123456";
  };

  async function handleLogin() {
    // Validações locais
    if (!email.value) {
      errorMessage.value = "Email é obrigatório";
      return;
    }

    if (!isEmailValid.value) {
      errorMessage.value = "Email inválido";
      return;
    }

    if (!password.value) {
      errorMessage.value = "Senha é obrigatória";
      return;
    }

    if (password.value.length < 6) {
      errorMessage.value = "Senha deve ter no mínimo 6 caracteres";
      return;
    }

    isLoading.value = true;
    errorMessage.value = "";

    try {
      const credentials: LoginCredentials = {
        email: email.value,
        password: password.value,
      };

      await authStore.login(credentials);

      if (rememberMe.value) {
        localStorage.setItem("rememberedEmail", email.value);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      router.push("/dashboard");
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || "Erro ao fazer login";
      console.error("Erro no login:", err);
    } finally {
      isLoading.value = false;
    }
  }

  function clearError() {
    errorMessage.value = "";
  }

  // Restaura email lembrado
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    email.value = rememberedEmail;
    rememberMe.value = true;
  }

  return {
    email,
    password,
    rememberMe,
    isLoading,
    errorMessage,
    isEmailValid,
    isFormValid,
    handleLogin,
    clearError,
    fillTestCredentials,
  };
}
