// receives url and returns the result (either data or throws an error)
import Loading from "../ui/Loading";

class DataService {
  constructor(url) {
    this.url = url;
  }
  async fetchData() {
    const loader = new Loading();
    try {
      loader.show();
      const response = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjEwNTBkMGE1ZjgzODExYzYyMjFlMTZkZjcxYmZmYSIsInN1YiI6IjY1NTM4NTBlZWE4NGM3MTA5NGZmNjI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjQPO0PTEcXQnXecEIkTcTMzL_aVLzWJkZR9BYgTyP4",
        },
      });
      const data = await response.json();
      
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${data["status_message"]}`);

      return data;
    } catch (error) {
      throw error;
    } finally {
      if(loader.isLoading){
        loader.hide();
      }
    }
  }
}

export default DataService;
