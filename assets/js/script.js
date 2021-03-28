let citySearchTextEl = document.getElementById("city-search-text");
let citySearchButtonEl = document.getElementById("city-search-button");
let searchULEl = document.getElementById("search-bar-ul");
let clearButtonEl = document.getElementById("clear-button");
let userSearch;
let cityName;
let cityLat;
let cityLon;
let callData;


function citySearch() {
    userSearch = citySearchTextEl.value;
    if (userSearch) {
        // get lat and lon from city name
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${key}`)
            .then(function (cityResponse) {
                cityResponse.json()
                    .then(function (cityData) {
                        cityName = cityData.name;
                        cityLat = Number(cityData.coord.lat);
                        cityLon = Number(cityData.coord.lon);
                        // get required info from lat and lon                 
                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${key}`)
                            .then(function (llResponse) {
                                llResponse.json()
                                    .then(function (llData) {
                                        callData = llData;
                                        // save search to local storage
                                        saveSearch();
                                        // display information to page
                                    })
                            })
                    })
            });
    }
}

let savedSearchObject = new Object();
function saveSearch() {
    savedSearchObject.name = cityName;
    savedSearchObject.data = JSON.stringify(callData);
    // console.log(savedSearchObject);
    localStorage.setItem("1", JSON.stringify(savedSearchObject))
}

function clearHistory() {
    while (searchULEl.firstChild) {
        searchULEl.removeChild(searchULEl.firstChild);
    }
}

citySearchTextEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        citySearch();
    }
});
citySearchButtonEl.addEventListener("click", citySearch);
clearButtonEl.addEventListener("click", clearHistory);