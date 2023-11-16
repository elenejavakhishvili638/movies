import MainContent from "./MainContent";

class GenreComponent {
  constructor(genres) {
    this.genres = genres;
    this.selectedId = null;
  }

  getGeneres() {
    return this.genres
  }

  create() {
    const genreListElement = document.getElementById("genre-list");
    if (genreListElement) {
      genreListElement.innerHTML = this.genres
        .map(
          (genre) =>
            `<button id="genreButton" class="shadow-btnShadow text-sm px-4">${genre.name}</button>`
        )
        .join("");
    }
  }
}

export default GenreComponent;
