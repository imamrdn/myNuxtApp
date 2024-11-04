<!-- App.vue -->
<template>
  <div>
    <header class="p-4 bg-blue-500 text-white">
      <h1>{{ appName }}</h1>
    </header>
    <NuxtPage />
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const appName = config.public.appName || "MyNuxtApp";
</script>

<style scoped>
header {
  text-align: center;
}
</style>
