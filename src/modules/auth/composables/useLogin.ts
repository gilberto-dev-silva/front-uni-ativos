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
  const showPassword = ref(false);

  // Validações em tempo real
  const emailError = computed(() => {
    if (!email.value) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return "Email inválido";
    return "";
  });

  const passwordError = computed(() => {
    if (!password.value) return "";
    if (password.value.length < 6) return "Mínimo 6 caracteres";
    return "";
  });

  const isFormValid = computed(() => {
    return email.value && password.value && !emailError.value && !passwordError.value;
  });

  // Preenche credenciais de teste
  function fillTestCredentials(userType: "admin" | "user" = "admin") {
    if (userType === "admin") {
      email.value = "admin@admin.com";
      password.value = "123456";
    } else {
      email.value = "user@teste.com";
      password.value = "123456";
    }
  }

  async function handleLogin() {
    // Validações antes de enviar
    if (!isFormValid.value) {
      if (!email.value) errorMessage.value = "Email é obrigatório";
      else if (emailError.value) errorMessage.value = emailError.value;
      else if (!password.value) errorMessage.value = "Senha é obrigatória";
      else if (passwordError.value) errorMessage.value = passwordError.value;
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

      // Salva email se "lembrar-me" estiver marcado
      if (rememberMe.value) {
        localStorage.setItem("rememberedEmail", email.value);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redireciona para o dashboard
      const redirect = router.currentRoute.value.query.redirect as string;
      router.push(redirect || "/dashboard");
    } catch (err: any) {
      errorMessage.value = err.response?.data?.message || "Erro ao fazer login";
    } finally {
      isLoading.value = false;
    }
  }

  function clearError() {
    if (errorMessage.value) errorMessage.value = "";
  }

  function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
  }

  // Restaura email lembrado
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    email.value = rememberedEmail;
    rememberMe.value = true;
  }

  return {
    // Estado
    email,
    password,
    rememberMe,
    showPassword,
    isLoading,
    errorMessage,

    // Computados
    emailError,
    passwordError,
    isFormValid,

    // Métodos
    handleLogin,
    clearError,
    togglePasswordVisibility,
    fillTestCredentials,
  };
}
