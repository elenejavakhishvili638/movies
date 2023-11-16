// receives movies array and returns a movie container populated with the movies with help of Movie class

import Movie from "./Movie";

class MainContent {
  constructor(moviesArr) {
    this.moviesArr = moviesArr;
  }

  renderMovieContainer() {
    this.moviesArr.forEach((mov) => {
      const m = new Movie(mov);
      m.renderMovie();
    });
  }
}

export default MainContent;
