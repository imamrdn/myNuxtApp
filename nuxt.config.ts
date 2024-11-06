export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["~/plugins/axios.js"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://127.0.0.1:8000/api",
    },
  },
});
