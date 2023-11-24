import DataService from "./DataService";

interface GenresArr {
  genres:Genres[]
}

interface Genres {
  id: number;
  name: string;
}

class GenreService extends DataService {
  constructor() {
    super("https://api.themoviedb.org/3")
  }

  async fetchGenres(): Promise<GenresArr> {
    return this.fetchData("/genre/movie/list?language=en")
  }
}

export default GenreService