<template>
  <div class="grid grid-cols-2 gap-4">
    <button
      type="button"
      id="btn-google-login"
      @click="handleSocialLogin('google')"
      class="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
    >
      <iconify-icon icon="logos:google-icon" class="text-lg"></iconify-icon>
      Google
    </button>

    <button
      type="button"
      id="btn-microsoft-login"
      @click="handleSocialLogin('microsoft')"
      class="flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700"
    >
      <iconify-icon icon="logos:microsoft-icon" class="text-lg"></iconify-icon>
      Microsoft
    </button>
  </div>
</template>

<script lang="ts" setup>
const handleSocialLogin = (provider: string) => {
  console.log(`Social login with ${provider}`);
};
</script>
