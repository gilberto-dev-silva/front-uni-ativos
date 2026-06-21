<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-white">
    <hero-section />
    <login-form />
  </div>
</template>

<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import HeroSection from "../components/HeroSection.vue";
</script>
