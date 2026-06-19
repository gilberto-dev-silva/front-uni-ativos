import { onMounted } from "vue";
import { useCampanhasStore } from "../store/campanhas.store";

export function useCampanhas() {
  const store = useCampanhasStore();

  onMounted(() => {
    if (store.campanhas.length === 0) {
      store.carregarCampanhas();
    }
  });

  function formatarMoeda(valor: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function formatarData(data: string): string {
    return new Date(data).toLocaleDateString("pt-BR");
  }

  function getStatusColor(status: string): string {
    const cores = {
      ativa: "green",
      pausada: "orange",
      encerrada: "gray",
    };
    return cores[status as keyof typeof cores] || "gray";
  }

  return {
    ...store,
    formatarMoeda,
    formatarData,
    getStatusColor,
  };
}
