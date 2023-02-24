const movieSearch = document.getElementById('movie-search')
const mainSection = document.getElementById('main-section')
const searchBtn = document.getElementById('search-btn')
let arr = []


searchBtn.addEventListener('click', () => {
        queryForSearch() 
    console.log(movieSearch.value)
    movieSearch.value = ""

})





const getMovieDetails = async (imdbID) => {
    let data = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=d031105a`)
    let movie = await data.json()
    return movie
}

const queryForSearch = () => {
    fetch(`https://www.omdbapi.com/?apikey=2272d9fe&s=${movieSearch.value}`)
      
      // fetch("https://www.omdbapi.com/?i=tt6710474&apikey=d031105a")
    .then(res => res.json())
    .then(data => {

            const dats = data.Search.map((item) => {
                console.log(item.imdbID)
                getMovieDetails(item.imdbID).then(details => {

                        renderMovieCard(details)
                })
            })
        
    }) 

}

const renderMovieCard = (details) => {
    arr.unshift(details)
    let getHtml = arr.map((detail) => {

        return `
        <div class="movie-container">
        <div class="img-container">
        <img src="${detail.Poster}" alt="" class="movie-img">
        </div>
        <div class="container-movie-title">
        <div>
        <h3 class="movie-title">${detail.Title} <span class="year">(${detail.Year})</span></h3>
        <div class="movie-details">
        <p class="movie-duration">${detail.Runtime} | <span class="genre">${detail.Genre}</span></p>
        <span class="star">⭐ <span class="rating">${detail.imdbRating}</span></span>
        </div>
        <p class="movie-description">${detail.Plot}</p>
        </div>
        
        </div>
        </div>
        `
    }).join('')
    console.log(getHtml)
    mainSection.innerHTML = getHtml
    getHtml = ``
    
}
  

