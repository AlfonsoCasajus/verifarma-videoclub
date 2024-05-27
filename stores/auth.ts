interface AuthState {
    token: null | string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null
  }),
  getters: {
    getToken: state => state.token
  },
  actions: {
    setAuthToken (token: string | null) {
      this.token = token
    },
    async login (email: string, password: string) {
      const response: { message: string, token: string } = await $fetch('/api/auth/login', {
        method: 'post',
        body: { email, password }
      })

      this.setAuthToken(response.token)

      return { message: response.message, token: response.token }
    },

    logout () {
      this.setAuthToken(null)
      localStorage.removeItem('auth-token')
    },

    async register (email: string, password: string) {
      await $fetch('/api/auth/register', {
        method: 'post',
        body: { email, password }
      })
    }
  }
})
