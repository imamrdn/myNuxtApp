<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useNuxtApp } from "#app";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const { $axios } = useNuxtApp();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  try {
    const response = await $axios.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
      confirm_password: confirmPassword.value,
    });

    if (response.data.data && response.data.data.token) {
      localStorage.setItem("authToken", response.data.data.token);
      console.log("Registrasi berhasil:", response);
      router.push("/dashboard");
    } else {
      error.value = "Registration failed. Please try again.";
    }
  } catch (err) {
    console.error("Error saat registrasi:", err);
    error.value = "Registration failed. Please check your input.";
  }
};

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    router.push("/dashboard");
  }
});
</script>
