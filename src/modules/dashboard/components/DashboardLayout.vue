<template>
  <div class="min-h-screen flex overflow-hidden bg-[#F9FAFB]">
    <Sidebar :isCollapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <main
      :class="sidebarCollapsed ? 'ml-20' : 'ml-64'"
      class="flex-1 content-transition min-h-screen flex flex-col"
    >
      <TopBar />

      <div class="flex-1 p-8 space-y-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "./Sidebar.vue";
import TopBar from "./TopBar.vue";

const sidebarCollapsed = ref(false);
</script>

<style scoped>
.content-transition {
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
