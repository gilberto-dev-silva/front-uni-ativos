<template>
  <aside
    :class="[
      'sidebar-transition bg-[#07331A] text-white flex flex-col fixed inset-y-0 z-50',
      isCollapsed ? 'w-20' : 'w-64',
    ]"
  >
    <!-- Logo/Brand - mantém igual -->
    <div class="p-6 flex items-center justify-between border-b border-white/10">
      <div class="flex items-center gap-3 overflow-hidden">
        <div class="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
          <i class="pi pi-microchip text-white text-xl"></i>
        </div>
        <span
          v-show="!isCollapsed"
          class="text-xl font-bold tracking-tight whitespace-nowrap nav-text-transition"
        >
          AssetManager
        </span>
      </div>

      <Button
        icon="pi pi-angle-left"
        severity="secondary"
        text
        rounded
        class="text-white/60 hover:text-white transition-colors"
        @click="toggleSidebar"
        v-tooltip="isCollapsed ? 'Expandir menu' : 'Recolher menu'"
        :class="{ 'rotate-180': isCollapsed }"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <!-- Principal Section -->
      <div
        v-show="!isCollapsed"
        class="text-[10px] font-bold text-white/40 uppercase tracking-widest px-3 mb-2 whitespace-nowrap"
      >
        Principal
      </div>

      <!-- 🔄 ALTERADO: <a> para <router-link> -->
      <router-link
        v-for="item in mainNavItems"
        :key="item.id"
        :to="item.route"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
        :class="[
          isCollapsed ? 'justify-center' : '',
          isActiveRoute(item.route)
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5',
        ]"
      >
        <i
          :class="[
            item.icon,
            'text-xl shrink-0',
            isActiveRoute(item.route) ? 'text-emerald-400' : 'group-hover:text-emerald-400',
          ]"
        ></i>
        <span v-show="!isCollapsed" class="font-medium whitespace-nowrap">
          {{ item.label }}
        </span>
      </router-link>

      <!-- Operations Section -->
      <div
        v-show="!isCollapsed"
        class="text-[10px] font-bold text-white/40 uppercase tracking-widest px-3 mt-6 mb-2 whitespace-nowrap"
      >
        Operações
      </div>

      <!-- 🔄 ALTERADO: <a> para <router-link> -->
      <router-link
        v-for="item in operationsNavItems"
        :key="item.id"
        :to="item.route"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
        :class="[
          isCollapsed ? 'justify-center' : '',
          isActiveRoute(item.route)
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5',
        ]"
      >
        <i
          :class="[
            item.icon,
            'text-xl shrink-0',
            isActiveRoute(item.route) ? 'text-emerald-400' : 'group-hover:text-emerald-400',
          ]"
        ></i>
        <span v-show="!isCollapsed" class="font-medium whitespace-nowrap">
          {{ item.label }}
        </span>
      </router-link>

      <!-- System Section -->
      <div
        v-show="!isCollapsed"
        class="text-[10px] font-bold text-white/40 uppercase tracking-widest px-3 mt-6 mb-2 whitespace-nowrap"
      >
        Sistema
      </div>

      <!-- 🔄 ALTERADO: <a> para <router-link> -->
      <router-link
        v-for="item in systemNavItems"
        :key="item.id"
        :to="item.route"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
        :class="[
          isCollapsed ? 'justify-center' : '',
          isActiveRoute(item.route)
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5',
        ]"
      >
        <i
          :class="[
            item.icon,
            'text-xl shrink-0',
            isActiveRoute(item.route) ? 'text-emerald-400' : 'group-hover:text-emerald-400',
          ]"
        ></i>
        <span v-show="!isCollapsed" class="font-medium whitespace-nowrap">
          {{ item.label }}
        </span>
      </router-link>
    </nav>

    <!-- User Profile - mantém igual -->
    <div class="p-4 border-t border-white/10">
      <div
        class="flex items-center gap-3 p-2 rounded-xl bg-white/5 overflow-hidden"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <Avatar
          label="JS"
          size="large"
          class="bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/20 shrink-0"
        />
        <div v-show="!isCollapsed" class="flex-1 min-w-0 nav-text-transition">
          <p class="text-sm font-semibold truncate">João Silva</p>
          <p class="text-xs text-white/40 truncate">Admin TI</p>
        </div>
        <Button
          text
          rounded
          v-tooltip="'Sair'"
          severity="secondary"
          v-show="!isCollapsed"
          icon="pi pi-sign-out"
          @click="handleLogout"
          class="text-white/40 hover:text-white shrink-0"
        />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import { useRouter, useRoute } from "vue-router"; // 🆕 Adicionado useRoute
import { useAuthStore } from "@/modules/auth/store/auth.store";

const router = useRouter();
const route = useRoute(); // 🆕 Para verificar rota ativa
const authStore = useAuthStore();

// 🆕 Interface atualizada com 'route'
interface NavItem {
  id: string;
  label: string;
  icon: string;
  route: string; // 🆕 Nova propriedade
}

const props = defineProps<{
  isCollapsed: boolean;
}>();

const emit = defineEmits<{
  toggle: [];
}>();

const toggleSidebar = () => {
  emit("toggle");
};

// 🆕 Função para verificar se a rota está ativa
const isActiveRoute = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};

computed(() => ({
  user: authStore.user,
  token: authStore.token?.substring(0, 30) + "...",
  isAuthenticated: authStore.isAuthenticated,
  isAdmin: authStore.isAdmin,
  localStorage: {
    token: localStorage.getItem("token")?.substring(0, 30) + "...",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  },
}));

// 🆕 Itens atualizados com rotas reais
const mainNavItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "pi pi-th-large", route: "/dashboard" },
  { id: "assets", label: "Ativos de TI", icon: "pi pi-desktop", route: "/ativos" }, // 🆕 Rota real
  { id: "inventory", label: "Inventário", icon: "pi pi-box", route: "/inventario" },
];

const operationsNavItems: NavItem[] = [
  { id: "maintenance", label: "Manutenção", icon: "pi pi-wrench", route: "/manutencao" },
  { id: "licenses", label: "Licenças", icon: "pi pi-key", route: "/licencas" },
  { id: "reports", label: "Relatórios", icon: "pi pi-chart-bar", route: "/relatorios" },
];

const systemNavItems: NavItem[] = [
  { id: "settings", label: "Configurações", icon: "pi pi-cog", route: "/configuracoes" },
];

async function handleLogout() {
  await authStore.logout();
  router.push("/login");
}
</script>

<style scoped>
.sidebar-transition {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-text-transition {
  transition:
    opacity 0.2s ease-in-out,
    width 0.2s ease-in-out;
}

/* 🆕 Estilo adicional para router-link-active */
.router-link-active {
  /* Já estamos usando classes condicionais, mas isso garante fallback */
}
</style>
