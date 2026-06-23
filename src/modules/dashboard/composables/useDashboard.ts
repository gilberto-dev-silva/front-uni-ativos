import { ref } from "vue";
import type { StatCard, RecentAsset, Alert, InventoryItem } from "../types/dashboard";

export function useDashboard() {
  const statsCards = ref<StatCard[]>([
    {
      title: "Total de Ativos",
      value: "1,284",
      change: "+4.2%",
      icon: "pi pi-desktop",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      badgeColor: "bg-emerald-50",
      badgeTextColor: "text-emerald-500",
    },
    {
      title: "Alertas Pendentes",
      value: 12,
      change: "Crítico",
      icon: "pi pi-exclamation-triangle",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      badgeColor: "bg-red-50",
      badgeTextColor: "text-red-600",
    },
    {
      title: "Manutenções (Set)",
      value: 38,
      change: "Próximo",
      icon: "pi pi-clock",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      badgeColor: "bg-amber-50",
      badgeTextColor: "text-amber-600",
    },
    {
      title: "Taxa de Saúde",
      value: "98.4%",
      change: "Estável",
      icon: "pi pi-check-circle",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      badgeColor: "bg-emerald-50",
      badgeTextColor: "text-emerald-600",
    },
  ]);

  const recentAssets = ref<RecentAsset[]>([
    {
      id: "8421",
      name: "MacBook Pro M3",
      department: "Desenvolvimento",
      time: "Hoje, 10:24",
      status: "active",
      icon: "pi pi-laptop",
    },
    {
      id: "8419",
      name: 'Dell UltraSharp 27"',
      department: "Design",
      time: "Ontem, 16:45",
      status: "stock",
      icon: "pi pi-desktop",
    },
    {
      id: "8418",
      name: "iPhone 15 Pro",
      department: "Vendas",
      time: "Ontem, 14:30",
      status: "active",
      icon: "pi pi-mobile",
    },
  ]);

  const criticalAlerts = ref<Alert[]>([
    {
      id: "1",
      message: "Servidor S04 superaquecendo",
      location: "Data Center",
      time: "Há 5 min",
      severity: "critical",
    },
    {
      id: "2",
      message: "Licença Adobe vence em 3 dias",
      location: "TI Geral",
      time: "Há 1 hora",
      severity: "warning",
    },
    {
      id: "3",
      message: "Fim de garantia: Note #720",
      location: "Suporte",
      time: "Ontem",
      severity: "warning",
    },
  ]);

  const inventoryData = ref<InventoryItem[]>([
    { category: "Desktop", percentage: 85, color: "bg-emerald-500" },
    { category: "Laptop", percentage: 60, color: "bg-emerald-500" },
    { category: "Mobile", percentage: 40, color: "bg-amber-400" },
    { category: "Periféricos", percentage: 95, color: "bg-blue-500" },
    { category: "Servidores", percentage: 25, color: "bg-emerald-500" },
    { category: "Outros", percentage: 15, color: "bg-gray-200" },
  ]);

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

  return {
    statsCards,
    recentAssets,
    criticalAlerts,
    inventoryData,
    getStatusSeverity,
    getStatusLabel,
  };
}
