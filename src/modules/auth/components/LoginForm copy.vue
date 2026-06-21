<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <div class="logo">🔐</div>
        <h1>Sistema de Campanhas</h1>
        <p>Faça login para gerenciar suas campanhas</p>
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin" novalidate>
        <!-- Email -->
        <div class="form-group" :class="{ 'has-error': emailError }">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <span class="input-icon">📧</span>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              :disabled="isLoading"
              @input="clearError"
              autocomplete="email"
            />
          </div>
          <span v-if="emailError" class="field-error">{{ emailError }}</span>
        </div>

        <!-- Senha -->
        <div class="form-group" :class="{ 'has-error': passwordError }">
          <label for="password">Senha</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Sua senha"
              :disabled="isLoading"
              @input="clearError"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-password"
              @click="togglePasswordVisibility"
              :title="showPassword ? 'Esconder senha' : 'Mostrar senha'"
            >
              {{ showPassword ? "🙈" : "👁️" }}
            </button>
          </div>
          <span v-if="passwordError" class="field-error">{{ passwordError }}</span>
        </div>

        <!-- Opções -->
        <div class="form-options">
          <label class="checkbox-label">
            <input v-model="rememberMe" type="checkbox" />
            <span>Lembrar-me</span>
          </label>
        </div>

        <!-- Erro -->
        <transition name="slide-fade">
          <div v-if="errorMessage" class="error-message">
            <span>⚠️</span>
            <span>{{ errorMessage }}</span>
          </div>
        </transition>

        <!-- Botão Login -->
        <button type="submit" :disabled="isLoading || !isFormValid" class="submit-btn">
          <span v-if="isLoading" class="spinner"></span>
          <span>{{ isLoading ? "Autenticando..." : "Entrar" }}</span>
        </button>

        <!-- Botões de teste -->
        <div class="test-buttons">
          <button type="button" class="test-btn admin" @click="fillTestCredentials('admin')">
            🧪 Admin
          </button>
          <button type="button" class="test-btn user" @click="fillTestCredentials('user')">
            🧪 Usuário
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from "../composables/useLogin";

const {
  email,
  password,
  rememberMe,
  showPassword,
  isLoading,
  errorMessage,
  emailError,
  passwordError,
  isFormValid,
  handleLogin,
  clearError,
  togglePasswordVisibility,
  fillTestCredentials,
} = useLogin();
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 1rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-header h1 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #718096;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  font-size: 1.1rem;
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #f7fafc;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.has-error .input-wrapper input {
  border-color: #fc8181;
}

.toggle-password {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
}

.field-error {
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  cursor: pointer;
  font-size: 0.9rem;
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left: 4px solid #c53030;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.test-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
}

.test-btn {
  padding: 0.625rem;
  border: 2px dashed #cbd5e0;
  border-radius: 0.5rem;
  background: #f7fafc;
  color: #4a5568;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.test-btn:hover {
  background: #edf2f7;
  border-color: #a0aec0;
}

.test-btn.admin:hover {
  border-color: #667eea;
  color: #667eea;
}

.test-btn.user:hover {
  border-color: #48bb78;
  color: #48bb78;
}

/* Animações */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
