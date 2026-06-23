<template>
  <div class="bg-[#07331A] p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
    <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500 opacity-20 blur-3xl"></div>
    <h4 class="font-bold text-lg mb-2 relative z-10">Gerar Relatório</h4>
    <p class="text-white/60 text-sm mb-4 relative z-10">
      Crie um relatório completo de depreciação de ativos do trimestre.
    </p>
    <Button
      label="Gerar Agora"
      severity="success"
      class="bg-emerald-500 border-emerald-500 hover:bg-emerald-400 relative z-10"
    />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
</script>
