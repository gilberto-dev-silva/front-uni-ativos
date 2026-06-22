<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-2">
      <label for="email" class="text-sm font-semibold text-gray-700">E-mail Corporativo</label>
      <div class="relative">
        <iconify-icon
          icon="lucide:mail"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
        ></iconify-icon>
        <input
          v-model="credentials.email"
          type="email"
          id="email"
          placeholder="exemplo@empresa.com.br"
          class="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
          required
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <label for="password" class="text-sm font-semibold text-gray-700">Senha</label>
      <div class="relative">
        <iconify-icon
          icon="lucide:lock"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
        ></iconify-icon>
        <input
          v-model="credentials.password"
          :type="showPassword ? 'text' : 'password'"
          id="password"
          placeholder="••••••••"
          class="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
          required
        />
        <button
          type="button"
          @click="togglePasswordVisibility"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <iconify-icon
            :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
            class="text-lg"
          ></iconify-icon>
        </button>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 group">
        <Checkbox v-model="rememberMe" inputId="remember_me" name="remember_me" value="true" />
        <label
          class="cursor-pointer text-sm text-gray-600 group-hover:text-gray-900 transition-colors"
          for="remember_me"
          >Lembrar-me</label
        >
      </div>
      <a
        href="#"
        id="forgot-password-link"
        class="text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline transition-colors"
      >
        Esqueceu a senha?
      </a>
    </div>
    <button
      type="submit"
      id="btn-login-submit"
      class="w-full py-3.5 bg-[#07331A] hover:bg-[#0a4d26] text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-900/10 active:scale-[0.98]"
      :disabled="isLoading"
    >
      {{ isLoading ? "Entrando..." : "Entrar na plataforma" }}
    </button>
  </form>
</template>

<script lang="ts" setup>
import Checkbox from "primevue/checkbox";
import { ref, reactive } from "vue";

const emit = defineEmits(["login"]);

const credentials = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);
const rememberMe = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    await emit("login", { ...credentials, rememberMe: rememberMe.value });
  } finally {
    isLoading.value = false;
  }
};
</script>
