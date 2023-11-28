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

export const route = new Router();

const input = document.getElementById("searchInput");
let currentPage = 1;
let genrePage = 1;
let currentGenre: string | number;
const loader = new Loading();

const topRatedMovies = new MovieService();
const appendX = new AppendX();

let movies: MainContent;
let moviesVault: Vault<Movie>;

moviesVault = new Vault();

// const renderMovies = async () => {
//   if (moviesVault.getSafe("topRatedMovies")) {
//     movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
//     appendX.clearAndAppendElement(
//       ".movies-container",
//       movies.renderMovieContainer()
//     );
//   } else {
//     try {
//       loader.render();
//       const res = await topRatedMovies.fetchTopRatedMovies(currentPage);
//       moviesVault.createSafe("topRatedMovies", res.results);
//       movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
//       appendX.clearAndAppendElement(
//         ".movies-container",
//         movies.renderMovieContainer()
//       );
//     } catch (error) {
//       const messageHandler = new ErrorBox();
//       let errorMessage = "failed";
//       if (error instanceof Error) {
//         errorMessage = error.message;
//       }
//       messageHandler.render(errorMessage, "error");
//     } finally {
//       loader.hide();
//     }
//   }
// };

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
]);

// document.addEventListener("DOMContentLoaded", () => {
//   route.handleRouteChange();
// });
route.handleRouteChange();

export function renderMovie(id: number) {
  route.navigateToUrl(`/movie/${id}`);
}

// async function renderEachMovie() {
//   const movieId = window.location.pathname.split("/").pop();
//   const movie = await topRatedMovies.fetchMovieById(Number(movieId));
//   movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
//   movies.renderSingleMovieDetails(movie);
// }

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
//
interface Genres {
  id: number;
  name: string;
}

const fetchedGenres = new GenreService();
export let genres: Genres[];

const renderGenres = async () => {
  try {
    const res = await fetchedGenres.fetchGenres();
    const genreContent = new GenreComponent(res.genres);
    genreContent.create();
    genres = genreContent.getGeneres();
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
//

// function renderMoviesByGenre(
//   scurrentGenre: number | string,
//   sgenrePage: number
// ) {
//   route.navigateToUrl(`/movies/genre/${scurrentGenre}/${sgenrePage}`);
// }

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("hshh");
// });

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
      // const clickedButton = event.target as HTMLInputElement;
      document.querySelectorAll("#genreButton").forEach((btn) => {
        btn.classList.remove("bg-gray-300");
        btn.classList.add("bg-white");
      });

      target.classList.remove("bg-white");
      target.classList.add("bg-gray-300");
      console.log(currentGenre);
      // let name: string = "";
      // console.log(genres)
      if (window.location.pathname)
        if (target.textContent === "All") {
          currentGenre = "All";
        } else {
          genres.forEach((genre) => {
            if (genre.name === target.textContent) {
              currentGenre = genre.id;
              // name = genre.name;
            }
          });
        }
      // renderMoviesByGenre(currentGenre, genrePage);
      route.navigateToUrl(`/movies/genre/${currentGenre}/${genrePage}`);

      // route.navigateToUrl({
      //   path: `/movies/genre/${currentGenre}/${genrePage}`,
      //   component: ,
      // })
      // history.pushState({}, "", `/movies/genre/${currentGenre}/${genrePage}`);
      // route.navigateToUrl(`/movies/genre/${currentGenre}/${genrePage}`);

      // if (clickedButton.textContent === "All") {
      //   currentGenre = "All";
      //   movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
      //   appendX.clearAndAppendElement(
      //     ".movies-container",
      //     movies.renderMovieContainer()
      //   );
      // } else {
      //   if (moviesVault.getSafe(name)) {
      //     movies = new MainContent(moviesVault.getSafe(name));
      //     appendX.clearAndAppendElement(
      //       ".movies-container",
      //       movies.renderMovieContainer()
      //     );
      //   } else {
      //     try {
      //       loader.render();
      //       const moviesByGenres = new MovieService();
      //       const res = await moviesByGenres.fetchMoviesByGenre(
      //         currentGenre,
      //         genrePage
      //       );
      //       moviesVault.createSafe(name, res.results);
      //       const movies = new MainContent(moviesVault.getSafe(name));
      //       appendX.clearAndAppendElement(
      //         ".movies-container",
      //         movies.renderMovieContainer()
      //       );
      //     } catch (error) {
      //       const messageHandler = new ErrorBox();
      //       let errorMessage = "faield";
      //       if (error instanceof Error) {
      //         errorMessage = error.message;
      //       }
      //       messageHandler.render(errorMessage, "error");
      //     } finally {
      //       loader.hide();
      //     }
      //   }
      // }
    }
  });
}

// async function renderByGenre() {
//   const urlParts = window.location.pathname.split("/");
//   let csurrentGenre = urlParts[3];
//   let genrePage = urlParts[4];
//   if (currentGenre === "All") {
//     currentGenre = "All";
//     // if (moviesVault.getSafe("topRatedMovies")) {
//     //   movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
//     //   appendX.clearAndAppendElement(
//     //     ".movies-container",
//     //     movies.renderMovieContainer()
//     //   );
//     // } else {
//     // }
//     route.navigateToUrl("/");
//   } else {
//     if (moviesVault.getSafe(currentGenre)) {
//       movies = new MainContent(moviesVault.getSafe(currentGenre));
//       appendX.clearAndAppendElement(
//         ".movies-container",
//         movies.renderMovieContainer()
//       );
//     } else {
//       try {
//         loader.render();
//         const moviesByGenres = new MovieService();
//         const res = await moviesByGenres.fetchMoviesByGenre(
//           currentGenre,
//           genrePage
//         );
//         moviesVault.createSafe(currentGenre, res.results);
//         const movies = new MainContent(moviesVault.getSafe(currentGenre));
//         appendX.clearAndAppendElement(
//           ".movies-container",
//           movies.renderMovieContainer()
//         );
//       } catch (error) {
//         const messageHandler = new ErrorBox();
//         let errorMessage = "failed";
//         if (error instanceof Error) {
//           errorMessage = error.message;
//         }
//         messageHandler.render(errorMessage, "error");
//       } finally {
//         loader.hide();
//       }
//     }
//   }
// }
//
let timer: string | number | NodeJS.Timeout | undefined;
if (input) {
  input.addEventListener("input", (event) => {
    clearTimeout(timer);
    const searchTerm = event.target as HTMLInputElement;
    timer = setTimeout(() => {
      if (searchTerm.value === "") {
        // movies.renderMovieContainer(moviesVault.getSafe("movies"));
        // movies.renderMovieContainer();
        // appendX.clearAndAppendElement(
        //   ".movies-container",
        //   movies.renderMovieContainer()
        // );
        route.navigateToUrl("/");
      } else {
        loader.render();
        // const url = generateUrl(searchTerm.value);
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
