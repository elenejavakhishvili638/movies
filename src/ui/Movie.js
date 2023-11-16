// receives movie object and returns a DOM node with its information

class Movie {
    constructor(movie) {
        this.movie = movie
    }

    createDomElement(elementName) { // <<can be abstracted to another class
        return document.createElement(elementName)
    }

    renderMovie() {
        const movieWrapper = this.createDomElement("div")
        const movieImg = movieWrapper.appendChild(this.createDomElement("img"))
        const movieTitle = movieWrapper.appendChild(this.createDomElement("span"))
        const movieDate = movieWrapper.appendChild(this.createDomElement("span"))
        
        movieWrapper.classList.add("flex","flex-col")
        movieImg.src = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        movieImg.classList.add("mb-4")
        movieTitle.classList.add("text-lg", "font-bold")
        movieTitle.innerHTML = this.movie.title
        movieDate.innerHTML = `Released: ${this.movie.release_date.substring(0,4)}`

        return movieWrapper
    }
}

export default Movie