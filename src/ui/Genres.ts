import GenreService from "../services/GenreService";
import { Genres } from "../interfaces/interfaces";

class GenreComponent extends GenreService {
  genres: Genres[];

  constructor(genres: Genres[]) {
    super();
    this.genres = genres;
  }

  getGeneres() {
    return this.genres;
  }

  create() {
    const genreListElement: HTMLElement | null =
      document.getElementById("genre-list");
    if (genreListElement) {
      const button: HTMLElement | null = genreListElement.appendChild(
        document.createElement("button")
      );
      button.textContent = "All";
      button.classList.add(
        "shadow-btnShadow",
        "text-sm",
        "px-4",
        // "bg-gray-300",
        "md:text-lg"
      );
      button.setAttribute("id", "genreButton");

      this.genres
        .map((genre) => {
          const button = genreListElement.appendChild(
            document.createElement("button")
          );
          button.textContent = genre.name;
          button.classList.add(
            "shadow-btnShadow",
            "text-sm",
            "px-4",
            "bg-white",
            "md:text-lg"
          );
          button.setAttribute("id", "genreButton");
        })
        .join("");
    }
  }
}

export default GenreComponent;
