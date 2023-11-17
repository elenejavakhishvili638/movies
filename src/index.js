//main logic
import DataService from "./services/DataService";
import "./style.css";
import MainContent from "./ui/MainContent";
import "./ui/Header";
import GenreComponent from "./ui/Genres";
import ErrorBox from "./ui/Error";

const mainContentContainer = document.querySelector(".movies-container");

const topRatedMovies = new DataService(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
);

try {
  const res = await topRatedMovies.fetchData();
  const movies = new MainContent(res.results);
  mainContentContainer.innerHTML = "";
  mainContentContainer.appendChild(movies.renderMovieContainer());
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
const genreButtons = document.querySelectorAll("#genreButton");
if (genreButtons) {
  let id;
  genreButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      genreButtons.forEach((btn) => {
        btn.classList.remove("bg-gray-300");
        btn.classList.add("bg-white");
      });
      button.classList.remove("bg-white");

      button.classList.add("bg-gray-300");
      genres.forEach((genre) => {
        if (genre.name === button.textContent) {
          id = genre.id;
        }
      });
      const moviesByGenres = new DataService(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`
      );

      try {
        const res = await moviesByGenres.fetchData();
        const movies = new MainContent(res.results);
        mainContentContainer.innerHTML = "";
        mainContentContainer.appendChild(movies.renderMovieContainer());
      } catch (error) {
        const messageHandler = new ErrorBox();
        messageHandler.showMessage(error.message, "error");
      }
    });
  });
}

// generate URL by search term
//
const generateUrl = (query) => {
  return `https://api.themoviedb.org/3/discover/movie?with_keywords=${query}`;
};
//

// Search in data
const input = document.getElementById("searchInput");
let timer;
if (input) {
  input.addEventListener("input", (event) => {
    clearTimeout(timer);
    const searchTerm = event.target.value;
    timer = setTimeout(() => {
      const url = generateUrl(searchTerm);

      const fetchByKeyword = new DataService(url);
      fetchByKeyword.fetchData().then((res) => {
        const mainContent = new MainContent(res.results);
        mainContentContainer.innerHTML = "";
        mainContentContainer.appendChild(mainContent.renderMovieContainer());
      });
    }, 1000);
  });
}
