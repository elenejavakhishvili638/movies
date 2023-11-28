import AppendX from "../services/AppendX";
import MovieService from "../services/MovieService";
import Vault from "../state-management/Vault";
import Loading from "../ui/Loading";
import MainContent from "../ui/MainContent";
import ErrorBox from "./Error";

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
class MovieManager {
  loader;
  currentPage;
  topRatedMovies;
  movies: MainContent;
  moviesVault: Vault<Movie>;
  appendX;
  //   movie;
  constructor() {
    this.loader = new Loading();
    this.topRatedMovies = new MovieService();
    this.currentPage = 1;
    this.movies = new MainContent();
    this.moviesVault = new Vault();
    // this.movie;
    // console.log(this.moviesVault);
    // this.fetchTopRatedMovies.bind(this);
    this.appendX = new AppendX();
  }

  fetchTopRatedMovies = async () => {
    // console.log(this.movies);
    if (this.moviesVault.getSafe("topRatedMovies")) {
      this.movies = new MainContent(this.moviesVault.getSafe("topRatedMovies"));
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
        this.moviesVault.createSafe("topRatedMovies", res.results);
        this.movies = new MainContent(
          this.moviesVault.getSafe("topRatedMovies")
        );
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

  renderEachMovie = async () => {
    const movieId = window.location.pathname.split("/").pop();

    const movie = await this.topRatedMovies.fetchMovieById(Number(movieId));
    this.movies = new MainContent(this.moviesVault.getSafe("topRatedMovies"));
    this.movies.renderSingleMovieDetails(movie);
  };

  renderByGenre = async () => {
    const urlParts = window.location.pathname.split("/");
    let csurrentGenre = urlParts[3];
    let genrePage = urlParts[4];
    console.log(this.moviesVault);

    if (csurrentGenre === "All") {
      csurrentGenre = "All";
      // if (moviesVault.getSafe("topRatedMovies")) {
      //   movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
      //   appendX.clearAndAppendElement(
      //     ".movies-container",
      //     movies.renderMovieContainer()
      //   );
      // } else {
      // }
      // route.navigateToUrl("/");
      this.fetchTopRatedMovies();
    } else {
      if (this.moviesVault.getSafe(csurrentGenre)) {
        this.movies = new MainContent(this.moviesVault.getSafe(csurrentGenre));
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
          this.moviesVault.createSafe(csurrentGenre, res.results);
          const movies = new MainContent(
            this.moviesVault.getSafe(csurrentGenre)
          );
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
