// ----------- Show Date ----------------------------------------------------//
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let showTime = document.querySelector("#currentTime");
let currentTime = new Date();
showTime.innerHTML = formatDate(currentTime);

//-----------------Show Location Function------------------------------------------//
function displayWeatherConditions(response) {
  console.log(response.data);
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#tempMin").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#tempMax").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputSearching").value;
  searchCity(city);
}

let standort = document.querySelector("#searchForm");
standort.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "ca5af28648d86b7925348bb9fb85cd3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#button-addon2");
currentLocationButton.addEventListener("click", showLocation);
searchCity("Mexico City");
