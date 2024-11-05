<template>
  <div
    class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8 bg-gray-100 h-screen"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="email"
              required
              autocomplete="email"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium text-gray-900"
              >Password</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              autocomplete="current-password"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Sign Up</NuxtLink
        >
      </p>
    </div>
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
    localStorage.setItem("userName", response.data.data.user.name);
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
