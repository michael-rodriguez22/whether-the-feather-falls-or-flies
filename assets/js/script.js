let cityName;
// let callData;
// DATES

let currentDateEl = document.getElementById("current-date-el");
let daysOneDateEl = document.getElementById("daysOneDateEl");
let daysTwoDateEl = document.getElementById("daysTwoDateEl");
let daysThreeDateEl = document.getElementById("daysThreeDateEl");
let daysFourDateEl = document.getElementById("daysFourDateEl");
let daysFiveDateEl = document.getElementById("daysFiveDateEl");
// function displayDates() {
//     currentDateEl.innerText = Date();
// }
// displayDates();

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
                        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${key}`)
                            .then(function (llResponse) {
                                llResponse.json()
                                    .then(function (llData) {
                                        // callData = llData;
                                        // save search to local storage
                                        saveSearch(llData);
                                        // display information to page
                                        displayData(llData);
                                    })
                            })
                    })
            });
    }
}

// SEARCH HISTORY
let searchULEl = document.getElementById("search-bar-ul");
let keyIterator;
let savedSearchObject = new Object();
function saveSearch(passedData) {
    keyIterator = (localStorage.length + 1);
    savedSearchObject.name = cityName;
    savedSearchObject.data = JSON.stringify(passedData);
    localStorage.setItem(String(keyIterator), JSON.stringify(savedSearchObject));
}

function clearHistory() {
    while (searchULEl.firstChild) {
        searchULEl.removeChild(searchULEl.firstChild);
    }
    localStorage.clear();
}

let newLi;
function displayHistory(passedName, passedData) {
    searchULEl.innerHTML = ""
    for (let i = localStorage.length; i > 0; i--) {
        savedSearchObject.name = JSON.parse(localStorage.getItem(i)).name;
        savedSearchObject.data = JSON.parse(JSON.parse(localStorage.getItem(i)).data);
        passedName = savedSearchObject.name;
        passedData = savedSearchObject.data;
        newLi = document.createElement("li");
        newLi.innerText = passedName;
        searchULEl.appendChild(newLi);
    }
}

if (localStorage.length) {
    displayHistory(localStorage[localStorage.length].name, localStorage[localStorage.length].data);    
}

// current forecast elements
let forecastCityEl = document.getElementById("forecast-city-el");
let currentWeatherIconEl = document.getElementById("current-weather-icon-el");
let currentTempEl = document.getElementById("current-temp-el");
let currentHumidityEl = document.getElementById("current-humidity-el");
let currentWindSpeedEl = document.getElementById("current-wind-speed-el");
let currentUVIndexEl = document.getElementById("current-uv-index-el");
// 5 day forecast elements
let daysOneImageEl = document.getElementById("daysOneImageEl");
let daysOneTempEl = document.getElementById("daysOneTempEl");
let daysOneHumidityEl = document.getElementById("daysOneHumidityEl");
let daysTwoImageEl = document.getElementById("daysTwoImageEl");
let daysTwoTempEl = document.getElementById("daysTwoTempEl");
let daysTwoHumidityEl = document.getElementById("daysTwoHumidityEl");
let daysThreeImageEl = document.getElementById("daysThreeImageEl");
let daysThreeTempEl = document.getElementById("daysThreeTempEl");
let daysThreeHumidityEl = document.getElementById("daysThreeHumidityEl");
let daysFourImageEl = document.getElementById("daysFourImageEl");
let daysFourTempEl = document.getElementById("daysFourTempEl");
let daysFourHumidityEl = document.getElementById("daysFourHumidityEl");
let daysFiveImageEl = document.getElementById("daysFiveImageEl");
let daysFiveTempEl = document.getElementById("daysFiveTempEl");
let daysFiveHumidityEl = document.getElementById("daysFiveHumidityEl");

// DISPLAY INFO ON PAGE
function displayData(passedData) {
    forecastCityEl.innerText = cityName;
    currentWeatherIconEl.src = `http://openweathermap.org/img/wn/${passedData.current.weather[0].icon}@2x.png`;
    currentTempEl.innerText = passedData.current.temp;
    currentHumidityEl.innerText = passedData.current.humidity;
    currentWindSpeedEl.innerText = passedData.current.wind_speed;
    currentUVIndexEl.innerText = passedData.current.uvi;
    if (passedData.current.uvi < 3) {
        currentUVIndexEl.style.backgroundColor = "#2e8b57";
    } else if (passedData.current.uvi > 3 && passedData.current.uvi <= 8) {
        currentUVIndexEl.style.backgroundColor = "#dfdf3191";
    } else {
        currentUVIndexEl.style.backgroundColor = "#8000009e";
    }
    daysOneImageEl.src = `http://openweathermap.org/img/wn/${passedData.daily[1].weather[0].icon}@2x.png`;
    daysTwoImageEl.src = `http://openweathermap.org/img/wn/${passedData.daily[2].weather[0].icon}@2x.png`;
    daysThreeImageEl.src = `http://openweathermap.org/img/wn/${passedData.daily[3].weather[0].icon}@2x.png`;
    daysFourImageEl.src = `http://openweathermap.org/img/wn/${passedData.daily[4].weather[0].icon}@2x.png`;
    daysFiveImageEl.src = `http://openweathermap.org/img/wn/${passedData.daily[5].weather[0].icon}@2x.png`;
    daysOneTempEl.innerText = passedData.daily[1].temp.day;
    daysTwoTempEl.innerText = passedData.daily[2].temp.day;
    daysThreeTempEl.innerText = passedData.daily[3].temp.day;
    daysFourTempEl.innerText = passedData.daily[4].temp.day;
    daysFiveTempEl.innerText = passedData.daily[5].temp.day;
    daysOneHumidityEl.innerText = passedData.daily[1].humidity;
    daysTwoHumidityEl.innerText = passedData.daily[2].humidity;
    daysThreeHumidityEl.innerText = passedData.daily[3].humidity;
    daysFourHumidityEl.innerText = passedData.daily[4].humidity;
    daysFiveHumidityEl.innerText = passedData.daily[5].humidity;
    displayHistory();
    // displayDates();
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