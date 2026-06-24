<template>
  <dashboard-layout>
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p class="text-gray-500">Visão geral dos ativos e status da infraestrutura.</p>
      </div>
      <div class="flex gap-3">
        <Button label="Últimos 30 dias" icon="pi pi-calendar" severity="secondary" outlined />
        <Button label="Exportar" icon="pi pi-download" severity="secondary" outlined />
      </div>
    </div>

    <StatsCards :stats="statsCards" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <InventoryChart :inventory="inventoryData" />
        <RecentAssets
          :assets="recentAssets"
          :getStatusSeverity="getStatusSeverity"
          :getStatusLabel="getStatusLabel"
        />
      </div>

      <div class="space-y-6">
        <CriticalAlerts :alerts="criticalAlerts" />
        <ReportCard />
      </div>
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import StatsCards from "../components/StatsCards.vue";
import ReportCard from "../components/ReportCard.vue";
import RecentAssets from "../components/RecentAssets.vue";
import { useDashboard } from "../composables/useDashboard";
import DashboardLayout from "../layout/DashboardLayout.vue";
import InventoryChart from "../components/InventoryChart.vue";
import CriticalAlerts from "../components/CriticalAlerts.vue";

const {
  statsCards,
  recentAssets,
  criticalAlerts,
  inventoryData,
  getStatusSeverity,
  getStatusLabel,
} = useDashboard();
</script>
