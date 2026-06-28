import { computed, type ComputedRef } from "vue";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";
import type { BreadcrumbItem } from "@/shared/components/breadcrumb";

interface UseAtivosBreadcrumbReturn {
  pageConfig: ComputedRef<BreadcrumbItem>;
  breadcrumbItems: ComputedRef<BreadcrumbItem[]>;
  isLoading: ComputedRef<boolean>;
  error: ComputedRef<string | null>;
}

export function useAtivosBreadcrumb(): UseAtivosBreadcrumbReturn {
  const route: RouteLocationNormalizedLoaded = useRoute();

  const pageConfig = computed<BreadcrumbItem>(() => ({
    route: "/ativos",
    label: "Ativos de TI",
    icon: "pi pi-desktop",
  }));

  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [
      {
        route: "/ativos",
        label: "Ativos de TI",
        icon: "pi pi-desktop",
      },
    ];

    if (route.name === "AtivosCreate") {
      items.push({
        label: "Novo Ativo",
        icon: "pi pi-plus-circle",
      });
    } else if (route.name === "AtivosEdit") {
      items.push({
        icon: "pi pi-pencil",
        label: "Editar Ativo",
      });
    } else if (route.name === "AtivosDetails") {
      items.push({
        icon: "pi pi-info-circle",
        label: "Detalhes do Ativos",
      });
    }

    return items;
  });

  const isLoading = computed<boolean>(() => false);
  const error = computed<string | null>(() => null);

  return {
    error,
    isLoading,
    pageConfig,
    breadcrumbItems,
  };
}
