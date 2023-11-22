// receives movie object and returns a DOM node with its information

import DataService from "../services/DataService";
import MovieService from "../services/MovieService";
import MainContent from "./MainContent";

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

class Movie extends MovieService {
  private movie: Movie | SingleMovie;
  constructor(movie: Movie | SingleMovie) {
    super();
    this.movie = movie;
  }

  createDomElement(elementName: string) {
    // <<can be abstracted to another class
    return document.createElement(elementName);
  }

  renderMovie() {
    const movieWrapper = this.createDomElement("div");
    const imagewrapper = movieWrapper.appendChild(this.createDomElement("div"));
    const movieImg = imagewrapper.appendChild(
      this.createDomElement("img") as HTMLImageElement
    );
    const movieDescription = imagewrapper.appendChild(
      this.createDomElement("p")
    );
    const movieTitle = movieWrapper.appendChild(this.createDomElement("span"));
    const movieDate = movieWrapper.appendChild(this.createDomElement("span"));

    movieTitle.addEventListener("click", async () => {
      const mainContent = new MainContent();
      const movie = await this.fetchMovieById(this.movie.id);
      mainContent.renderSingleMovieDetails(movie);
    });

    movieWrapper.classList.add("flex", "flex-col");
    movieImg.src = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    movieImg.alt = "movie-poster";
    movieImg.classList.add("mb-4");
    movieImg.setAttribute("id", "image");
    imagewrapper.classList.add("relative");
    imagewrapper.addEventListener("mouseenter", () => {
      movieDescription.innerHTML = this.movie.overview;
      imagewrapper.classList.add("md:scale-125", "md:duration-500");
      movieDescription.classList.remove("hidden");
      movieImg.classList.add("blur-[8px]");
      movieDescription.classList.add(
        "absolute",
        "top-[0]",
        "text-gray-300",
        "md:text-[11px]",
        "text-md",
        "h-[95%]",
        "overflow-scroll",
        "text-justify",
        "bg-textBg",
        "px-4",
        "py-4",
        "rounded-[2px]"
      );
    });
    imagewrapper.addEventListener("mouseleave", () => {
      movieDescription.innerHTML = this.movie.overview;
      imagewrapper.classList.remove("md:scale-125", "md:duration-500");
      movieDescription.classList.add("hidden");
      movieImg.classList.remove("blur-[8px]");
    });
    movieTitle.classList.add("text-lg", "font-bold", "cursor-pointer");
    movieTitle.innerHTML = this.movie.title;
    movieDate.innerHTML = `Released: ${this.movie.release_date.substring(
      0,
      4
    )}`;
    movieDate.classList.add("text-sm");
    return movieWrapper;
  }
}

export default Movie;
