<template>
  <div
    class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8 bg-gray-100 h-screen"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900"
      >
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              v-model="name"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            />
          </div>
        </div>

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
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900"
            >Password</label
          >
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="password"
              required
              autocomplete="new-password"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            for="confirm_password"
            class="block text-sm font-medium text-gray-900"
            >Confirm Password</label
          >
          <div class="mt-2">
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              v-model="confirmPassword"
              required
              autocomplete="new-password"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 p-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <a href="/login" class="font-semibold text-blue-600 hover:text-blue-500"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useNuxtApp } from "#app";
import { useFlashMessage } from "~/composables/useFlashMessage";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const { $axios } = useNuxtApp();
const { setFlashMessage } = useFlashMessage();

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
      setFlashMessage("Registrasi berhasil!", "success");
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
