<!-- pages/login.vue -->
<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl mb-4">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label class="block mb-1">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Password</label>
        <input
          v-model="password"
          type="password"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const { $axios } = useNuxtApp();

const email = ref("");
const password = ref("");

async function login() {
  try {
    const response = await $axios.post("/login", {
      email: email.value,
      password: password.value,
    });
    console.log("Login successful:", response.data);
    router.push("/");
  } catch (error) {
    console.error("Login failed:", error);
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  text-align: center;
}
</style>
