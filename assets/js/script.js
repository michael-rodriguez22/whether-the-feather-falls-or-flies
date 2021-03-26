let citySearchButtonEl = document.getElementById("city-search-button");
let citySearchTextEl = document.getElementById("city-search-text");
let userSearch;

function citySearch() {
    userSearch= citySearchTextEl.value;
    console.log(userSearch);
}

citySearchButtonEl.addEventListener("click", citySearch);