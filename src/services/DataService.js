// receives url and returns the result (either data or throws an error)

class DataService {
  constructor(url) {
    this.url = url;
  }
  async fetchData() {
    try {
      const response = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjEwNTBkMGE1ZjgzODExYzYyMjFlMTZkZjcxYmZmYSIsInN1YiI6IjY1NTM4NTBlZWE4NGM3MTA5NGZmNjI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjQPO0PTEcXQnXecEIkTcTMzL_aVLzWJkZR9BYgTyP4",
        },
      });

      // console.log(response)
      const data = await response.json();
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${data["status_message"]}`);

      return data;
    } catch (error) {
      // console.error(`Error while fetching data: ${error.message}`);
      throw error;
    }
  }
}

export default DataService;
