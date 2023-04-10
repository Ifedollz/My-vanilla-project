let now = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = String(now.getHours()).padStart(2, "0");
let minutes = String(now.getMinutes()).padStart(2, "0");

h2.innerHTML = `${day} ${hours}:${minutes}`;

let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let citySearchInput = document.querySelector("#city-search-input");
let currentTemperature = document.querySelector("#current-temp-value");
let currentHumidity = document.querySelector("#humidity");
let currentWind = document.querySelector("#wind");

function updateLocationData(response) {
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  let humidity = `${response.data.main.humidity}`;
  currentHumidity.innerHTML = `${humidity}`;
  let wind = Math.round(response.data.wind.speed);
  currentWind.innerHTML = `${wind}`;
  let weatherDescription = `${response.data.weather[0].description}`;
  h3.innerHTML = `${weatherDescription}`;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "5b47be810b7b8be1078df88b9456a97c";
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
  let apiKey = "5b47be810b7b8be1078df88b9456a97c";
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

//function convertToCelsius(event) {
//  event.preventDefault();
//  let currentTempValue = document.querySelector(".current-temp-value");
//  currentTempValue.innerHTML = 21;
//}

//let celsiusTemp = document.querySelector("#celsius");
//celsiusTemp.addEventListener("click", convertToCelsius);

//function convertToFahrenheit(event) {
//  event.preventDefault();
//  let currentTempValue = document.querySelector(".current-temp-value");
//  currentTempValue.innerHTML = 71;
//}

//let fahrenheitTemp = document.querySelector("#fahrenheit");
//fahrenheitTemp.addEventListener("click", convertToFahrenheit);