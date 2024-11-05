<template>
  <div class="flex min-h-full flex-col bg-gray-100">
    <header class="bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex">
            <div class="shrink-0">
              <h1 class="text-2xl font-bold text-indigo-600">Dashboard</h1>
            </div>
          </div>
          <div class="flex">
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold text-gray-900">
          Welcome, {{ userName }}
        </h2>
        <p class="mt-4 text-gray-600">
          This is your dashboard. Here you can manage your account and access
          other features.
        </p>
      </div>
    </main>
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

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  router.push("/login");
  console.log("User logged out");
};
</script>

<style lang="scss" scoped></style>
