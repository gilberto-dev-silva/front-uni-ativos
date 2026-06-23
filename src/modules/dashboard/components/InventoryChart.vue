<template>
  <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div class="flex items-center justify-between mb-8">
      <h4 class="font-bold text-gray-900">Distribuição de Inventário</h4>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-emerald-500 rounded-full"></span>
          <span class="text-xs text-gray-500">Em Uso</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-amber-400 rounded-full"></span>
          <span class="text-xs text-gray-500">Em Estoque</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-red-400 rounded-full"></span>
          <span class="text-xs text-gray-500">Manutenção</span>
        </div>
      </div>
    </div>

    <div class="h-64 flex items-end justify-between gap-4 px-2">
      <div
        v-for="item in inventory"
        :key="item.category"
        class="flex flex-col items-center gap-2 flex-1"
      >
        <div
          :class="[
            item.color,
            'w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer',
          ]"
          :style="{ height: `${item.percentage}%` }"
          v-tooltip.top="`${item.category}: ${item.percentage}%`"
        ></div>
        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          {{ item.category }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InventoryItem } from "../types/dashboard";

defineProps<{
  inventory: InventoryItem[];
}>();
</script>
