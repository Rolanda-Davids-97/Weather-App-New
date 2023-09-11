function formatDate(date) {
  let h2 = document.querySelector("h2");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentHour = date.getHours();
  let currentMinutes = date.getMinutes();
  let todaysDate = `${currentDay}, ${currentDate} ${currentMonth}, ${currentHour}:${currentMinutes}`;
  h2.innerHTML = todaysDate;
}
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#temperature-description");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#city").innerHTML = response.data.name;
}

function findCity(city) {
  let apiKey = "b28124b28c5acc252cee28bc2facf3a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid${apiKey}units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let city = document.querySelector("#city-input-text").Value;
findCity(city);

function convertingCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 18;
}

function convertingFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 64;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input-text").value;
  findCity(city);
}

function searchLocation(position) {
  let apiKey = "b28124b28c5acc252cee28bc2facf3a4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

findCity("Johannesburg");
