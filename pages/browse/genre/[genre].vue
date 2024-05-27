<template>
  <section>
    <div class="filters-wrapper">
      <q-input
        :model-value="filters.searchQuery"
        filled
        bg-color="white"
        label="Buscar..."
        :rules="[ (val:string) => val && val.length >= 3 || 'Busqueda minima de 3 caracteres']"
        @update:model-value="handleSearchQuery"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div>
      <div v-if="filmographies.length" class="films-wrapper">
        <FilmographyCard
          v-for="(film, index) of filmographies"
          :key="index"
          :filmography="film"
          class="film"
          @click="$router.push({ path: `/browse/${film.imdbID}` })"
        />
      </div>
      <div v-else class="empty-wrapper">
        <EmptyMessage message="No hay elementos que mostrar. La busqueda debe ser de por lo menos 3 caracteres" />
      </div>
      <q-inner-loading
        :showing="isFetchingFilms"
        label="Buscando..."
      />
    </div>
    <div class="pagination">
      <q-pagination
        v-if="totalPages > 1"
        :model-value="filters.page"
        color="purple"
        :max="totalPages"
        :max-pages="6"
        size="20px"
        boundary-numbers
        @update:model-value="handlePageChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Filter } from 'Filmography'

definePageMeta({
  layout: 'navigation'
})

const route = useRoute()
const genre = route.params.genre as 'movie' | 'series' | 'episode' | 'all'

const filters = reactive<Filter>({
  page: 1,
  searchQuery: '',
  type: genre,
  itemsPerPage: 10
})

const filmographiesStore = useFilmographiesStore()

const filmographies = computed(() => filmographiesStore.getFilmographies)

const totalPages = computed(() => {
  const totalFilmographies = filmographiesStore.getTotalFilmographies

  return Math.ceil(totalFilmographies / filters.itemsPerPage)
})

onMounted(() => {
  fetchFilmographies()
})

const isFetchingFilms = ref(false)

const fetchFilmographies = async () => {
  isFetchingFilms.value = true
  try {
    await filmographiesStore.fetchFilmographies(filters)
  } catch (error) {
    console.error('Error fetching films: ', error)
  }
  isFetchingFilms.value = false
}

let searchQueryTimeoutId: NodeJS.Timeout | null = null
const handleSearchQuery = (query: string | number | null) => {
  filters.searchQuery = query
  if (searchQueryTimeoutId) { clearTimeout(searchQueryTimeoutId) }

  // Timeout to limit api calls
  searchQueryTimeoutId = setTimeout(() => {
    fetchFilmographies()
  }, 500)
}

const handlePageChange = (selectedPage: number) => {
  filters.page = selectedPage
  fetchFilmographies()
}
</script>

<style scoped lang="scss">
section {
	height: 100%;

	.filters-wrapper {
		margin-bottom: 1rem;
	}

	.films-wrapper {
		display: flex;
		align-items: center;
		flex-wrap: wrap;

		.film {
			margin: 0 1rem 1rem 0;
		}
	}

	.empty-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

</style>
