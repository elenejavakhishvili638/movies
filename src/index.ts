//main logic
// import DataService from "./services/DataService";
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

const input = document.getElementById("searchInput");
let currentPage = 1;
let genrePage = 1;
let currentGenre: string | number = "All";
const loader = new Loading();

// const topRatedMovies = new DataService(
//   `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
// );
const topRatedMovies = new MovieService();
const appendX = new AppendX();

export let movies: MainContent;
export let moviesVault: Vault<Movie>;

const renderMovies = async () => {
  try {
    loader.render();
    const res = await topRatedMovies.fetchTopRatedMovies(currentPage);
    moviesVault = new Vault({ topRatedMovies: res.results });
    movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
    appendX.clearAndAppendElement(
      ".movies-container",
      movies.renderMovieContainer()
    );
  } catch (error) {
    const messageHandler = new ErrorBox();
    // messageHandler.render(error.message, "error");
  } finally {
    loader.hide();
  }
};

renderMovies();

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
            // const nextPageMovies = new DataService(
            //   `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
            // );
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
            // messageHandler.render(error.message, "error");
          } finally {
            loader.hide();
          }
        } else {
          try {
            loader.render();
            genrePage++;
            // const nextPageMovies = new DataService(
            //   `https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&page=${genrePage}`
            // );
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
            // messageHandler.render(error.message, "error");
          } finally {
            loader.hide();
          }
        }
      }
    }, 400)
  );
}

// Fetch Genres
// const fetchedGenres = new DataService(
//   "https://api.themoviedb.org/3/genre/movie/list?language=en"
// );

interface Genres {
  id: number;
  name: string;
}

const fetchedGenres = new GenreService();
let genres: Genres[];

const renderGenres = async () => {
  try {
    const res = await fetchedGenres.fetchGenres();
    const genreContent = new GenreComponent(res.genres);
    genreContent.create();
    genres = genreContent.getGeneres();
  } catch (error) {
    const messageHandler = new ErrorBox();
    // messageHandler.render(error.message, "error");
  }
};

renderGenres();

// Filter by genres
const genreListElement = document.getElementById("genre-list");
if (genreListElement) {
  genreListElement.addEventListener("click", async (event) => {
    const target = event.target as HTMLInputElement;
    if (target && target.id === "genreButton") {
      const main = document.querySelector("#movies");
      if (!main) return;
      main.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      const clickedButton = event.target as HTMLInputElement;
      document.querySelectorAll("#genreButton").forEach((btn) => {
        btn.classList.remove("bg-gray-300");
        btn.classList.add("bg-white");
      });

      clickedButton.classList.remove("bg-white");
      clickedButton.classList.add("bg-gray-300");

      let name: string = "";

      genres.forEach((genre) => {
        if (genre.name === clickedButton.textContent) {
          currentGenre = genre.id;
          name = genre.name;
        }
      });

      if (clickedButton.textContent === "All") {
        currentGenre = "All";
        movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
        appendX.clearAndAppendElement(
          ".movies-container",
          movies.renderMovieContainer()
        );
      } else {
        if (moviesVault.getSafe(name)) {
          movies = new MainContent(moviesVault.getSafe(name));
          appendX.clearAndAppendElement(
            ".movies-container",
            movies.renderMovieContainer()
          );
        } else {
          try {
            loader.render();
            // const moviesByGenres = new DataService(
            //   `https://api.themoviedb.org/3/discover/movie?with_genres=${currentGenre}&page=${genrePage}`
            // );
            const moviesByGenres = new MovieService();
            const res = await moviesByGenres.fetchMoviesByGenre(
              currentGenre,
              genrePage
            );
            moviesVault.createSafe(name, res.results);
            const movies = new MainContent(moviesVault.getSafe(name));
            appendX.clearAndAppendElement(
              ".movies-container",
              movies.renderMovieContainer()
            );
          } catch (error) {
            const messageHandler = new ErrorBox();
            // messageHandler.render(error.message, "error");
          } finally {
            loader.hide();
          }
        }
      }
    }
  });
}

// generate URL by search term
// const generateUrl = (query: string) => {
//   return `https://api.themoviedb.org/3/search/movie?query=${query}`;
// };

let timer: string | number | NodeJS.Timeout | undefined;
if (input) {
  input.addEventListener("input", (event) => {
    clearTimeout(timer);
    const searchTerm = event.target as HTMLInputElement;
    timer = setTimeout(() => {
      if (searchTerm.value === "") {
        // movies.renderMovieContainer(moviesVault.getSafe("movies"));
        movies.renderMovieContainer();
        appendX.clearAndAppendElement(
          ".movies-container",
          movies.renderMovieContainer()
        );
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
