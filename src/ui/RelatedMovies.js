import AppendX from "../services/AppendX";
import DataService from "../services/DataService";
import fallBackImg from "../assets/gray-bg.png"

class RelatedMovies extends DataService {
    constructor(movieId){
        super(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`)
    }

    renderRelatedMovieSlider () {
        const appendX = new AppendX()
        const relatedMovies = document.createElement("div")
        relatedMovies.id = "slider-container"
        relatedMovies.classList.add("flex", "gap-[10px]", "overflow-x-scroll")

        this.fetchData().then(data=>{
            data.results.forEach(movie => {
                // if(movie.title.toLowerCase() === "foul play") console.log(movie.poster_path)
                const movieNode = document.createElement("div")
                movieNode.id = "movie-node"
                movieNode.classList.add("min-w-[170px]")
                const moviePoster = document.createElement("img")
                moviePoster.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : fallBackImg
                moviePoster.alt = "movie-poster"
                moviePoster.classList.add("w-[100%]", "max-h-[200px]",  "h-[100%]", "object-cover")
                const movieTitle = document.createElement("span")
                movieTitle.innerHTML = movie.title

                movieNode.append(moviePoster, movieTitle)


                appendX.appendElement("#slider-container", movieNode)
            })
        })

        return relatedMovies
    }
}

export default RelatedMovies