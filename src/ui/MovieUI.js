class MovieUI {
  createElement(tag, classNames, innerHTML) {
    const element = document.createElement(tag);
    element.className = classNames;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  }

  renderDetails(movieDetails) {
    const movieDetailsContainer = document.getElementById("movie-details");
    movieDetailsContainer.innerHTML = "";

    const leftPanel = this.createElement("div", "", null);
    leftPanel.id = "left-panel";
    const rightPanel = this.createElement("ul", "", null);
    rightPanel.id = "right-panel";

    const moviePoster = this.createElement(
      "img",
      "mb-[1em] sm:min-w-[200px] md:min-w-[350px]",
      null
    );
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    moviePoster.alt = "movie-poster";

    const details = [
      { title: "Title", value: movieDetails.title },
      { title: "Release Date", value: movieDetails.release_date },
      { title: "Genres", value: movieDetails.map((genre) => genre.name) },
      { title: "Runtime", value: `${movieDetails.runtime} minutes` },
      {
        title: "Revenue",
        value: Intl.NumberFormat("en-US", {
          state: "currency",
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
      rightPanel.appendChild(li)
    });
    leftPanel.appendChild(moviePoster)
    movieDetailsContainer.appendChild(leftPanel)
    movieDetailsContainer.appendChild(rightPanel)
  }
}

export default MovieUI;


// movieDetailsContainer.classList.remove("hidden");
// movieDetailsContainer.classList.add("flex");
// document.getElementById("movies").classList.add("hidden");
// document.getElementById("genre-list").classList.add("hidden");
