// receives movie object and returns a DOM node with its information

class Movie {
  constructor(movie) {
    this.movie = movie;
  }

  createDomElement(elementName) {
    // <<can be abstracted to another class
    return document.createElement(elementName);
  }

  renderMovie() {
    const movieWrapper = this.createDomElement("div");
    const imagewrapper = movieWrapper.appendChild(this.createDomElement("div"));
    const movieImg = imagewrapper.appendChild(this.createDomElement("img"));
    const movieDescription = imagewrapper.appendChild(
      this.createDomElement("p")
    );
    const movieTitle = movieWrapper.appendChild(this.createDomElement("span"));
    const movieDate = movieWrapper.appendChild(this.createDomElement("span"));

    movieWrapper.classList.add("flex", "flex-col");
    movieImg.src = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
    movieImg.alt = "movie-poster";
    movieImg.classList.add("mb-4");
    movieImg.setAttribute("id", "image");
    imagewrapper.classList.add("relative");
    imagewrapper.addEventListener("mouseenter", () => {
      movieDescription.innerHTML = this.movie.overview;
      imagewrapper.classList.add("md:scale-125", "md:duration-500");
      movieDescription.classList.remove("hidden");
      movieImg.classList.add("blur-[8px]");
      movieDescription.classList.add(
        "absolute",
        "top-[0]",
        "text-gray-300",
        "md:text-[11px]",
        "text-md",
        "h-[95%]",
        "overflow-scroll",
        "text-justify",
        "bg-textBg",
        "px-4",
        "py-4",
        "rounded-[2px]"
      );
    });
    imagewrapper.addEventListener("mouseleave", () => {
      movieDescription.innerHTML = this.movie.overview;
      imagewrapper.classList.remove("md:scale-125", "md:duration-500");
      movieDescription.classList.add("hidden");
      movieImg.classList.remove("blur-[8px]");
    });
    movieTitle.classList.add("text-lg", "font-bold");
    movieTitle.innerHTML = this.movie.title;
    movieDate.innerHTML = `Released: ${this.movie.release_date.substring(
      0,
      4
    )}`;
    movieDate.classList.add("text-sm");
    return movieWrapper;
  }
}

export default Movie;
