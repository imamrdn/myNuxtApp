<template>
  <div>
    <h2>Dashboard</h2>
    <p>This is the dashboard page of your application.</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    router.push("/login");
  }
});
const handleLogout = () => {
  localStorage.removeItem("authToken");
  router.push("/login");
  console.log("User logged out");
};
</script>

<style lang="scss" scoped></style>
