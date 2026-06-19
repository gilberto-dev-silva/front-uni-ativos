export interface Campanha {
  id: number;
  titulo: string;
  descricao: string;
  status: "ativa" | "pausada" | "encerrada";
  orcamento: number;
  dataInicio: string;
  dataFim: string;
  criadaPor: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampanhaDTO {
  titulo: string;
  descricao: string;
  orcamento: number;
  dataInicio: string;
  dataFim: string;
}

export interface UpdateCampanhaDTO extends Partial<CreateCampanhaDTO> {
  status?: "ativa" | "pausada" | "encerrada";
}
