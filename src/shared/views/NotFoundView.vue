<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Página não encontrada</p>
    <router-link to="/dashboard">Voltar ao Dashboard</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem;
}

.not-found h1 {
  font-size: 6rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.5rem;
  color: #718096;
  margin-bottom: 2rem;
}

.not-found a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}
</style>
