// receives movies array and returns a movie container populated with the movies with help of Movie class

import Movie from "./Movie";

class MainContent {
  constructor(moviesArr) {
    this.moviesArr = moviesArr;
  }

    renderMovieContainer() {
        const movieContainer = document.createElement("div") // <<creates container for the movies
        movieContainer.classList.add("grid", "grid-cols-5", "gap-12")

        this.moviesArr.forEach(mov => { // <<loops over the movies and passes each of them to the Movie class
            const m = new Movie(mov) 
            const movieNode = m.renderMovie()

            movieContainer.appendChild(movieNode)
        });
        return movieContainer
    }
}

export default MainContent;
