//main logic
import DataService from "./services/DataService";
import "./style.css";
import MainContent from "./ui/MainContent";
import "./ui/Header";
import GenreComponent from "./ui/Genres";
import Vault from "./state-management/Vault";
import AppendX from "./services/AppendX";
import ErrorBox from "./ui/Error";

const input = document.getElementById("searchInput");

const topRatedMovies = new DataService(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
);
const appendX = new AppendX();

let movies;
let moviesVault;

try {
  const res = await topRatedMovies.fetchData();
  moviesVault = new Vault({ topRatedMovies: res.results });
  movies = new MainContent(moviesVault.getSafe("topRatedMovies"));
  appendX.clearAndAppendElement(
    ".movies-container",
    movies.renderMovieContainer()
  );
} catch (error) {
  const messageHandler = new ErrorBox();
  messageHandler.showMessage(error.message, "error");
}

// Fetch Genres
const fetchedGenres = new DataService(
  "https://api.themoviedb.org/3/genre/movie/list?language=en"
);

let genres;

try {
  const res = await fetchedGenres.fetchData();
  const genreContent = new GenreComponent(res.genres);
  genreContent.create();
  genres = genreContent.getGeneres();
} catch (error) {
  const messageHandler = new ErrorBox();
  messageHandler.showMessage(error.message, "error");
}

// Filter by genres
const genreListElement = document.getElementById("genre-list");
if (genreListElement) {
  genreListElement.addEventListener("click", async (event) => {
    if (event.target && event.target.id === "genreButton") {
      const clickedButton = event.target;
      document.querySelectorAll("#genreButton").forEach((btn) => {
        btn.classList.remove("bg-gray-300");
        btn.classList.add("bg-white");
      });

      clickedButton.classList.remove("bg-white");
      clickedButton.classList.add("bg-gray-300");

      let id;
      let name;

      genres.forEach((genre) => {
        if (genre.name === clickedButton.textContent) {
          id = genre.id;
          name = genre.name;
        }
      });

      if (clickedButton.textContent === "All") {
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
            const moviesByGenres = new DataService(
              `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`
            );
            const res = await moviesByGenres.fetchData();
            moviesVault.createSafe(name, res.results);
            const movies = new MainContent(moviesVault.getSafe(name));
            appendX.clearAndAppendElement(
              ".movies-container",
              movies.renderMovieContainer()
            );
          } catch (error) {
            const messageHandler = new ErrorBox();
            messageHandler.showMessage(error.message, "error");
          }
        }
      }
    }
  });
}

// generate URL by search term
const generateUrl = (query) => {
  return `https://api.themoviedb.org/3/search/movie?query=${query}`;
};

let timer;
if (input) {
  input.addEventListener("input", (event) => {
    clearTimeout(timer);
    const searchTerm = event.target.value;
    timer = setTimeout(() => {
      if (searchTerm === "") {
        movies.renderMovieContainer(moviesVault.getSafe("movies"));
        appendX.clearAndAppendElement(
          ".movies-container",
          movies.renderMovieContainer()
        );
      } else {
        const url = generateUrl(searchTerm);
        const fetchByKeyword = new DataService(url);
        fetchByKeyword.fetchData().then((res) => {
          const mainContent = new MainContent(res.results);
          appendX.clearAndAppendElement(
            ".movies-container",
            mainContent.renderMovieContainer()
          );
        });
      }
    }, 1000);
  });
}
