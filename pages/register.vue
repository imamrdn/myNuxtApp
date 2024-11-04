<!-- pages/register.vue -->
<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-xl mb-4">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label class="block mb-1">Name</label>
        <input
          v-model="name"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>
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
      <div class="mb-4">
        <label class="block mb-1">Confirm Password</label>
        <input
          v-model="confirm_password"
          type="password"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded">
        Register
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { $axios } = useNuxtApp();

const name = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");

async function register() {
  try {
    const response = await $axios.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      confirm_password: confirm_password.value,
    });
    console.log("Registration successful:", response.data);
    router.push("/login");
  } catch (error) {
    console.error("Registration failed:", error);
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  text-align: center;
}
</style>
