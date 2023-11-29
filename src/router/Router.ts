type Route = {
  path: string;
  component: Function;
};

class Router {
  routes: Route[];

  constructor() {
    this.routes = [];
    window.addEventListener("popstate", (e) => {
      this.handleRouteChange();
      const genreList = document.getElementById("genre-list");
      genreList?.classList.remove("hidden");
    });
  }

  handleRouteChange() {
    const currentUrl = window.location.pathname;
    const matchingRoute = this.routes.find((route) => {
      if (route.path === "*") return false
      return currentUrl.match(new RegExp(`^${route.path}$`));
    });
    if (matchingRoute) {
      matchingRoute.component();
    } else {
      const notFoundRounte = this.routes.find((r) => r.path === "*");
      notFoundRounte?.component();
    }
  }

  navigateToUrl(path: string) {
    history.pushState({}, "", path);
    this.handleRouteChange();
  }

  addUrl(routes: Route[]) {
    this.routes = routes;
  }
}

export default Router;

// routes: Route[]
// redirect(path: string) {
//   const url = path;
//   const urlParts = url.split("/");
//   let movieId;
//   let currentGenre;
//   let genrePage;
//   if (urlParts.includes("genre")) {
//     console.log(urlParts[urlParts.length - 1], urlParts[urlParts.length - 2]);
//     genrePage = urlParts[urlParts.length - 1];
//     currentGenre = urlParts[urlParts.length - 2];
//   } else {
//     movieId = urlParts[urlParts.length - 1];
//   }
//   switch (path) {
//     case "/":
//       this.renderMovies();
//       break;
//     case `/movie/${movieId}`:
//       this.renderMovie(Number(movieId));
//       break;
//     case `/movies/genre/${currentGenre}/${genrePage}`:
//       this.renderMoviesByGenre(currentGenre, String(genrePage));
//       break;
//     default:
//   }
// }

// private async renderMovies() {
//   try {
//     this.loader.render();
//     const res = await this.topRatedMovies.fetchTopRatedMovies(
//       this.currentPage
//     );
//     this.moviesVault = new Vault({ topRatedMovies: res.results });
//     this.movies = new MainContent(this.moviesVault.getSafe("topRatedMovies"));
//     this.appendX.clearAndAppendElement(
//       ".movies-container",
//       this.movies.renderMovieContainer()
//     );
//   } catch (error) {
//     //   const messageHandler = new ErrorBox();
//     // messageHandler.render(error.message, "error");
//   } finally {
//     //   loader.hide();
//   }
// }

// private async renderMovie(id: number) {
//   try {
//     // const mainContent = new MainContent();
//     const movie = await this.topRatedMovies.fetchMovieById(id);
//     this.movies.renderSingleMovieDetails(movie);
//   } catch (error) {}
// }

// private async renderMoviesByGenre(id: any, genrePage: string) {
//   try {
//     console.log(id, genrePage);
//     if (id === "All") {
//       if (this.moviesVault.getSafe("topRatedMovies")) {
//         this.movies = new MainContent(
//           this.moviesVault.getSafe("topRatedMovies")
//         );
//         this.appendX.clearAndAppendElement(
//           ".movies-container",
//           this.movies.renderMovieContainer()
//         );
//       } else {
//         this.renderMovies();
//       }
//     } else {
//       if (this.moviesVault.getSafe(id)) {
//         this.movies = new MainContent(this.moviesVault.getSafe(id));
//         this.appendX.clearAndAppendElement(
//           ".movies-container",
//           this.movies.renderMovieContainer()
//         );
//       } else {
//         try {
//           // loader.render();

//           const moviesByGenres = new MovieService();
//           const res = await moviesByGenres.fetchMoviesByGenre(id, genrePage);
//           this.moviesVault.createSafe(id, res.results);
//           const movies = new MainContent(this.moviesVault.getSafe(id));
//           this.appendX.clearAndAppendElement(
//             ".movies-container",
//             movies.renderMovieContainer()
//           );
//         } catch (error) {
//           // const messageHandler = new ErrorBox();
//           // let errorMessage = "Failed to do something exceptional";
//           // if (error instanceof Error) {
//           //   errorMessage = error.message;
//           // }
//           // messageHandler.render(errorMessage, "error");
//         } finally {
//           // loader.hide();
//         }
//       }
//       // console.log(id, genrePage);
//       // console.log("id, genrePage");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// import AppendX from "../services/AppendX";
// import MovieService from "../services/MovieService";
// import Vault from "../state-management/Vault";
// import Loading from "../ui/Loading";
// import MainContent from "../ui/MainContent";

// interface Movie {
//   adult: boolean;
//   backdrop_path: string;
//   genre_ids: number[];
//   id: number;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   release_date: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
// }

// this.loader = new Loading();
// this.topRatedMovies = new MovieService();
// this.currentPage = 1;
// this.movies = new MainContent();
// this.moviesVault = new Vault();
// this.appendX = new AppendX();

// loader;
// currentPage;
// topRatedMovies;
// movies: MainContent;
// moviesVault: Vault<Movie>;
// appendX;
