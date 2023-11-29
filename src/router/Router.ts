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
      const main = document.querySelector("#main-container");
      const relatedMovies = document.querySelector("#related-movie-slider");
      const genreList = document.getElementById("genre-list");

      genreList?.classList.remove("hidden");
      if (relatedMovies) {
        main?.removeChild(relatedMovies);
        const m = document.querySelector("#movies");
        m?.classList.add("overflow-scroll");
      }
    });
  }

  handleRouteChange() {
    const currentUrl = window.location.pathname;
    const matchingRoute = this.routes.find((route) => {
      return currentUrl.match(new RegExp(`^${route.path}$`));
    });
    if (matchingRoute) {
      matchingRoute.component();
    } else {
      console.log("No matches.");
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