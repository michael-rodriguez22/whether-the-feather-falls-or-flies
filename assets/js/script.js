let citySearchTextEl = document.getElementById("city-search-text");
let citySearchButtonEl = document.getElementById("city-search-button");
let searchULEl = document.getElementById("search-bar-ul");
let clearButtonEl = document.getElementById("clear-button");
let userSearch;


function citySearch() {
    userSearch = citySearchTextEl.value;
    if (userSearch) {
        document.getElementById("forecast-city-el").innerText = userSearch;
        let newLI = document.createElement("li");
        newLI.innerText = userSearch;
        searchULEl.prepend(newLI);
        citySearchTextEl.value = "";
    }
}

citySearchButtonEl.addEventListener("click", citySearch);
citySearchTextEl.addEventListener("keypress", function(e){
    if (e.key === "Enter" ) {
        citySearch()
    }
})

function clearHistory() {
    while (searchULEl.firstChild) {
        searchULEl.removeChild(searchULEl.firstChild);
    }
}

clearButtonEl.addEventListener("click", clearHistory);