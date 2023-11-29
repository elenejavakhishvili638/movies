// receives movies array and returns a movie container populated with the movies with help of Movie class

import Movie from "./Movie";
import MovieUI from "./MovieUI";
import { Movie1, SingleMovie } from "../interfaces/interfaces";

class MainContent {
  moviesArr?: Movie1[];

  constructor(moviesArr?: Movie1[]) {
    this.moviesArr = moviesArr;
  }

  renderSingleMovieDetails(movieDetails: SingleMovie) {
    const movieUI = new MovieUI();
    movieUI.renderDetails(movieDetails);
  }

  renderMovieContainer() {
    const movieContainer = document.createElement("div"); // <<creates container for the movies
    movieContainer.classList.add(
      "grid",
      "sm:grid-cols-2",
      "gap-6",
      "md:grid-cols-4",
      "md:gap-8",
      "lg:grid-cols-5",
      "lg:gap-12"
    );

    if (Array.isArray(this.moviesArr)) {
      this.moviesArr.forEach((mov) => {
        // <<loops over the movies and passes each of them to the Movie class
        const m = new Movie(mov);
        const movieNode = m.renderMovie();

        movieContainer.appendChild(movieNode);
      });
    }

    return movieContainer;
  }
}

export default MainContent;
