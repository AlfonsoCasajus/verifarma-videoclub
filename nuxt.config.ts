// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui', '@nuxt/image', '@nuxt/eslint'],
  runtimeConfig: {
    public: {
      OMDB_URL: process.env.VUE_APP_OMDB_URL,
      OMDB_API_KEY: process.env.VUE_APP_OMDB_API_KEY
    }
  },
  routeRules: {
    '/': { redirect: '/login' }
  }
})
