import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Campanha, CreateCampanhaDTO } from "../types";
import { campanhasService } from "../services/campanhas.service";

export const useCampanhasStore = defineStore("campanhas", () => {
  const campanhas = ref<Campanha[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const campanhasAtivas = computed(() => campanhas.value.filter((c) => c.status === "ativa"));

  const totalOrcamento = computed(() =>
    campanhas.value.reduce((total, c) => total + c.orcamento, 0),
  );

  // Actions
  async function carregarCampanhas() {
    loading.value = true;
    error.value = null;

    console.log("📊 Carregando campanhas...");

    try {
      campanhas.value = await campanhasService.listar();
      console.log("✅ Campanhas carregadas:", campanhas.value.length);
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao carregar campanhas";
      console.error("❌ Erro:", error.value);
    } finally {
      loading.value = false;
    }
  }

  async function criarCampanha(dto: CreateCampanhaDTO) {
    loading.value = true;
    error.value = null;

    try {
      const novaCampanha = await campanhasService.criar(dto);
      campanhas.value.push(novaCampanha);
      console.log("✅ Campanha criada:", novaCampanha.titulo);
      return novaCampanha;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao criar campanha";
      console.error("❌ Erro:", error.value);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deletarCampanha(id: number) {
    loading.value = true;
    error.value = null;

    try {
      await campanhasService.deletar(id);
      campanhas.value = campanhas.value.filter((c) => c.id !== id);
      console.log("✅ Campanha deletada");
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao deletar campanha";
      console.error("❌ Erro:", error.value);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    // Estado
    campanhas,
    loading,
    error,

    // Getters
    campanhasAtivas,
    totalOrcamento,

    // Actions
    carregarCampanhas,
    criarCampanha,
    deletarCampanha,
  };
});
