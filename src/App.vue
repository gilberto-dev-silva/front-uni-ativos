<template>
  <main class="font-test">
    <p class="font-test__label">Teste da fonte General Sans</p>
    <h1 class="font-test__title">Aa Bb Cc Dd Ee Ff 123</h1>
    <p class="font-test__subtitle">
      Se a fonte carregou, esse texto deve parecer diferente da fonte padrão.
    </p>
  </main>
</template>

<style lang="scss" scoped>
.font-test {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 0.75rem;
  text-align: center;
  font-family: "General Sans", sans-serif;
}

.font-test__label {
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.7;
}

.font-test__title {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1;
}

.font-test__subtitle {
  font-size: 1rem;
  opacity: 0.85;
}
</style>
