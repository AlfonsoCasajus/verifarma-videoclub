import type { Filter, BasicFilmography, DetailedFilmography } from 'Filmography'

interface FilmographyState {
  filmographies: BasicFilmography[];
  filmography: DetailedFilmography | null;
  totalFilmographies: number;
}

export const useFilmographiesStore = defineStore('filmography', {
  state: (): FilmographyState => ({
    filmographies: [],
    filmography: null,
    totalFilmographies: 0
  }),
  getters: {
    getFilmographies: state => state.filmographies,
    getFilmography: state => state.filmography,
    getTotalFilmographies: state => state.totalFilmographies
  },
  actions: {
    async fetchFilmographies ({ searchQuery, page, type }: Filter) {
      const config = useRuntimeConfig()
      const API_KEY = config.public.OMDB_API_KEY
      const OMDB_URL = config.public.OMDB_URL

      let baseUrl = `${OMDB_URL}/?s=${searchQuery}&page=${page}&apikey=${API_KEY}`
      if (type !== 'all') { baseUrl += `&type=${type}` }

      const response: any = await $fetch(baseUrl)

      if (response.Response === 'True') {
        this.filmographies = response.Search
        this.totalFilmographies = response.totalResults
      } else {
        this.filmographies = []
        this.totalFilmographies = 0
      }
    },
    async fetchFilmography (movieId: string) {
      const config = useRuntimeConfig()
      const API_KEY = config.public.OMDB_API_KEY
      const OMDB_URL = config.public.OMDB_URL

      const response = await $fetch(`${OMDB_URL}/?i=${movieId}&plot=full&apikey=${API_KEY}`) as DetailedFilmography

      this.filmography = response
    }
  }
})
