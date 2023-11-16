//main logic

import DataService from './services/DataService';
import './style.css';
import MainContent from './ui/MainContent';
import "./header.js";

const mainContentContainer = document.querySelector(".movies-container")

const topRatedMovies = new DataService("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=4")
topRatedMovies.fetchData().then(res=>{
    const mainContent = new MainContent(res.results)
    mainContentContainer.appendChild(mainContent.renderMovieContainer())
})
