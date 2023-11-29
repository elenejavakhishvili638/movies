import { moviesVault } from "../../src/index";
import AppendX from "../services/AppendX";
import MovieService from "../services/MovieService";
import Loading from "../ui/Loading";
import MainContent from "../ui/MainContent";
import ErrorBox from "./Error";

class MovieManager {
  loader;
  currentPage;
  topRatedMovies;
  movies: MainContent;
  appendX;
  constructor() {
    this.loader = new Loading();
    this.topRatedMovies = new MovieService();
    this.currentPage = 1;
    this.movies = new MainContent();
    this.appendX = new AppendX();
    moviesVault;
  }

  fetchTopRatedMovies = async () => {
    if (moviesVault.getSafe("topRatedMovies")) {
      this.movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
      this.appendX.clearAndAppendElement(
        ".movies-container",
        this.movies.renderMovieContainer()
      );
    } else {
      try {
        this.loader.render();
        const res = await this.topRatedMovies.fetchTopRatedMovies(
          this.currentPage
        );
        moviesVault.createSafe("topRatedMovies", res.results);
        this.movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
        this.appendX.clearAndAppendElement(
          ".movies-container",
          this.movies.renderMovieContainer()
        );
      } catch (error) {
        const messageHandler = new ErrorBox();
        let errorMessage = "failed";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        messageHandler.render(errorMessage, "error");
      } finally {
        this.loader.hide();
      }
    }
  };

  renderPageNotFound = () => {
    console.log("No matches.");
    const moviesContainer = document.querySelector("#movies")
    const notFoundPage = document.createElement("h1")
    notFoundPage.innerHTML = "404 PAGE NOT FOUND"

    moviesContainer?.appendChild(notFoundPage)
  }

  renderEachMovie = async () => {
    const movieId = window.location.pathname.split("/").pop();

    const movie = await this.topRatedMovies.fetchMovieById(Number(movieId));
    this.movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
    this.movies.renderSingleMovieDetails(movie);
  };

  renderByGenre = async () => {
    const urlParts = window.location.pathname.split("/");
    let csurrentGenre = urlParts[3];
    let genrePage = urlParts[4];
    if (csurrentGenre === "All") {
      csurrentGenre = "All";
      this.fetchTopRatedMovies();
    } else {
      if (moviesVault.getSafe(csurrentGenre)) {
        this.movies = new MainContent(moviesVault.getSafe(csurrentGenre));
        this.appendX.clearAndAppendElement(
          ".movies-container",
          this.movies.renderMovieContainer()
        );
      } else {
        try {
          this.loader.render();
          const moviesByGenres = new MovieService();
          const res = await moviesByGenres.fetchMoviesByGenre(
            csurrentGenre,
            genrePage
          );
          moviesVault.createSafe(csurrentGenre, res.results);
          const movies = new MainContent(moviesVault.getSafe(csurrentGenre));
          this.appendX.clearAndAppendElement(
            ".movies-container",
            movies.renderMovieContainer()
          );
        } catch (error) {
          const messageHandler = new ErrorBox();
          let errorMessage = "failed";
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          messageHandler.render(errorMessage, "error");
        } finally {
          this.loader.hide();
        }
      }
    }
  };
}

export default MovieManager;
