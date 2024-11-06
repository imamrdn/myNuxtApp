<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-900">
      Welcome, {{ userData.name }}
    </h2>
    <p class="mt-4 text-gray-600">
      This is your dashboard. Here you can manage your account and access other
      features.
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const userData = ref({});
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    router.push("/login");
  } else {
    const storedUserData = localStorage.getItem("userData");
    userData.value = storedUserData
      ? JSON.parse(storedUserData)
      : { name: "Guest" };
  }
});

definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped>
.router-link-exact-active {
  @apply border-b-2 border-blue-600;
}
</style>
