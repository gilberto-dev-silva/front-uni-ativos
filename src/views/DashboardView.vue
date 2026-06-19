<template>
  <div class="dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-left">
        <h1>📊 Dashboard</h1>
      </div>

      <div class="header-right">
        <div class="user-info">
          <span class="user-avatar">👤</span>
          <div class="user-details">
            <strong>{{ authStore.user?.name }}</strong>
            <small>{{ authStore.user?.email }}</small>
            <span class="role-badge" :class="authStore.user?.role">
              {{ authStore.user?.role }}
            </span>
          </div>
        </div>

        <nav class="nav-links">
          <router-link to="/dashboard" class="nav-link active"> 📊 Dashboard </router-link>
          <router-link to="/campanhas" class="nav-link"> 📢 Campanhas </router-link>
        </nav>

        <button @click="handleLogout" class="logout-btn">🚪 Sair</button>
      </div>
    </header>

    <!-- Conteúdo -->
    <main class="dashboard-content">
      <div class="welcome-section">
        <h2>Bem-vindo, {{ authStore.user?.name }}!</h2>
        <p>Você está autenticado e pode acessar todas as funcionalidades do sistema.</p>
      </div>

      <div class="quick-actions">
        <h3>Ações Rápidas</h3>
        <div class="actions-grid">
          <router-link to="/campanhas" class="action-card">
            <span class="action-icon">📢</span>
            <strong>Ver Campanhas</strong>
            <small>Gerenciar campanhas ativas</small>
          </router-link>

          <div class="action-card" @click="showTokenInfo">
            <span class="action-icon">🔑</span>
            <strong>Info Token</strong>
            <small>Ver informações da sessão</small>
          </div>
        </div>
      </div>

      <!-- Debug Info (apenas desenvolvimento) -->
      <div v-if="showDebug" class="debug-section">
        <h3>🔧 Informações de Debug</h3>
        <pre>{{ debugInfo }}</pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/auth.store";

const router = useRouter();
const authStore = useAuthStore();
const showDebug = ref(false);

const debugInfo = computed(() => ({
  user: authStore.user,
  token: authStore.token?.substring(0, 30) + "...",
  isAuthenticated: authStore.isAuthenticated,
  isAdmin: authStore.isAdmin,
  localStorage: {
    token: localStorage.getItem("token")?.substring(0, 30) + "...",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  },
}));

async function handleLogout() {
  await authStore.logout();
  router.push("/login");
}

function showTokenInfo() {
  showDebug.value = !showDebug.value;
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f7fafc;
}

.dashboard-header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 1rem;
}

.header-left h1 {
  font-size: 1.5rem;
  color: #2d3748;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  font-size: 2rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-details strong {
  color: #2d3748;
  font-size: 0.95rem;
}

.user-details small {
  color: #718096;
  font-size: 0.8rem;
}

.role-badge {
  display: inline-block;
  padding: 0.1rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  margin-top: 0.25rem;
}

.role-badge.admin {
  background: #c6f6d5;
  color: #22543d;
}

.role-badge.user {
  background: #bee3f8;
  color: #2a4365;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #4a5568;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #edf2f7;
}

.nav-link.active {
  background: #667eea;
  color: white;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #fed7d7;
  color: #c53030;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #feb2b2;
}

.dashboard-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-section h2 {
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.welcome-section p {
  color: #718096;
}

.quick-actions {
  margin-bottom: 2rem;
}

.quick-actions h3 {
  color: #4a5568;
  margin-bottom: 1rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-icon {
  font-size: 2rem;
}

.action-card strong {
  color: #2d3748;
}

.action-card small {
  color: #718096;
}

.debug-section {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.debug-section h3 {
  margin-bottom: 1rem;
  color: #f7fafc;
}

.debug-section pre {
  background: #1a202c;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.85rem;
}
</style>
