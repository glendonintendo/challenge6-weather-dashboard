const searchFormEl = document.querySelector("#search-form");
const cityInputEl = document.querySelector("#city");
const weatherEl = document.querySelector("#weather");
const searchHistoryEl = document.querySelector("#search-history");
const searchedCitiesEl = document.querySelector("#searched-cities");
const apiKey = "d3a330e6929f9f784d6290a5c6be1892";
let cityForStorage;
let citiesForStorage = [];

const weatherIcons = {
    "01d": "sun-fill.svg",
    "01n": "moon-fill.svg",
    "02d": "cloud-sun-fill.svg",
    "02n": "cloud-moon-fill.svg",
    "03d": "cloud-fill.svg",
    "03n": "cloud-fill.svg",
    "04d": "cloud-fill.svg",
    "04n": "cloud-fill.svg",
    "09d": "cloud-rain-fill.svg",
    "09n": "cloud-rain-fill.svg",
    "10d": "cloud-rain-fill.svg",
    "10n": "cloud-rain-fill.svg",
    "11d": "cloud-lightning-fill.svg",
    "11n": "cloud-lightning-fill.svg",
    "13d": "cloud-snow-fill.svg",
    "13n": "cloud-snow-fill.svg",
    "50d": "cloud-haze2--fill.svg",
    "50n": "cloud-haze2-fill.svg"
};

// handler for clicking search button
const formSubmitHandler = function(event) {
    event.preventDefault();
    
    let cityName = cityInputEl.value.trim();

    if (cityName) {
        cityForStorage = cityName;
        getLocation(cityName);
    } else {
        alert("Please enter the name of a city.")
    }
};

const previousSearchHandler = function(event) {
    event.preventDefault();
    let previousCity = event.target;

    console.log(previousCity);
    if (previousCity.classList.contains("previous-city")) {
        cityForStorage = previousCity.innerHTML;
        getLocation(previousCity.innerHTML);
    }
}

// get longitude and latitude of city using openweather api with city name
const getLocation = function(city) {
    let locationApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                if (data.length === 0) {
                    return window.alert("Please enter a valid city.");
                }
                displayLocationContent(data);
                setCity(cityForStorage);
                getForecast(data[0].lat, data[0].lon);
            });
        }
    });
};

// get forecast of city using openweather api with longitude and latitude
const getForecast = function(lat, lon) {
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    fetch(forecastApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeatherContent(data);
            });
        }
    });
};

// create and populates location information from getLocation call
const displayLocationContent = function(data) {
    weatherEl.innerHTML = "";

    weatherEl.innerHTML = `
        <h2 class="text-center">${getLocationString(data)} - ${moment().format("MMMM DD, YYYY")}</h2>
        <div id="weather-info">
            <image id="weather-icon" />
            <div>
                <p id="temp"></p>
                <p id="humidity"></p>
                <p id="wind-speed"></p>
                <p id="uv-index"></p>
            </div>
        </div>
        <h3 class="text-center">5-Day Forecast</h3>
        <div id="forecast"></div>
    `
    
    const forecastEl = document.querySelector("#forecast");
    for (let i = 1; i <= 5; i++) {
        let forecastDayEl = document.createElement("div");
        forecastDayEl.className = "day card";
        forecastDayEl.innerHTML = `
            <h4 class="card-header text-center">${moment().add(i, "days").format("MMM Do")}</h4>
            <p class="card-text" id="day${i}"></p>
        `;
        forecastEl.appendChild(forecastDayEl);
    }
};

const getLocationString = function(data) {
    if (data[0].state) {
        return `${data[0].name}, ${data[0].state}`;
    }
    return `${data[0].name}, ${data[0].country}`;
};

const displayWeatherContent = function(data) {
    console.log(data);
    
    let weather = data.current;
    document.querySelector("#weather-icon").setAttribute("src", `./assets/images/${weatherIcons[weather.weather[0].icon]}`);
    document.querySelector("#weather-icon").setAttribute("alt", `${weather.weather[0].description}`)
    document.querySelector("#temp").innerHTML = `Temperature: ${kelToFahr(weather.temp)}F`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${weather.humidity}%`;
    document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${weather.wind_speed} MPH`;
    document.querySelector("#uv-index").innerHTML = `UV Index: <span id="color-change">${weather.uvi}</span>`;

    getUvStyles(weather.uvi);


    for (let i = 1; i <= 5; i++) {
        let dayForecastEl = document.querySelector(`#day${i}`);
        let forecast = data.daily[i - 1];
        dayForecastEl.innerHTML = `
            <image class="forecast-icon" src="./assets/images/${weatherIcons[forecast.weather[0].icon]}" alt="${forecast.weather[0].description}" />
            <div class="forecast-stat">
                <p>Temperature: ${kelToFahr(forecast.temp.day)}F</p>
                <p>Humidity: ${forecast.humidity}%</p>
                <p>Wind Speed: ${forecast.wind_speed.toFixed(1)} MPH</p>
            </div>
        `;
    }
};

// converts temperature from Kelvin to Fahrenheit to the tenths
const kelToFahr = function(temp) {
    return ((temp - 273.15) * 9/5 + 32).toFixed(1);
};


const getUvStyles = function(uvi) {
    let uviEl = document.querySelector("#color-change");
    if (uvi < 3) {
        uviEl.className = "uv-favorable";
    } else if (uvi < 8) {
        uviEl.className = "uv-moderate";
    } else {
        uviEl.className = "uv-severe";
    }
};

const setCity = function(city) {
    if (citiesForStorage.includes(city)) {
        let cityIndex = citiesForStorage.indexOf(city);
        console.log(cityIndex);
        citiesForStorage.splice(cityIndex, 1);
        citiesForStorage.unshift(city);
    } else {
        citiesForStorage.unshift(city);
    }

    if (citiesForStorage.length > 8) {
        citiesForStorage.pop();
    }
    
    localStorage.setItem("cities", JSON.stringify(citiesForStorage));
    getCities();
};

const getCities = function() {
    let storedCities = localStorage.getItem("cities");

    if (!storedCities) {
        return false;
    }

    citiesForStorage = JSON.parse(storedCities);
    createSearchHistoryEl();
};

const createSearchHistoryEl = function() {
    searchedCitiesEl.innerHTML = "";
    for (let i = 0; i < citiesForStorage.length; i++) {
        let previousCityEl = document.createElement("button");
        previousCityEl.className = "previous-city btn btn-secondary";
        previousCityEl.innerHTML = citiesForStorage[i];
        searchedCitiesEl.appendChild(previousCityEl);
    }
};

searchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", previousSearchHandler);
getCities();