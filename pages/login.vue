<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useNuxtApp } from "#app";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const { $axios } = useNuxtApp();

const handleLogin = async () => {
  try {
    const response = await $axios.post("/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("authToken", response.data.data.token);
    console.log("Login berhasil:", response);
    router.push("/dashboard");
  } catch (err) {
    console.error("Error saat login:", err);
    error.value = "Login gagal. Cek email dan password Anda.";
  }
};

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    router.push("/dashboard");
  }
});
</script>
