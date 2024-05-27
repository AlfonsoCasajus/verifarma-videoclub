<template>
  <section v-if="!isFetchingFilmography && filmography">
    <q-btn round icon="arrow_back" class="previous-btn" color="purple" @click="$router.back()" />
    <div class="main-column">
      <div class="info">
        <NuxtImg v-if="filmography.Poster !== 'N/A'" :src="filmography.Poster" alt="Poster" class="poster" />
        <span>
          <h1>{{ filmography.Title }}</h1>
          <span class="details">
            <span class="detail">
              <q-icon class="icon" name="calendar_month" />{{ filmography.Year }} -
            </span>
            <span class="detail">
              <q-icon class="icon" name="movie" />{{ filmography.Director }} -
            </span>
            <span class="detail">
              <q-icon class="icon" name="schedule" />{{ filmography.Runtime }} -
            </span>
            <span class="detail">
              <q-icon class="icon" name="public" />{{ filmography.Country }}
            </span>
          </span>

          <div>
            <q-chip v-for="(genre, index) of genresArray" :key="index" color="orange" text-color="white">
              {{ genre }}
            </q-chip>
          </div>
          <div>
            <q-chip v-for="(actor, index) of castArray" :key="index" color="blue" text-color="white">
              {{ actor }}
            </q-chip>
          </div>
        </span>
      </div>

      <p class="plot">
        {{ filmography.Plot }}
      </p>
    </div>
  </section>
  <q-inner-loading
    v-else
    :showing="isFetchingFilmography"
    label="Buscando..."
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navigation'
})

const route = useRoute()
const filmographyId = route.params.id

const filmographyStore = useFilmographiesStore()
const filmography = computed(() => filmographyStore.getFilmography)

onMounted(() => {
  fetchFilmography()
})

const isFetchingFilmography = ref(false)

const fetchFilmography = async () => {
  isFetchingFilmography.value = true
  try {
    await filmographyStore.fetchFilmography(String(filmographyId))
  } catch (error) {
    console.error('Error fetching movie: ', error)
  }
  isFetchingFilmography.value = false
}

// Transform cast  an array
const castArray = computed(() => {
  if (!filmography.value) { return [] }
  return filmography.value.Actors.split(',')
})

// Transform genres  an array
const genresArray = computed(() => {
  if (!filmography.value) { return [] }
  return filmography.value.Genre.split(',')
})
</script>

<style scoped lang="scss">
section {
	.previous-btn {
		position: absolute;
		left: 1rem;
		top: 1rem;
	}

	.main-column {
		height: 100%;
		padding: 1rem;
		margin: auto;
		max-width: 850px;
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		background-color: #202830e6;

		.info {
			display: flex;
			margin-bottom: 1rem;

			.poster {
				margin-right: 1rem;
				width: 250px;
				border-radius: 4px;
				align-self: center;
			}

			h1 {
				font-size: 64px;
				margin: 0;
			}

			.details {
				display: flex;
				align-items: center;

				.detail {
					display: flex;
					align-items: center;
					margin-right: 0.25rem;

					.icon {
						margin-right: 0.25rem;
					}
				}

			}
		}

		.plot {
			font-size: 20px;
		}

    @media screen and (max-width: 992px) {

      .info{
        flex-direction: column;

        .poster {
          margin-right: 0;
          margin-bottom: 1rem;
          width: 200px;
        }

        h1 {
          font-size: 32px;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .details {
          margin: 1rem 0;
          align-items: flex-start;
          flex-direction: column;
        }
      }
    }

	}

}
</style>
