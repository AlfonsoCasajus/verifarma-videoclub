<template>
  <div class="socials-login-wrapper">
    <span v-for="(social, index) of socials" :key="index" class="social-btn" disabled>
      <q-tooltip anchor="top middle">
        Deshabilitado
      </q-tooltip>

      <NuxtImg :src="`images/logos/${social.logoImg}`" :alt="`Ingreso con ${social.name}`" />
    </span>
  </div>
</template>

<script setup lang="ts">
const socials = [
  {
    name: 'Google',
    logoImg: 'logo_google.png'
  },
  {
    name: 'Twitter',
    logoImg: 'logo_twitter.png'
  },
  {
    name: 'Facebook',
    logoImg: 'logo_facebook.svg'
  }
]
</script>

<style scoped lang="scss">
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
