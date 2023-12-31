import AppendX from "../services/AppendX";
import RelatedMovies from "./RelatedMovies";
import { SingleMovie } from "../interfaces/interfaces";

class MovieUI {
  createElement(tag: string, classNames: string, innerHTML: string | null) {
    const element = document.createElement(tag);
    element.className = classNames;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }

  renderDetails(movieDetails: SingleMovie) {
    const appendX = new AppendX();

    const movieDetailsContainer = this.createElement(
      "div",
      "flex flex-col my-[2em] w-[95%] mx-auto md:flex-row md:gap-[20px] items-center md:items-start",
      null
    );
    movieDetailsContainer.id = "movie-details-container";

    const relatedMovies = new RelatedMovies(movieDetails.id);

    const relatedMovieSlider = this.createElement("div", "w-[95%]", null);
    relatedMovieSlider.id = "related-movie-slider";

    const moviesContainer = document.querySelector("#movies");
    moviesContainer?.classList.remove("h-[81vh]");
    appendX.clearAndAppendElement(".movies-container", movieDetailsContainer);
    appendX.appendElement("#main-container", relatedMovieSlider);

    const bottomPanel = relatedMovies.renderRelatedMovieSlider();
    appendX.clearAndAppendElement("#related-movie-slider", bottomPanel);

    const leftPanel = this.createElement("div", "", null);
    leftPanel.id = "left-panel";
    const rightPanel = this.createElement("ul", "", null);
    rightPanel.id = "right-panel";

    const moviePoster = this.createElement(
      "img",
      "mb-[1em] sm:min-w-[200px] md:min-w-[350px]",
      null
    ) as HTMLImageElement;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    moviePoster.alt = "movie-poster";

    const details = [
      { title: "Title", value: movieDetails.title },
      { title: "Release Date", value: movieDetails.release_date },
      {
        title: "Genres",
        value: movieDetails.genres.map((genre) => genre.name),
      },
      { title: "Runtime", value: `${movieDetails.runtime} minutes` },
      {
        title: "Revenue",
        value: Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(movieDetails.revenue),
      },
      { title: "Overview", value: movieDetails.overview },
    ];

    details.forEach((detail) => {
      const li = this.createElement(
        "li",
        "flex gap-[10px] mb-[10px] md:text-xl",
        `<h3 class="font-bold">${detail.title}: </h3><p>${detail.value}</p>`
      );
      rightPanel.appendChild(li);
    });
    leftPanel.appendChild(moviePoster);

    appendX.appendElement("#movie-details-container", leftPanel);
    appendX.appendElement("#movie-details-container", rightPanel);

    const m = document.querySelector("#movies");
    const genreListElement = document.getElementById("genre-list");
    if (m) {
      m.classList.remove("overflow-scroll");
    }
    if (genreListElement) {
      genreListElement.classList.add("hidden");
    }
  }
}

export default MovieUI;
