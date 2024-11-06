<!-- App.vue -->
<template>
  <div>
    <div
      v-if="flashMessage"
      :class="`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white ${flashTypeClass}`"
    >
      {{ flashMessage }}
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFlashMessage } from "~/composables/useFlashMessage";

const { message: flashMessage, type: flashType } = useFlashMessage();

const flashTypeClass = computed(() => {
  return flashType.value === "success" ? "bg-green-500" : "bg-red-500";
});
</script>

<style scoped>
header {
  text-align: center;
}
</style>
