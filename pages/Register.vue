<template>
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

    <q-input
      v-model="password"
      bg-color="white"
      label="Contraseña"
      filled
      :type="isPwdVisible ? 'password' : 'text'"
      :rules="[ (val:string) => val && val.length >= 5 || 'Minimo 5 caracteres']"
    >
      <template #append>
        <q-icon
          :name="isPwdVisible ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwdVisible = !isPwdVisible"
        />
      </template>
    </q-input>

    <q-input
      v-model="repeatedPassword"
      label="Repetir contraseña"
      bg-color="white"
      filled
      :type="isRepeatedPwdVisible ? 'password' : 'text'"
      :rules="[ (val:string) => val && val === password || 'Las contraseñas deben coincidir']"
    >
      <template #append>
        <q-icon
          :name="isRepeatedPwdVisible ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isRepeatedPwdVisible = !isRepeatedPwdVisible"
        />
      </template>
    </q-input>

    <div class="action-btns">
      <q-btn block label="Registrarme" type="submit" color="primary" :disabled="!canRegister" />
    </div>

    <q-separator inset color="white" />

    <Socials />

    <div class="register-redirect-wrapper">
      <p>Ya tienes una cuenta?</p>
      <b><NuxtLink to="/login">Ingresar</NuxtLink></b>
    </div>
  </q-form>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const router = useRouter()

const email = ref('')
const password = ref('')
const isPwdVisible = ref(true)
const repeatedPassword = ref('')
const isRepeatedPwdVisible = ref(true)

const canRegister = computed(() => {
  return email.value && password.value && password.value === repeatedPassword.value
})

const onSubmit = () => {
  router.push({ name: '/browse/all' })
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
