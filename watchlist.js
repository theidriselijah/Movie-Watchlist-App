let favorite = []
const watchlist = document.getElementById("watchlist-movie")
const removeIcon = document.getElementsByClassName("remove-icon")
const removeIconContainer = document.getElementsByClassName("remove-icon-container")

renderFavoriteMovie()

function renderFavoriteMovie() {
    if (localStorage.length) {
        watchlist.innerHTML = ""
        fetchFavoriteMovie()
    } else {
        watchlist.innerHTML = `
            <p class="watchlist-text">Your watchlist is looking a little empty...</p>
            <div class="explore-section">
                <img src="/images/add.png">
                <p class="explore"><a href="/index.html">Let's add some movies</a></p>
            </div>`
    }
}

async function fetchFavoriteMovie() {
    getStoredMovie()
    let movie = []
    
    favorite.map(async imdbId => {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=3e4ca394`)
        const data = await response.json()
        
        watchlist.innerHTML += getWatchlistHtml(data)
        movie.push(data.imdbID)
        
        for (let i = 0; i < movie.length; i++) {
            removeIcon[i].addEventListener("click", event => {
                localStorage.removeItem(movie[i], [i])
                removeIconContainer[i].innerHTML = `
                    <img src="/images/add.png" class="remove-icon">
                    <p>Removed</p>`
                removeIcon[i].style.cursor = "default"
            })
        }
    })
}

function getStoredMovie() {
    for (let i = 0; i < localStorage.length; i++) {
        favorite.push(localStorage.key(i))
    }
    return favorite
}

function getWatchlistHtml(data) {
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
                    <div class="remove-icon-container">
                        <img src="/images/remove.png" class="remove-icon">
                        <p>Remove</p>
                    </div>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
        </div>
        <hr>`
}