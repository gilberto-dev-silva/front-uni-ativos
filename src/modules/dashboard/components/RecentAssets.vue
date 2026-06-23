<template>
  <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-gray-100 flex items-center justify-between">
      <h4 class="font-bold text-gray-900">Ativos Recém Adicionados</h4>
      <a href="#" class="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
        Ver todos
      </a>
    </div>

    <div class="divide-y divide-gray-50">
      <div
        v-for="asset in assets"
        :key="asset.id"
        class="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div
          class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500"
        >
          <i :class="[asset.icon, 'text-xl']"></i>
        </div>
        <div class="flex-1">
          <p class="text-sm font-semibold text-gray-900">{{ asset.name }} - #{{ asset.id }}</p>
          <p class="text-xs text-gray-500">{{ asset.department }} • {{ asset.time }}</p>
        </div>
        <Tag
          :value="getStatusLabel(asset.status)"
          :severity="getStatusSeverity(asset.status)"
          class="text-[10px] font-bold"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tag from "primevue/tag";
import type { RecentAsset } from "../types/dashboard";

defineProps<{
  assets: RecentAsset[];
  getStatusSeverity: (status: string) => string;
  getStatusLabel: (status: string) => string;
}>();
</script>
