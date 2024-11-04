<!-- App.vue -->
<template>
  <div>
    <header>
      <!-- <h1>{{ appName }}</h1> -->
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
