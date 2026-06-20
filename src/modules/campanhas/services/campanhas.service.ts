import type { Campanha, CreateCampanhaDTO, UpdateCampanhaDTO } from "../types";

const delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

// Banco mockado de campanhas
const MOCK_CAMPANHAS: Campanha[] = [
  {
    id: 1,
    titulo: "Campanha de Verão 2024",
    descricao: "Promoção especial para temporada de verão",
    status: "ativa",
    orcamento: 50000,
    dataInicio: "2024-01-01",
    dataFim: "2024-03-31",
    criadaPor: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    titulo: "Black Friday",
    descricao: "Super promoção de black friday",
    status: "pausada",
    orcamento: 100000,
    dataInicio: "2024-11-20",
    dataFim: "2024-11-30",
    criadaPor: 1,
    createdAt: "2024-10-01T00:00:00Z",
    updatedAt: "2024-10-15T14:20:00Z",
  },
  {
    id: 3,
    titulo: "Lançamento Produto X",
    descricao: "Campanha de lançamento do novo produto",
    status: "encerrada",
    orcamento: 75000,
    dataInicio: "2024-02-01",
    dataFim: "2024-02-28",
    criadaPor: 2,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-03-01T09:00:00Z",
  },
];

let nextId = 4;

export const campanhasService = {
  async listar(): Promise<Campanha[]> {
    console.log("🌐 GET /api/campanhas");
    await delay(1000);

    console.log("✅ 200 - Campanhas listadas:", MOCK_CAMPANHAS.length);
    return [...MOCK_CAMPANHAS];
  },

  async obterPorId(id: number): Promise<Campanha> {
    console.log(`🌐 GET /api/campanhas/${id}`);
    await delay(600);

    const campanha = MOCK_CAMPANHAS.find((c) => c.id === id);

    if (!campanha) {
      console.log("❌ 404 - Campanha não encontrada");
      throw {
        response: {
          status: 404,
          data: { message: "Campanha não encontrada" },
        },
      };
    }

    console.log("✅ 200 - Campanha encontrada:", campanha.titulo);
    return { ...campanha };
  },

  async criar(dto: CreateCampanhaDTO): Promise<Campanha> {
    console.log("🌐 POST /api/campanhas", dto);
    await delay(1200);

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const novaCampanha: Campanha = {
      id: nextId++,
      ...dto,
      status: "ativa",
      criadaPor: user.id || 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    MOCK_CAMPANHAS.push(novaCampanha);

    console.log("✅ 201 - Campanha criada:", novaCampanha.titulo);
    return { ...novaCampanha };
  },

  async atualizar(id: number, dto: UpdateCampanhaDTO): Promise<Campanha> {
    console.log(`🌐 PUT /api/campanhas/${id}`, dto);
    await delay(800);

    const index = MOCK_CAMPANHAS.findIndex((c) => c.id === id);

    if (index === -1) {
      console.log("❌ 404 - Campanha não encontrada");
      throw {
        response: {
          status: 404,
          data: { message: "Campanha não encontrada" },
        },
      };
    }

    const campanhaExistente = MOCK_CAMPANHAS[index];
    if (!campanhaExistente) {
      console.log("❌ 404 - Campanha não encontrada");
      throw {
        response: {
          status: 404,
          data: { message: "Campanha não encontrada" },
        },
      };
    }

    const campanhaAtualizada: Campanha = {
      ...campanhaExistente,
      ...dto,
      updatedAt: new Date().toISOString(),
    } as Campanha;

    MOCK_CAMPANHAS[index] = campanhaAtualizada;

    console.log("✅ 200 - Campanha atualizada:", campanhaAtualizada.titulo);
    return { ...campanhaAtualizada };
  },

  async deletar(id: number): Promise<void> {
    console.log(`🌐 DELETE /api/campanhas/${id}`);
    await delay(700);

    const index = MOCK_CAMPANHAS.findIndex((c) => c.id === id);

    if (index === -1) {
      console.log("❌ 404 - Campanha não encontrada");
      throw {
        response: {
          status: 404,
          data: { message: "Campanha não encontrada" },
        },
      };
    }

    const campanhaRemovida = MOCK_CAMPANHAS.splice(index, 1)[0];
    if (!campanhaRemovida) {
      throw new Error("Campanha não encontrada");
    }
    console.log("✅ 200 - Campanha removida:", campanhaRemovida.titulo);
  },
};
