function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hour = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day},${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let citySearchInput = document.querySelector("#city-search-input");
let currentTemperature = document.querySelector("#current-temp-value");
let currentHumidity = document.querySelector("#humidity");
let currentWind = document.querySelector("#wind");

function updateLocationData(response) {
  document.querySelector("#date").innerHTML = `${formatDate(response.data.dt)}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  let humidity = `${response.data.main.humidity}`;
  currentHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `${wind}`;
  let weatherDescription = `${response.data.weather[0].description}`;
  h3.innerHTML = `${weatherDescription}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    ` https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateLocationData);
}

function findCity(event) {
  event.preventDefault();
  let city = `${citySearchInput.value}`;
  searchCity(city);
}

let searchButton = document.querySelector(".search-box");
searchButton.addEventListener("submit", findCity);

function getCurrentLocationData(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateLocationData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationData);
}

let compass = document.querySelector(".compass");
compass.addEventListener("click", getCurrentLocation);

searchCity("Toronto");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemp = "null";
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
function displayforecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
  <div class="weather-forecast -date">${formatDay(forecastDay.dt)}</div>
  <img src=" https://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt=""width="42">
  <div class="weather-forecast-temp"><span class="max-temp">${Math.round(
    forecastDay.temp.max
  )}°</span>
  <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
  </div>
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayforecast);
}
