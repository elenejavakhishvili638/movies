import DataService from "./DataService";
import { GenresArr } from "../interfaces/interfaces";
import { BASE_URL } from "../env/enviroment";

class GenreService extends DataService {
  constructor() {
    super(BASE_URL);
  }

  async fetchGenres(): Promise<GenresArr> {
    return this.fetchData("/genre/movie/list?language=en");
  }
}

export default GenreService;
