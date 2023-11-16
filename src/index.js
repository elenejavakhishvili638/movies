//main logic

import DataService from './services/DataService';
import './style.css';
import MainContent from './ui/MainContent';
import "./header.js";

const topRatedMovies = new DataService("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
topRatedMovies.fetchData().then(res=>{
    // console.log(res.results)

    const mainContent = new MainContent(res.results)
    mainContent.renderMovieContainer()
})
