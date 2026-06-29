<template>
  <dashboard-layout>
    <base-breadcrumb
      :home="pageConfig"
      :model="breadcrumbItems"
      :class="BREADCRUMB_CLASSES.container"
    />

    <!-- Header Area -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Ativos de TI</h2>
        <p class="text-gray-500">Gerenciamento e controle de equipamentos e dispositivos de TI.</p>
      </div>
      <div class="flex gap-3">
        <Button
          label="Novo Ativo"
          icon="pi pi-plus"
          class="bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700 transition-colors"
          @click="showAddModal = true"
        />
      </div>
    </div>

    <!-- Quick Stats Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
      >
        <div>
          <p class="text-gray-500 text-sm font-medium">{{ stat.title }}</p>
          <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</h3>
        </div>
        <div :class="[stat.iconBg, stat.iconColor, 'p-3 rounded-xl']">
          <i :class="[stat.icon, 'text-2xl']"></i>
        </div>
      </div>
    </div>

    <!-- Toolbar and Table Container -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <!-- Table Filters -->
      <div
        class="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50"
      >
        <div class="flex items-center gap-4 text-gray-400 flex-1 max-w-md">
          <i class="pi pi-search text-lg"></i>
          <InputText
            v-model="searchQuery"
            placeholder="Pesquisar por nome, código ou departamento..."
            class="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 w-full focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        <div class="flex gap-3 items-center">
          <span class="text-sm font-medium text-gray-500">Filtrar status:</span>
          <div class="flex bg-gray-100 p-1 rounded-lg">
            <button
              v-for="filter in ['all', 'active', 'stock', 'maintenance']"
              :key="filter"
              class="px-3 py-1.5 rounded-md text-xs font-semibold transition-all capitalize"
              :class="
                statusFilter === filter
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              "
              @click="statusFilter = filter"
            >
              {{ filter === "all" ? "Todos" : getStatusLabel(filter) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Assets Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50/30"
            >
              <th class="py-4 px-6">Código / Ativo</th>
              <th class="py-4 px-6">Categoria</th>
              <th class="py-4 px-6">Departamento</th>
              <th class="py-4 px-6">Aquisição</th>
              <th class="py-4 px-6">Valor</th>
              <th class="py-4 px-6">Status</th>
              <th class="py-4 px-6 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 text-sm">
            <tr
              v-for="asset in filteredAssets"
              :key="asset.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="py-4 px-6 flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0"
                >
                  <i :class="[asset.icon, 'text-lg']"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ asset.name }}</p>
                  <p class="text-xs text-gray-400">#{{ asset.id }}</p>
                </div>
              </td>
              <td class="py-4 px-6 text-gray-600">{{ asset.category }}</td>
              <td class="py-4 px-6 text-gray-600">{{ asset.department }}</td>
              <td class="py-4 px-6 text-gray-600">{{ asset.acquisitionDate }}</td>
              <td class="py-4 px-6 font-medium text-gray-900">{{ asset.value }}</td>
              <td class="py-4 px-6">
                <Tag
                  :value="getStatusLabel(asset.status)"
                  :severity="getStatusSeverity(asset.status)"
                  class="text-[10px] font-bold px-2 py-0.5 rounded-full"
                />
              </td>
              <td class="py-4 px-6 text-right">
                <div class="inline-flex gap-2">
                  <Button
                    icon="pi pi-pencil"
                    severity="secondary"
                    text
                    rounded
                    class="text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    v-tooltip="'Editar'"
                    @click="editAsset(asset)"
                  />
                  <Button
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    rounded
                    class="text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    v-tooltip="'Excluir'"
                    @click="deleteAsset(asset.id)"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="filteredAssets.length === 0">
              <td colspan="7" class="py-12 text-center text-gray-400">
                <i class="pi pi-box text-3xl mb-2 block"></i>
                Nenhum ativo encontrado com os filtros selecionados.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals for Demo Interaction -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in p-6 space-y-4"
      >
        <div class="flex justify-between items-center pb-2 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">Novo Ativo de TI</h3>
          <Button
            icon="pi pi-times"
            text
            rounded
            severity="secondary"
            @click="showAddModal = false"
          />
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
              >Nome do Ativo</label
            >
            <InputText
              v-model="newAssetForm.name"
              placeholder="Ex: MacBook Pro M3"
              class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
                >Categoria</label
              >
              <InputText
                v-model="newAssetForm.category"
                placeholder="Ex: Laptop"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1"
                >Departamento</label
              >
              <InputText
                v-model="newAssetForm.department"
                placeholder="Ex: Engenharia"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Valor</label>
              <InputText
                v-model="newAssetForm.value"
                placeholder="R$ 15.000"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
              <select
                v-model="newAssetForm.status"
                class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none"
              >
                <option value="active">Ativo</option>
                <option value="stock">Estoque</option>
                <option value="maintenance">Manutenção</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button label="Cancelar" severity="secondary" outlined @click="showAddModal = false" />
          <Button
            label="Salvar"
            class="bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
            @click="saveNewAsset"
          />
        </div>
      </div>
    </div>
  </dashboard-layout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Tag from "primevue/tag";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout.vue";

