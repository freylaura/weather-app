function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  return `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  console.log(response.data.daily.condition);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <div class="forecast-date">
              ${forecastDay.time}</div>
              <img src="src/rainy-1.svg">
              <div class="forecast-temperature">
                <span class="forecast-temperature-max"> ${Math.round(
                  forecastDay.temperature.maximum
                )}°</span><span class="forecast-temperature-min"> ${Math.round(
        forecastDay.temperature.minimum
      )}°</span>  
            </div>
          </div>
         `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showForecast(city) {
  let apiKey = "t839o90730bbac3f30bc244a8bc9470a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement = document.querySelector("#location");
  cityElement.innerHTML = response.data.city;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  celsiusTemperature = Math.round(response.data.temperature.current);

  showForecast(response.data.city);
}
function search(city) {
  let apiKey = "t839o90730bbac3f30bc244a8bc9470a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchingInputElement = document.querySelector("#inputSearching");
  search(searchingInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}
let celsiusTemperature = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fahrenheitlink = document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsiuslink");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

search("Mexico City");
//////  current location
function displayCurrentLocation(position) {
  let apiKey = "t839o90730bbac3f30bc244a8bc9470a";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

navigator.geolocation.getCurrentPosition(displayCurrentLocation);
let getCurrentPosition = document.querySelector("#current-location-btn");
getCurrentPosition.addEventListener("submit", displayCurrentLocation);
