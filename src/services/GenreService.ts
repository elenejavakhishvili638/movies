import DataService from "./DataService";

interface Genres {
  id: number;
  name: string;
}

class GenreService extends DataService {
  constructor() {
    super("https://api.themoviedb.org/3")
  }

  async fetchGenres(): Promise<Genres[]> {
    return this.fetchData("/genre/movie/list?language=en")
  }
}

export default GenreService