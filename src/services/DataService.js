// receives url and returns the result (either data or throws an error)

class DataService {
    constructor(url) {
        this.url = url
    }

    async fetchData () {
        try {
            const response = await fetch(this.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjEwNTBkMGE1ZjgzODExYzYyMjFlMTZkZjcxYmZmYSIsInN1YiI6IjY1NTM4NTBlZWE4NGM3MTA5NGZmNjI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qjQPO0PTEcXQnXecEIkTcTMzL_aVLzWJkZR9BYgTyP4"
                }
            })
            
            if(!response.ok) throw new Error(`HTTP error! Status: ${response}`);

            const data = await response.json()

            return data
        } catch (error) {
            console.error(`Error while fetching data: ${error.message}`)
            throw error
        }
    }
}

//testing
// const x = new DataService("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
// x.fetchData().then(data=>console.log(data)) //<< this causes problems

export default DataService