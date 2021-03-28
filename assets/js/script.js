// DATES

let currentDateEl = document.getElementById("current-date-el");
function displayDates() {
    currentDateEl.innerText = Date();
}
displayDates();
const updateTime = setInterval(displayDates, 1000);

// SEARCH FOR CITY
function citySearch() {
    let userSearch = citySearchTextEl.value;
    if (userSearch) {
        // get lat and lon from city name
        citySearchTextEl.value = "";
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${key}`)
            .then(function (cityResponse) {
                cityResponse.json()
                    .then(function (cityData) {
                        cityName = cityData.name;
                        let cityLat = Number(cityData.coord.lat);
                        let cityLon = Number(cityData.coord.lon);
                        // get required info from lat and lon                 
                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${key}`)
                            .then(function (llResponse) {
                                llResponse.json()
                                    .then(function (llData) {
                                        callData = llData;
                                        // save search to local storage
                                        saveSearch();
                                        // display information to page
                                        displayData();
                                    })
                            })
                    })
            });
    }
}

// SEARCH HISTORY
let keyIterator = 1;
let savedSearchObject = new Object();
function saveSearch() {
    savedSearchObject.name = cityName;
    savedSearchObject.data = JSON.stringify(callData);
    localStorage.setItem(JSON.stringify(keyIterator), JSON.stringify(savedSearchObject))
    keyIterator++;
}

function clearHistory() {
    while (searchULEl.firstChild) {
        searchULEl.removeChild(searchULEl.firstChild);
    }
    localStorage.clear();
    keyIterator = 1;
}

// DISPLAY INFORMATION ON PAGE
let cityName;
let callData;
let searchULEl = document.getElementById("search-bar-ul");
let forecastCityEl = document.getElementById("forecast-city-el");
let currentTempEl = document.getElementById("current-temp-el");
let currentHumidityEl = document.getElementById("current-humidity-el");
let currentWindSpeedEl = document.getElementById("current-wind-speed-el");
let currentUVIndexEl = document.getElementById("current-uv-index-el");

function displayData() {
    forecastCityEl.innerText = cityName;

}

// EVENT LISTENERS
let citySearchTextEl = document.getElementById("city-search-text");
let citySearchButtonEl = document.getElementById("city-search-button");
let clearButtonEl = document.getElementById("clear-button");

citySearchTextEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        citySearch();
    }
});
citySearchButtonEl.addEventListener("click", citySearch);
clearButtonEl.addEventListener("click", clearHistory);