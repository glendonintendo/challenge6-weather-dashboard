const searchFormEl = document.querySelector("#search-form");
const cityInputEl = document.querySelector("#city");
const apiKey = "d3a330e6929f9f784d6290a5c6be1892"

const formSubmitHandler = function(event) {
    event.preventDefault();
    
    let cityName = cityInputEl.value.trim();

    if (cityName) {
        getLocation(cityName);
    } else {
        alert("Please enter the name of a city.")
    }
};

const getLocation = function(city) {
    console.log("Getting the location...");
    let locationApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(locationApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                console.log(data[0].lat, data[0].lon);
                getForecast(data[0].lat, data[0].lon);
            });
        }
    });
};

const getForecast = function(lat, lon) {
    console.log("Getting the forecast...");
    console.log(lat, lon);
    let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
    fetch(forecastApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        }
    });
};

// converts temperature from Kelvin to Fahrenheit to the tenths
const kelToFahr = function(temp) {
    return ((temp - 273.15) * 9/5 + 32).toFixed(1);
};

searchFormEl.addEventListener("submit", formSubmitHandler);