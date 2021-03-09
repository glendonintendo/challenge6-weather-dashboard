const searchFormEl = document.querySelector("#search-form");
const cityInputEl = document.querySelector("#city");
const weatherEl = document.querySelector("#weather");
const apiKey = "d3a330e6929f9f784d6290a5c6be1892"

// handler for clicking search button
const formSubmitHandler = function(event) {
    event.preventDefault();
    
    let cityName = cityInputEl.value.trim();

    if (cityName) {
        getLocation(cityName);
    } else {
        alert("Please enter the name of a city.")
    }
};

// get longitude and latitude of city using openweather api with city name
const getLocation = function(city) {
    let locationApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayLocationContent(data);
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
        <h2 class="text-center">${getLocationString(data)} - ${moment().format("MM/DD/YYYY")}</h2>
        <image id="weather-icon" />
        <p id="temp"></p>
        <p id="humidity"></p>
        <p id="wind-speed"></p>
        <p id="uv-index"></p>
        
        <h3 class="text-center">5-Day Forecast</h3>
        <div id="forecast"></div>
    `
    
    const forecastEl = document.querySelector("#forecast");
    for (let i = 1; i <= 5; i++) {
        let forecastDayEl = document.createElement("div");
        forecastDayEl.className = "day card";
        forecastDayEl.innerHTML = `
            <h4 class="card-header text-center">${moment().add(i, "days").format("MM/DD/YYYY")}</h4>
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
    document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
    document.querySelector("#weather-icon").setAttribute("alt", `${weather.weather[0].description}`)
    document.querySelector("#temp").innerHTML = kelToFahr(weather.temp);
    document.querySelector("#humidity").innerHTML = weather.humidity;
    document.querySelector("#wind-speed").innerHTML = weather.wind_speed;
    document.querySelector("#uv-index").innerHTML = weather.uvi;


    for (let i = 1; i <= 5; i++) {
        let dayForecastEl = document.querySelector(`#day${i}`);
        let forecast = data.daily[i - 1];
        dayForecastEl.innerHTML = `
            <image src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}" />
            ${kelToFahr(forecast.temp.day)}, ${forecast.humidity}, ${forecast.wind_speed}
        `;
    }
};

// converts temperature from Kelvin to Fahrenheit to the tenths
const kelToFahr = function(temp) {
    return ((temp - 273.15) * 9/5 + 32).toFixed(1);
};

searchFormEl.addEventListener("submit", formSubmitHandler);