import { BREADCRUMB_CLASSES } from "@/shared/components/breadcrumb";
import BaseBreadcrumb from "@/shared/components/breadcrumb/BaseBreadcrumb.vue";
import { useAtivosBreadcrumb } from "../composables/useAtivosBreadcrumb";

const { pageConfig, breadcrumbItems } = useAtivosBreadcrumb();

interface Asset {
  id: string;
  name: string;
  category: string;
  department: string;
  acquisitionDate: string;
  value: string;
  status: "active" | "stock" | "maintenance";
  icon: string;
}

// Initial Mock Assets Data
const assets = ref<Asset[]>([
  {
    id: "8421",
    name: "MacBook Pro M3",
    category: "Laptop",
    department: "Desenvolvimento",
    acquisitionDate: "2026-01-15",
    value: "R$ 18.500,00",
    status: "active",
    icon: "pi pi-laptop",
  },
  {
    id: "8419",
    name: 'Dell UltraSharp 27"',
    category: "Monitor",
    department: "Design",
    acquisitionDate: "2025-11-20",
    value: "R$ 3.800,00",
    status: "stock",
    icon: "pi pi-desktop",
  },
  {
    id: "8418",
    name: "iPhone 15 Pro",
    category: "Smartphone",
    department: "Vendas",
    acquisitionDate: "2026-03-05",
    value: "R$ 7.200,00",
    status: "active",
    icon: "pi pi-mobile",
  },
  {
    id: "8390",
    name: "Servidor Dell PowerEdge",
    category: "Servidor",
    department: "Data Center",
    acquisitionDate: "2024-05-10",
    value: "R$ 45.000,00",
    status: "maintenance",
    icon: "pi pi-server",
  },
  {
    id: "8388",
    name: "iPad Air",
    category: "Tablet",
    department: "Marketing",
    acquisitionDate: "2025-08-14",
    value: "R$ 5.900,00",
    status: "active",
    icon: "pi pi-tablet",
  },
  {
    id: "8374",
    name: "Switch Cisco 24p",
    category: "Redes",
    department: "TI Suporte",
    acquisitionDate: "2025-02-18",
    value: "R$ 9.400,00",
    status: "stock",
    icon: "pi pi-sitemap",
  },
]);

// Filters State
const searchQuery = ref("");
const statusFilter = ref("all");

// Modals State
const showAddModal = ref(false);
const newAssetForm = ref({
  name: "",
  category: "",
  department: "",
  value: "",
  status: "active" as "active" | "stock" | "maintenance",
});

// Computed Stats
const stats = computed(() => {
  const total = assets.value.length;
  const active = assets.value.filter((a) => a.status === "active").length;
  const stock = assets.value.filter((a) => a.status === "stock").length;
  const maintenance = assets.value.filter((a) => a.status === "maintenance").length;

  return [
    {
      title: "Total de Ativos",
      value: total,
      icon: "pi pi-desktop",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Em Uso",
      value: active,
      icon: "pi pi-user-edit",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Em Estoque",
      value: stock,
      icon: "pi pi-box",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Em Manutenção",
      value: maintenance,
      icon: "pi pi-cog",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];
});

// Computed Filtered Assets
const filteredAssets = computed(() => {
  return assets.value.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      asset.id.includes(searchQuery.value) ||
      asset.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus = statusFilter.value === "all" || asset.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Severity Helper
const getStatusSeverity = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "stock":
      return "warning";
    case "maintenance":
      return "danger";
    default:
      return "info";
  }
};

// Status Label Helper
const getStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Ativo";
    case "stock":
      return "Estoque";
    case "maintenance":
      return "Manutenção";
    default:
      return status;
  }
};

// Demo CRUD Operations
const saveNewAsset = () => {
  if (!newAssetForm.value.name) return;

  const id = String(Math.floor(8000 + Math.random() * 1000));
  const newAsset: Asset = {
    id,
    name: newAssetForm.value.name,
    category: newAssetForm.value.category || "Geral",
    department: newAssetForm.value.department || "TI",
    acquisitionDate: new Date().toISOString().slice(0, 10),
    value: newAssetForm.value.value || "R$ 0,00",
    status: newAssetForm.value.status,
    icon:
      newAssetForm.value.category?.toLowerCase() === "laptop" ? "pi pi-laptop" : "pi pi-desktop",
  };

  assets.value.unshift(newAsset);
  showAddModal.value = false;

  // Reset form
  newAssetForm.value = {
    name: "",
    category: "",
    department: "",
    value: "",
    status: "active",
  };
};

const editAsset = (asset: Asset) => {
  alert(`Editar ativo ${asset.name} (#${asset.id}) - Simulado`);
};

const deleteAsset = (id: string) => {
  if (confirm("Tem certeza que deseja excluir este ativo?")) {
    assets.value = assets.value.filter((a) => a.id !== id);
  }
};
</script>

<style scoped>
.fixed {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
