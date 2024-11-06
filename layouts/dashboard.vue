<template>
  <div class="flex min-h-full flex-col bg-gray-100">
    <header class="bg-white outline outline-1 outline-gray-300">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-12 items-center">
          <div class="flex">
            <div class="shrink-0">
              <h1 class="text-xl font-bold text-blue-600">Dashboard</h1>
            </div>
          </div>
          <div class="flex">
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-gray-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
    <header class="bg-white outline outline-1 outline-gray-300">
      <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex gap-8">
            <NuxtLink to="/dashboard" class="text-md py-5">Home</NuxtLink>

            <div v-if="isSuperAdmin" class="flex gap-8">
              <NuxtLink to="/dashboard/users" class="text-md py-5"
                >Users</NuxtLink
              >
              <NuxtLink to="/dashboard/roles" class="text-md py-5"
                >Roles</NuxtLink
              >
              <NuxtLink to="/dashboard/permissions" class="text-md py-5"
                >Permissions</NuxtLink
              >
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isSuperAdmin = ref(false);
const router = useRouter();

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("authToken");

  if (
    !token ||
    !userData ||
    !userData.roles.some((role) => role.name === "super-admin")
  ) {
    router.push("/dashboard");
  } else {
    isSuperAdmin.value = true;
  }
});

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  router.push("/login");
};
</script>

<style scoped>
.router-link-exact-active {
  @apply border-b-2 border-blue-600;
}
</style>
