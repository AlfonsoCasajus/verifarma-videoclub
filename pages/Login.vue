<template>
	<div v-if="errorMsg" class="error-message">
		{{ errorMsg }}
	</div>
	<q-form
		class="q-gutter-md"
		@submit="onSubmit"
	>
		<q-input
			v-model="email"
			filled
			label="Email"
			type="email"
			bg-color="white"
			:rules="[ (val:string) => val && val.length > 0 || 'Email obligatorio']"
			lazy-rules
		/>

		<q-input v-model="password" bg-color="white" label="Contraseña" filled :type="isPwd ? 'password' : 'text'">
			<template #append>
				<q-icon
					:name="isPwd ? 'visibility_off' : 'visibility'"
					class="cursor-pointer"
					@click="isPwd = !isPwd"
				/>
			</template>
		</q-input>

		
		<div class="action-btns">
			<q-btn block label="Ingresar" type="submit" color="primary" :disable="!canLogin" />
		</div>
	</q-form>

	<q-separator inset style="margin: 1rem 0" color="white"/>

	<Socials />

	<div class="register-redirect-wrapper">
		<p>¿Aún no estas registrado?</p>
		<b><NuxtLink to="/register">Registrarme</NuxtLink></b>
	</div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'auth',
})

const router = useRouter()


const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isPwd = ref(true);

const errorMsg = ref('');

const onSubmit = async () => {
	try {
		const {message, token} = await authStore.login(email.value, password.value);
	
		if (token) {
			router.push({ path: 'browse/genre/all' });
		} else {
			errorMsg.value = message;
		}
	} catch (error) {
		console.error('Error al inicial sesion: ', error);
	}
}

const canLogin = computed(() => {
	return email.value && password.value;
})
</script>


<style scoped lang="scss">
	.error-message {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
		font-size: 18px;
		background-color: rgba(240, 36, 45, 0.5);
		border-radius: 4px;
	}

	.form-wrapper {
		margin: 0;
		.action-btns {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.register-redirect-wrapper {
			margin-top: 1rem;
			display: flex;
			align-items: center;
			justify-content: center;

			> p {
				display: contents;
			}
			a {
				margin-left: 0.25rem;
				color: #935EFC;
				cursor: pointer;
				text-decoration: none;
			}
		}

		.socials-login-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-evenly;

			.social-btn {
				height: 40px;
				width: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;


				img {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
</style>