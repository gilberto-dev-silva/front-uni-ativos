<template>
  <div class="min-h-screen flex overflow-hidden bg-[#F9FAFB]">
    <sidebar :isCollapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <main
      :class="sidebarCollapsed ? 'ml-20' : 'ml-64'"
      class="flex-1 content-transition min-h-screen flex flex-col"
    >
      <top-bar />

      <div class="flex-1 p-8 space-y-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";

const sidebarCollapsed = ref(false);
</script>

<style scoped>
.content-transition {
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
