import DataService from "./DataService";
import { MovieData, SingleMovie } from "../interfaces/interfaces";
import { BASE_URL } from "../env/enviroment";

class MovieService extends DataService {
  constructor() {
    super(BASE_URL);
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
    genreId: string | number,
    genrePage: number | string
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
