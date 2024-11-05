<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-900">
      Welcome, {{ userName }}
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

const userName = ref("");
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("authToken");
  userName.value = localStorage.getItem("userName") || "Guest";
  if (!token) {
    router.push("/login");
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
