<template>
  <div
    class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-gray-50 md:bg-white"
  >
    <div class="w-full max-w-md">
      <div class="md:hidden mb-8 flex flex-col items-center">
        <iconify-icon icon="lucide:cpu" class="text-5xl text-[#07331A]"></iconify-icon>
        <h2 class="text-2xl font-bold text-[#07331A] mt-2">AssetManager</h2>
      </div>

      <div class="mb-10">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Bem-vindo de volta</h2>
        <p class="text-gray-500">Acesse sua conta para gerenciar seu inventário de TI.</p>
      </div>

      <!-- Mensagem de erro -->
      <div
        v-if="errorMessage"
        class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2"
      >
        <iconify-icon icon="lucide:alert-circle" class="text-lg flex-shrink-0"></iconify-icon>
        <span>{{ errorMessage }}</span>
      </div>

      <login-form-fields :is-loading="isLoading" @login="onLogin" />

      <social-login-divider />
      <social-login-buttons />
      <p class="mt-10 text-center text-sm text-gray-500">
        Não possui acesso?
        <a
          href="#"
          id="contact-support-link"
          class="text-emerald-700 font-semibold hover:underline"
        >
          Contate o suporte de TI
        </a>
      </p>
    </div>

    <footer class="absolute bottom-8 text-center text-xs text-gray-400 hidden md:block">
      © {{ year }} AssetManager UniCampo. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script lang="ts" setup>
import LoginFormFields from "./LoginFormFields.vue";
import SocialLoginDivider from "./SocialLoginDivider.vue";
import SocialLoginButtons from "./SocialLoginButtons.vue";
import { useLogin } from "../composables/useLogin";

const year = new Date().getFullYear();

const { email, password, rememberMe, isLoading, errorMessage, handleLogin } = useLogin();

const onLogin = async (data: Record<string, unknown>) => {
  email.value = data.email as string;
  password.value = data.password as string;
  rememberMe.value = data.rememberMe as boolean;
  await handleLogin();
};
</script>
