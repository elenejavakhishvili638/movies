// receives url and returns the result (either data or throws an error)

class DataService {
  constructor(private baseUrl: string) {}

  async fetchData<T>(url: string) {
    try {
      const response = await fetch(`${this.baseUrl}${url}}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjEwNTBkMGE1ZjgzODExYzYyMjFlMTZkZjcxYmZmYSIsInN1YiI6IjY1NTM4NTBlZWE4NGM3MTA5NGZmNjI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjQPO0PTEcXQnXecEIkTcTMzL_aVLzWJkZR9BYgTyP4",
        },
      });

      const data: T = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default DataService;
