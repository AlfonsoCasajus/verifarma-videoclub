<template>
		<q-form
		  @submit="onSubmit"
		  class="q-gutter-md"
		>
		  <q-input
		  v-model="email"
		  	filled
			label="Email"
			type="email"
			:rules="[ (val:any) => val && val.length > 0 || 'Email obligatorio']"
			lazy-rules
		  />
	
		  <q-input v-model="password" label="Contraseña" filled :type="isPwd ? 'password' : 'text'">
				<template v-slot:append>
					<q-icon
						:name="isPwd ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isPwd = !isPwd"
					/>
				</template>
			</q-input>
		
		  <q-input v-model="password" label="Repetir contraseña" filled :type="isPwd ? 'password' : 'text'">
				<template v-slot:append>
					<q-icon
						:name="isPwd ? 'visibility_off' : 'visibility'"
						class="cursor-pointer"
						@click="isPwd = !isPwd"
					/>
				</template>
			</q-input>

			
			<div class="action-btns">
				<q-btn block label="Registrarme" type="submit" color="primary" />
			</div>
			
			<q-separator inset />

			<Socials />

            <div class="register-redirect-wrapper">
                <p>Ya tienes una cuenta?</p>
                <b><NuxtLink to="/login">Ingresar</NuxtLink></b>
            </div>
		</q-form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const router = useRouter()

const email = ref('');
const password = ref('');
const isPwd = ref(true);


const onSubmit = () => {
	router.push({ name: 'movies' });
}
</script>


<style scoped lang="scss">


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
</style>