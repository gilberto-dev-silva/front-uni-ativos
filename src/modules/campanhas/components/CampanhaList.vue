<template>
  <div class="campanhas-container">
    <div class="campanhas-header">
      <h2>Campanhas</h2>
      <div class="header-stats">
        <span class="stat">
          Total: <strong>{{ campanhas.length }}</strong>
        </span>
        <span class="stat">
          Ativas: <strong>{{ campanhasAtivas.length }}</strong>
        </span>
        <span class="stat">
          Orçamento: <strong>{{ formatarMoeda(totalOrcamento) }}</strong>
        </span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando campanhas...</p>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="error">
      <p>❌ {{ error }}</p>
      <button @click="carregarCampanhas">Tentar novamente</button>
    </div>

    <!-- Lista de Campanhas -->
    <div v-else class="campanhas-grid">
      <div
        v-for="campanha in campanhas"
        :key="campanha.id"
        class="campanha-card"
        :class="`status-${campanha.status}`"
      >
        <div class="card-header">
          <h3>{{ campanha.titulo }}</h3>
          <span class="status-badge" :class="campanha.status">
            {{ campanha.status }}
          </span>
        </div>

        <p class="descricao">{{ campanha.descricao }}</p>

        <div class="card-details">
          <div class="detail">
            <span>💰 Orçamento:</span>
            <strong>{{ formatarMoeda(campanha.orcamento) }}</strong>
          </div>
          <div class="detail">
            <span>📅 Início:</span>
            <strong>{{ formatarData(campanha.dataInicio) }}</strong>
          </div>
          <div class="detail">
            <span>📅 Fim:</span>
            <strong>{{ formatarData(campanha.dataFim) }}</strong>
          </div>
        </div>

        <div class="card-actions">
          <button @click="handleDelete(campanha.id)" class="btn-delete">🗑️ Deletar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCampanhas } from "../composables/useCampanhas";

const {
  campanhas,
  campanhasAtivas,
  totalOrcamento,
  loading,
  error,
  carregarCampanhas,
  deletarCampanha,
  formatarMoeda,
  formatarData,
} = useCampanhas();

async function handleDelete(id: number) {
  if (confirm("Tem certeza que deseja deletar esta campanha?")) {
    try {
      await deletarCampanha(id);
    } catch (err) {
      alert("Erro ao deletar campanha");
    }
  }
}
</script>

<style scoped>
.campanhas-container {
  padding: 2rem;
}

.campanhas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.campanhas-header h2 {
  font-size: 1.8rem;
  color: #2d3748;
}

.header-stats {
  display: flex;
  gap: 1.5rem;
}

.stat {
  background: #f7fafc;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: #c53030;
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.campanhas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.campanha-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #e2e8f0;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.campanha-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.campanha-card.status-ativa {
  border-left-color: #48bb78;
}

.campanha-card.status-pausada {
  border-left-color: #ed8936;
}

.campanha-card.status-encerrada {
  border-left-color: #a0aec0;
  opacity: 0.8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-header h3 {
  font-size: 1.2rem;
  color: #2d3748;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.ativa {
  background: #c6f6d5;
  color: #22543d;
}

.status-badge.pausada {
  background: #fefcbf;
  color: #744210;
}

.status-badge.encerrada {
  background: #e2e8f0;
  color: #2d3748;
}

.descricao {
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #4a5568;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background: #fed7d7;
  color: #c53030;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.btn-delete:hover {
  background: #feb2b2;
}
</style>
