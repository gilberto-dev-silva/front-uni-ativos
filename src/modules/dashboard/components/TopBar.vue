<template>
  <header
    class="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center justify-between px-8"
  >
    <div class="flex items-center gap-4 text-gray-400">
      <i class="pi pi-search text-xl"></i>
      <InputText
        v-model="searchQuery"
        placeholder="Pesquisar ativos, licenças ou usuários..."
        class="bg-transparent border-none outline-none text-gray-600 text-sm w-96 hidden sm:block"
        :pt="{ root: { class: 'border-0 shadow-none' } }"
      />
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-6">
      <!-- Notifications -->
      <Button
        icon="pi pi-bell"
        severity="secondary"
        text
        rounded
        class="relative text-gray-400 hover:text-gray-600"
        badge="3"
        badgeSeverity="danger"
      />

      <div class="h-6 w-px bg-gray-200"></div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          v2.4.0
        </span>

        <Button
          label="Novo Ativo"
          icon="pi pi-plus"
          severity="secondary"
          class="bg-gray-900 text-white border-gray-900 hover:bg-gray-800"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const searchQuery = ref("");
</script>
