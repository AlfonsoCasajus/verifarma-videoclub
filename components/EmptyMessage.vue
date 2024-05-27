<template>
  <div class="message-wrapper">
    <q-icon size="35px" name="movie" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  message: {
    type: String,
    required: false,
    default: 'No hay elementos para mostrar'
  }
})

</script>

<style scoped lang="scss">
.message-wrapper {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #fafafa;
	border-radius: 4px;
	font-size: 26px;
	background: rgb(1,203,146);
	background: linear-gradient(
		90deg, rgba(1,203,146,1) 0%,
		rgba(13,176,196,1) 30%,
		rgba(54,139,243,1) 62%,
		rgba(121,107,249,1) 82%,
		rgba(148,94,252,1) 100%
	);

	p {
		text-align: center;
		margin: 0;
	}
}
</style>
