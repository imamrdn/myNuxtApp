import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiUrl,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  nuxtApp.provide("axios", api);
});
