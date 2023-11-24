// receives movies array and returns a movie container populated with the movies with help of Movie class

import Movie from "./Movie";
import MovieUI from "./MovieUI";

interface MovieData {
  page: number;
  results: Movie1[];
  total_pages: number;
  total_results: number;
}

interface Movie1 {
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

class MainContent {
  moviesArr?: Movie1[]

  constructor(moviesArr?: Movie1[]) {
    this.moviesArr = moviesArr;
  }

  renderSingleMovieDetails(movieDetails: SingleMovie) {
    const movieUI = new MovieUI();
    movieUI.renderDetails(movieDetails);
  }

  renderMovieContainer() {
    const movieContainer = document.createElement("div"); // <<creates container for the movies
    movieContainer.classList.add(
      "grid",
      "sm:grid-cols-2",
      "gap-6",
      "md:grid-cols-4",
      "md:gap-8",
      "lg:grid-cols-5",
      "lg:gap-12"
    );

    if(Array.isArray(this.moviesArr)) {
      this.moviesArr.forEach((mov) => {
        // <<loops over the movies and passes each of them to the Movie class
        const m = new Movie(mov);
        const movieNode = m.renderMovie();
  
        movieContainer.appendChild(movieNode);
      });
    }

    return movieContainer;
  }
}

export default MainContent;
