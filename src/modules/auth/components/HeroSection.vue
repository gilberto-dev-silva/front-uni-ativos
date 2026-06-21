<template>
  <div
    class="hidden md:flex md:w-1/2 bg-brand-gradient relative overflow-hidden items-center justify-center p-12 lg:p-24"
  >
    <div
      class="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full accent-glow blur-3xl"
    ></div>
    <div
      class="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full accent-glow blur-3xl opacity-50"
    ></div>
    <div class="relative z-10 text-center">
      <div
        class="mb-8 inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 backdrop-blur-sm"
      >
        <iconify-icon icon="lucide:cpu" class="text-6xl text-emerald-400"></iconify-icon>
      </div>
      <h1 class="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">AssetManager</h1>
      <p class="text-emerald-100/80 text-lg lg:text-xl max-w-md mx-auto leading-relaxed">
        Gestão inteligente de ativos de TI para empresas que buscam eficiência e controle absoluto.
      </p>
      <div class="mt-12 grid grid-cols-3 gap-6 opacity-40">
        <iconify-icon icon="lucide:monitor" class="text-3xl text-white mx-auto"></iconify-icon>
        <iconify-icon icon="lucide:server" class="text-3xl text-white mx-auto"></iconify-icon>
        <iconify-icon icon="lucide:smartphone" class="text-3xl text-white mx-auto"></iconify-icon>
      </div>
    </div>
  </div>
</template>
