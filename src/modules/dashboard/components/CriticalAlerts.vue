<template>
  <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <h4 class="font-bold text-gray-900 mb-4">Alertas Críticos</h4>

    <div class="space-y-4">
      <div v-for="alert in alerts" :key="alert.id" class="flex gap-3">
        <div
          :class="[
            'mt-1 w-2 h-2 rounded-full shrink-0',
            alert.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500',
          ]"
        ></div>
        <div>
          <p class="text-sm font-semibold text-gray-900">{{ alert.message }}</p>
          <p class="text-xs text-gray-500">{{ alert.location }} • {{ alert.time }}</p>
        </div>
      </div>
    </div>

    <Button
      label="Ver Central de Alertas"
      severity="secondary"
      outlined
      class="w-full mt-6 text-sm font-semibold"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import type { Alert } from "../types/dashboard";

defineProps<{
  alerts: Alert[];
}>();
</script>
