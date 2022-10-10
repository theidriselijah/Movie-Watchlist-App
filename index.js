let movies = []
const searchBar = document.getElementById("search-bar")
const searchButton = document.getElementById("search-btn")
const searchedMovie = document.getElementById("searched-movie")
const addIcon = document.getElementsByClassName("add-icon")
const addIconContainer = document.getElementsByClassName("add-icon-container")

searchButton.addEventListener("click", searchMovies)

searchBar.onkeydown = event => {
    if (searchBar.value) {
        if (event.keyCode == 13) {
            searchMovies()
        }
    }
}

async function searchMovies() {
    searchedMovie.innerHTML = ""
    let response = await fetch(`https://www.omdbapi.com/?s=${searchBar.value}&apikey=3e4ca394`)
    let data = await response.json()
    
    function getMovies(data) {
        if (data.response == "False") {
            searchedMovie.innerHTML = `
                <div class="fail-container">
                    <p class="fail-text">Unable to find what you're looking for. Please try another search.</p>
                </div>`
        } else {
            getMovie(data)
        }
    }
    
    function getMovie() {
        data.Search.flatMap(async item => {
            response = await fetch(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=3e4ca394`)
            data = await response.json()
            
            data.Title == "N/A" || data.Poster == undefined || data.Poster == "N/A" ? [] 
                : searchedMovie.innerHTML += getMovieHtml(data)
            
            movies.push(data.imdbID)
            for (let i = 0; i < movies.length; i++) {
                addIcon[i].addEventListener("click", () => {
                    localStorage.setItem(movies[i], [i])
                    addIconContainer[i].innerHTML = `
                        <img src="/images/remove.png" class="add-icon">
                        <p>Added</p>`
                    addIcon[i].style.cursor = "default"              
                })
            }
            
        })
    }
    getMovies(data)
}

function getMovieHtml(data) {
    return `
        <div class="movie-container">
            <div class="poster-container">
                <img class="poster" src="${data.Poster}">
            </div>
            <div class="movie-info-container">
                <div class="movie-title">
                    <h3>${data.Title}</h3>
                    <img src="images/star.png">
                    <p class="rating">${data.imdbRating}</p>
                </div>
                <div class="movie-stats">
                    <p class="runtime">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <div class="add-icon-container">
                        <img src="/images/add.png" class="add-icon">
                        <p>Watchlist</p>
                    </div>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>
        <hr>`
} 