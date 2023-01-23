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

//------------------Show Location -----------------------------------------------------//

let location = document.querySelector("#searchForm");
location.addEventListener("submit", showLocation);
console.log(location);
//-----------------Show Location Function------------------------------------------//
function showLocation(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#inputSearching");
  let cityElement = document.querySelector("#currentLocation");
  cityElement.innerHTML = cityInput.value;

  let units = "metric";
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
//-------------------------Show Temp-----------------------------------------
function showTemp(response) {
  let tempElement = document.querySelector("#currentTemperature");
  tempElement.innerHTML = ` ${Math.round(response.data.main.temp)}°`;
  let humElement = document.querySelector("#hum");
  humElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  let tempMindElement = document.querySelector("#tempMind");
  tempMindElement.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  let tempMaxElement = document.querySelector("#tempMax");
  tempMaxElement.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
}
//------------ function current location --------------------------------------------

function searchLocation(position) {
  let apiKey = "49b631c45785fe73d2a88477803dea22";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#button-addon2");
currentLocationButton.addEventListener("click", currentLocation);
