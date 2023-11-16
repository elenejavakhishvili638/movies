// receives movie object and returns a DOM node with its information

class Movie {
    constructor(movie) {
        this.movie = movie
    }

    renderMovie() {
        
        console.log(this.movie)
    }
}

export default Movie