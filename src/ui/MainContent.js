// receives movies array and returns a movie container populated with the movies with help of Movie class

import AppendX from "../services/AppendX";
import Movie from "./Movie";

class MainContent {
  constructor(moviesArr) {
    this.moviesArr = moviesArr;
  }

  renderSingleMovieDetails(movieDetails) {
    // const movieUI = new MovieUI(movieDetails);
    // movieUI.renderDetails();
    console.log(movieDetails);
    const appendX = new AppendX();
    const movieDetailsContainer = document.createElement("div");
    movieDetailsContainer.id = "movie-details-container";
    appendX.clearAndAppendElement("#main-container", movieDetailsContainer);
    movieDetailsContainer.classList.add(
      "flex",
      "flex-col",
      "my-[2em]",
      "w-[95%]",
      "mx-auto",
      "md:flex-row",
      "md:gap-[20px]",
      "items-center",
      "md:items-start"
    );
    const leftPanel = document.createElement("div");
    leftPanel.id = "left-panel";
    appendX.appendElement("#movie-details-container", leftPanel);
    const rightPanel = document.createElement("ul");
    rightPanel.id = "right-panel";
    appendX.appendElement("#movie-details-container", rightPanel);

    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    moviePoster.alt = "movie-poster";
    moviePoster.classList.add(
      "mb-[1em]",
      "sm:min-w-[200px]",
      "md:min-w-[350px]"
    );
    ////
    const movieTitle = document.createElement("li");
    movieTitle.innerHTML = `
    <h3>Title: </h3>
    <p>${movieDetails.title}</p>
    `;
    const movieReleaseDate = document.createElement("li");
    movieReleaseDate.innerHTML = `
    <h3>Released: </h3>
    <p>${movieDetails.release_date}</p>
    `;
    const movieGenres = document.createElement("li");
    movieGenres.innerHTML = `
    <h3>Genres: </h3>
    <p>${movieDetails.genres.map((genre) => genre.name)}</p>
    `;
    const movieDescription = document.createElement("li");
    movieDescription.innerHTML = `
    <h3>Overview: </h3>
    <p>${movieDetails.overview}</p>
    `;
    const movieRuntime = document.createElement("li");
    movieRuntime.innerHTML = `
    <h3>Runtime: </h3>
    <p>${movieDetails.runtime} minutes</p>
    `;
    const movieRevenue = document.createElement("li");
    movieRevenue.innerHTML = `
    <h3>Revenue: </h3>
    <p>${Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(movieDetails.revenue)}</p>
    `;
    const elArr = [
      movieTitle,
      movieReleaseDate,
      movieGenres,
      movieDescription,
      movieRuntime,
      movieRevenue,
    ];
    elArr.forEach((node) =>
      node.classList.add("flex", "gap-[10px]", "mb-[10px]", "md:text-xl")
    ); //<< add styles that are same for all the "li" elements
    leftPanel.append(moviePoster);
    rightPanel.append(
      movieTitle,
      movieReleaseDate,
      movieGenres,
      movieRuntime,
      movieRevenue,
      movieDescription
    );
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

    this.moviesArr.forEach((mov) => {
      // <<loops over the movies and passes each of them to the Movie class
      const m = new Movie(mov);
      const movieNode = m.renderMovie();

      movieContainer.appendChild(movieNode);
    });
    return movieContainer;
  }
}

export default MainContent;
