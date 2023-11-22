import DataService from "./DataService1";

interface Genres {
  id: number;
  name: string;
}

class GenreService extends DataService {
  async fetchGenres(): Promise<Genres[]> {
    const url: string =
      "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const res: Genres[] = (await this.fetchData(url));
    return res;
  }
}
