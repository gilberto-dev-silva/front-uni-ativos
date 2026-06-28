<template>
  <header
    class="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 flex items-center justify-end px-8"
  >
    <div class="flex items-center gap-6">
      <Avatar
        size="large"
        class="mr-2"
        shape="circle"
        image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
</script>
