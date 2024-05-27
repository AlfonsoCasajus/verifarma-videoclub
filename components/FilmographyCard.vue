

<template>
	<q-card class="filmography-card" flat bordered>
    <div class="poster-wrapper">
      <NuxtImg v-if="filmography.Poster !== 'N/A'" :src="filmography.Poster"  alt="Poster" class="poster" />
      <p v-else>No Poster</p>
    </div>
      <q-card-section class="card-info">
        <div class="text-h5 q-mt-sm q-mb-xs">{{ filmography.Title }}</div>
        <div class="text-caption text-grey">
          {{ filmography.Year }}
        </div>
      </q-card-section>
      <q-chip icon="movie" :color="chipColor" text-color="white" class="chip">{{ filmography.Type.toUpperCase() }}</q-chip>
	</q-card>
</template>

<script setup lang="ts">
import type { BasicMovie } from 'Movies';
import type { PropType } from 'vue';


const props = defineProps({
  filmography: {
    type: Object as PropType<BasicMovie>,
    required: true
  }
})

const chipColor = computed(() => {
  const type = props.filmography.Type;

  if (type === 'movie') return 'teal';
  else if (type === 'series') return 'orange';
  else return 'blue'
});

</script>

<style scoped lang="scss">
.filmography-card {
  display: flex;
  flex-direction: column;
	width: 275px;
  height: 450px;
  overflow: hidden;
  cursor: pointer;
  color: #000000;
  
  .poster-wrapper {
    width: 100%;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: grey;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
  
    .poster {
      width: 100%;
      overflow: hidden;
    }
    
    p {
      font-size: 32px;
      transform: rotate(-45deg);
      opacity: 0.5;
      color: white;
    }
  }

  .card-info {
    min-height: 150px;
  }

  .chip {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>