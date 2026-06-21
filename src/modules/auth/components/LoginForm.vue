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
      <login-form-fields @login="handleLogin" />
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

const year = new Date().getFullYear();

const handleLogin = (credentials: string) => {
  console.log("Login attempted with:", credentials);
};
</script>
