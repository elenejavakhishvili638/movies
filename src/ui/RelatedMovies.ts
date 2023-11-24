import AppendX from "../services/AppendX";
// import DataService from "../services/DataService";
import fallBackImg from "../assets/gray-bg.png";
import MainContent from "./MainContent";
import MovieService from "../services/MovieService";

class RelatedMovies extends MovieService {
  movieId: number

  constructor(movieId: number) {
    super();
    this.movieId = movieId
  }

  renderRelatedMovieSlider() {
    const appendX = new AppendX();
    const relatedMovies = document.createElement("div");
    relatedMovies.id = "slider-container";
    relatedMovies.classList.add("flex", "gap-[10px]", "overflow-x-scroll");

    this.fetchRelatedMovies(this.movieId).then((data) => {
      data.results.forEach((movie) => {
        const movieNode = document.createElement("div");
        movieNode.id = "movie-node";
        movieNode.classList.add("min-w-[170px]");
        const moviePoster = document.createElement("img");
        moviePoster.src = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : fallBackImg;
        moviePoster.alt = "movie-poster";
        moviePoster.classList.add(
          "w-[100%]",
          "max-h-[200px]",
          "h-[100%]",
          "object-cover"
        );
        const movieTitle = document.createElement("span");
        movieTitle.classList.add("cursor-pointer")
        movieTitle.innerHTML = movie.title;
        movieTitle.addEventListener("click", () => {
          const mainContent = new MainContent();
          this.fetchMovieById(movie.id)
            .then((movie) => {
                mainContent.renderSingleMovieDetails(movie)
            })
            .catch((e) => console.error(e.message));
        });

        movieNode.append(moviePoster, movieTitle);

        appendX.appendElement("#slider-container", movieNode);
      });
    });

    return relatedMovies;
  }
}

export default RelatedMovies;
