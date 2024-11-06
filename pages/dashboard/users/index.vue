<template>
  <div v-if="loading" class="text-center py-10">
    <span>Loading...</span>
  </div>
  <div v-else-if="error" class="text-center py-10 text-red-500">
    <span>{{ error }}</span>
  </div>
  <div
    v-else
    class="relative overflow-x-auto outline outline-1 outline-gray-300"
  >
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 outline outline-1 outline-gray-300"
      >
        <tr>
          <th scope="col" class="px-6 py-3">No</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Roles</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">{{ number++ }}</td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ user.name }}
          </th>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">
            <span v-if="user.roles && user.roles.length > 0">
              {{ user.roles.map((role) => role.name).join(", ") }}
            </span>
            <span v-else>No roles assigned</span>
          </td>
          <td class="px-6 py-4 text-right">
            <NuxtLink
              :to="`/dashboard/users/${user.id}`"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useNuxtApp } from "#app";

const users = ref([]);
const loading = ref(true);
const error = ref("");
const { $axios } = useNuxtApp();
let number = 1;

definePageMeta({
  layout: "dashboard",
});

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const response = await $axios.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    users.value = response.data.data;
  } catch (err) {
    console.error("Error saat mengambil data pengguna:", err);
    error.value = "Gagal mengambil data pengguna.";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Style scoped */
</style>
