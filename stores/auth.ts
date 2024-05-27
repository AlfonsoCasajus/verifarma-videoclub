export const useAuthStore = defineStore('auth', {
	state: () => ({
	}),
	getters: {
	},
	actions: {
	  async login(email: string, password: string) {
		const response: { message: string, token: string } = await $fetch('/api/auth/login', {
			method: 'post',
			body: { email, password }
		});

		localStorage.setItem('auth-token', response.token);
		
		return { message: response.message, token: response.token };
	  },

	  async register(email: string, password: string) {
		const response: any = await $fetch('/api/auth/register', {
			method: 'post',
			body: { email, password }
		});
	  },
	},
  })