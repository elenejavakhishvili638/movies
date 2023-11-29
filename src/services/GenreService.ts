import DataService from "./DataService";
import { GenresArr } from "../interfaces/interfaces";

class GenreService extends DataService {
  constructor() {
    super("https://api.themoviedb.org/3");
  }

  async fetchGenres(): Promise<GenresArr> {
    return this.fetchData("/genre/movie/list?language=en");
  }
}

export default GenreService;
