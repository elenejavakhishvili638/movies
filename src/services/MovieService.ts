import DataService from "./DataService1";

interface MovieData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface SingleMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

class MovieService extends DataService {
  constructor() {
    super("https://api.themoviedb.org/3");
  }

  async fetchTopRatedMovies(currentPage: number): Promise<MovieData> {
    return this.fetchData(
      `/movie/top_rated?language=en-US&page=${currentPage}`
    );
  }

  async fetchRelatedMovies(movieId: number): Promise<MovieData> {
    return this.fetchData(`/movie/${movieId}/similar?language=en-US&page=1`);
  }

  async fetchMoviesByGenre(
    genreId: number,
    genrePage: number
  ): Promise<MovieData> {
    return this.fetchData(
      `/discover/movie?with_genres=${genreId}&page=${genrePage}`
    );
  }

  async fetchMovieById(movieId: number): Promise<SingleMovie> {
    return this.fetchData(`/movie/${movieId}?language=en-US`);
  }

  async fetchMovieBySearchTerm(keyWord: string): Promise<MovieData> {
    return this.fetchData(`/search/movie?query=${keyWord}`);
  }
}

export default MovieService;
