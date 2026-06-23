<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="stat in stats"
      :key="stat.title"
      class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div class="flex items-center justify-between mb-4">
        <div :class="[stat.iconBg, stat.iconColor, 'p-2 rounded-lg']">
          <i :class="[stat.icon, 'text-2xl']"></i>
        </div>
        <span
          :class="[
            stat.badgeColor,
            stat.badgeTextColor,
            'text-xs font-bold px-2 py-1 rounded-full',
          ]"
        >
          {{ stat.change }}
        </span>
      </div>
      <p class="text-gray-500 text-sm font-medium">{{ stat.title }}</p>
      <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StatCard } from "../types/dashboard";

defineProps<{
  stats: StatCard[];
}>();
</script>
