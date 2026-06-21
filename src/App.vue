<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/modules/auth/store/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  // Verifica autenticação ao iniciar o app
  if (authStore.isAuthenticated) {
    authStore.checkAuth()
  }
})
</script>
