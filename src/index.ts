//main logic
import "./style.css";
import MainContent from "./ui/MainContent";
import "./ui/Header";
import GenreComponent from "./ui/Genres";
import Vault from "./state-management/Vault";
import AppendX from "./services/AppendX";
import ErrorBox from "./ui/Error";
import Loading from "./ui/Loading";
import MovieService from "./services/MovieService";
import GenreService from "./services/GenreService";
import Router from "./router/Router";
import MovieManager from "./ui/MovieManager";
import { Movie, Genres } from "./interfaces/interfaces";

export const route = new Router();

const input = document.getElementById("searchInput");
let currentPage = 1;
let genrePage = 1;
let currentGenre: string | number;
const loader = new Loading();

const topRatedMovies = new MovieService();
const appendX = new AppendX();

let movies: MainContent;

export let moviesVault: Vault<Movie> = new Vault();

const movieManager = new MovieManager();

route.addUrl([
  {
    path: "/",
    component: movieManager.fetchTopRatedMovies,
  },
  {
    path: "/movie/([^/]+)",
    component: movieManager.renderEachMovie,
  },
  {
    path: "/movies/genre/([^/]+)/([^/]+)",
    component: movieManager.renderByGenre,
  },
  {
    path: "*",
    component: movieManager.renderPageNotFound
  }
]);

const fetchedGenres = new GenreService();
export let genres: Genres[];

const renderGenres = async () => {
  try {
    const res = await fetchedGenres.fetchGenres();
    const genreContent = new GenreComponent(res.genres);
    genreContent.create();
    genres = genreContent.getGeneres();
    handleGenres();
  } catch (error) {
    const messageHandler = new ErrorBox();
    let errorMessage = "failed";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    messageHandler.render(errorMessage, "error");
  }
};

renderGenres();

const handleGenres = () => {
  const genreList = document.querySelectorAll("#genreButton");
  genreList.forEach((genre) => {
    const foundGenre = genres.find(
      (genre) => genre.id === Number(currentGenre)
    );
    if (genre.textContent === currentGenre) {
      genre.classList.remove("bg-white");
      genre.classList.add("bg-gray-300");
    } else if (foundGenre?.name === genre.textContent) {
      genre.classList.remove("bg-white");
      genre.classList.add("bg-gray-300");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  route.handleRouteChange();
  if (
    window.location.pathname === "/" ||
    window.location.pathname.includes("All")
  ) {
    currentGenre = "All";
  } else {
    const urlParts = window.location.pathname.split("/");
    let csurrentGenre = urlParts[3];
    let gsenrePage = urlParts[4];
    currentGenre = csurrentGenre;
    genrePage = Number(gsenrePage);
  }
});

export function renderMovie(id: number) {
  route.navigateToUrl(`/movie/${id}`);
}

//
function debounce(func: { (): Promise<void>; (): void }, limit: number) {
  let inDebounce: NodeJS.Timeout;
  return function () {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(), limit);
  };
}

const m = document.querySelector("#movies");
if (m) {
  m.addEventListener(
    "scroll",
    debounce(async () => {
      const { scrollTop, scrollHeight, clientHeight } = m;
      if (scrollHeight - (scrollTop + clientHeight) < 700) {
        if (currentGenre === "All") {
          try {
            loader.render();
            currentPage++;
            const res = await topRatedMovies.fetchTopRatedMovies(currentPage);
            moviesVault.updateSafe("topRatedMovies", res.results);
            movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
            appendX.clearAndAppendElement(
              ".movies-container",
              movies.renderMovieContainer()
            );
            let isLastPage = false;
            if (currentPage >= res.total_pages) {
              isLastPage = true;
            }
            if (isLastPage) {
              const messageHandler = new ErrorBox();
              messageHandler.render("Last Page", "info");
            }
          } catch (error) {
            const messageHandler = new ErrorBox();
            let errorMessage = "failed";
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            messageHandler.render(errorMessage, "error");
          } finally {
            loader.hide();
          }
        } else {
          try {
            loader.render();
            genrePage++;
            const res = await topRatedMovies.fetchMoviesByGenre(
              currentGenre,
              genrePage
            );
            moviesVault.updateSafe(currentGenre, res.results);
            movies = new MainContent(moviesVault.getSafe(currentGenre));
            appendX.clearAndAppendElement(
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
            loader.hide();
          }
        }
      }
    }, 400)
  );
}

// Filter by genres
const genreListElement = document.getElementById("genre-list");
if (genreListElement) {
  genreListElement.addEventListener("click", async (event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.id === "genreButton") {
      const main = document.querySelector("#movies");

      main?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      document.querySelectorAll("#genreButton").forEach((btn) => {
        btn.classList.remove("bg-gray-300");
        btn.classList.add("bg-white");
      });
      target.classList.remove("bg-white");
      target.classList.add("bg-gray-300");
      if (window.location.pathname)
        if (target.textContent === "All") {
          currentGenre = "All";
        } else {
          genres.forEach((genre) => {
            if (genre.name === target.textContent) {
              currentGenre = genre.id;
              // console.log(currentGenre);
            }
          });
        }
      route.navigateToUrl(`/movies/genre/${currentGenre}/${genrePage}`);
    }
  });
}

//
let timer: string | number | NodeJS.Timeout | undefined;
if (input) {
  input.addEventListener("input", (event) => {
    clearTimeout(timer);
    const searchTerm = event.target as HTMLInputElement;
    timer = setTimeout(() => {
      if (searchTerm.value === "") {
        route.navigateToUrl("/");
      } else {
        loader.render();
        const fetchByKeyword = new MovieService();
        fetchByKeyword
          .fetchMovieBySearchTerm(searchTerm.value)
          .then((res) => {
            const mainContent = new MainContent(res.results);
            appendX.clearAndAppendElement(
              ".movies-container",
              mainContent.renderMovieContainer()
            );
          })
          .catch((err) => console.log(err))
          .finally(() => loader.hide());
      }
      const main = document.querySelector("#main-container");
      const relatedMovies = document.querySelector("#related-movie-slider");
      const genreList = document.getElementById("genre-list");
      if (genreList) {
        genreList.classList.remove("hidden");
      }
      if (relatedMovies && main) {
        main.removeChild(relatedMovies);
        const m = document.querySelector("#movies");
        if (m) {
          m.classList.add("overflow-scroll");
        }
      }
    }, 1000);
  });
}