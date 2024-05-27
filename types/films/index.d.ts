declare module 'Filmography' {

    export interface Filter {
        page: number;
        searchQuery: string | number | null;
        type: 'movie' | 'series' | 'episode' | 'all';
        itemsPerPage: number;
    }

    export interface BasicFilmography {
        imdbID: string;
        Title: string;
        Year: string;
        Type: 'movie' | 'series' | 'episode';
        Poster: string;
    }

    export interface DetailedFilmography {
        imdbID: string;
        Title: string;
        Year: string;
        Type: 'movie' | 'series' | 'episode';
        Poster: string;
        Runtime: string;
        Director: string;
        Country: string;
        Genre: string;
        Actors: string;
    }


}
