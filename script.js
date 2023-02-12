const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=84cf6c0a10e92ea9af298c9b8eef7fb8&page=1";

// 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=84cf6c0a10e92ea9af298c9b8eef7fb8&query='";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h2>${title}</h2>
          <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h2>Overview</h2>
          <p>
            ${overview}
          </p>
        </div>
      `;
    main.appendChild(movieEl);
  });
}
function getClassbyRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
