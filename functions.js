let now = new Date();
let time = document.querySelector("#time");
let days = ["Sun", "Monday", "Tue", "Wed", "Thu", "Fri", "Sat"];
let hour = now.getHours();
let minutes = now.getMinutes();
function minutesZero(now) {
  return (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
}
time.innerHTML = `${days[now.getDay()]}, ${hour}: ${minutesZero(now)}`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2625d6a8fc1f0d27c67c06204d7105e5";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col day">
              <h5>${formatDay(forecastDay.dt)}</h5>
              <div class="data">${Math.round(
                forecastDay.temp.max
              )}°/${Math.round(forecastDay.temp.min)}°</div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""/>
            </div>`;
      forecastHTML = forecastHTML + ``;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function showTemp(response) {
  celcTemp = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let weather = response.data.weather[0].main;
  let humidity = response.data.main.humidity;
  let icon = response.data.weather[0].icon;
  let heading = document.querySelector("#temperature");
  let windToday = document.querySelector("#wind");
  let weatherToday = document.querySelector("#weatherType");
  let iconToday = document.querySelector("#iconToday");
  let humidityToday = document.querySelector("#humidity");
  heading.innerHTML = temp;
  windToday.innerHTML = wind;
  weatherToday.innerHTML = weather;
  humidityToday.innerHTML = humidity;
  iconToday.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#cityChanger");
  let h1 = document.querySelector("#city");
  h1.innerHTML = input.value;
  console.log(input.value);
  function cityTemp(position) {
    let apiKey = "2625d6a8fc1f0d27c67c06204d7105e5";
    let unit = "metric";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${unit}`;
    axios.get(apiURL).then(showTemp);
  }

  cityTemp();
}

function positionNow(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2625d6a8fc1f0d27c67c06204d7105e5`;
  console.log(apiURL);
  axios.get(apiURL).then(showTemp);
}

let form = document.querySelector("#cityForm");
form.addEventListener("submit", cityChange);

function getCurrLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(positionNow);
}

let currentLoc = document.querySelector("#currentLocationButton");
currentLoc.addEventListener("click", getCurrLocation);

function moscowTemper(response) {
  celcTemp = Math.round(response.data.main.temp);
  let moscowTemp = Math.round(response.data.main.temp);
  let moscowWind = Math.round(response.data.wind.speed);
  let initialWind = document.querySelector("#wind");
  let initialTemp = document.querySelector("#temperature");
  initialTemp.innerHTML = moscowTemp;
  initialWind.innerHTML = moscowWind;
  let moscowWeather = response.data.weather[0].main;
  let moscowHumidity = response.data.main.humidity;
  let moscowIcon = response.data.weather[0].icon;
  let moscowWeatherToday = document.querySelector("#weatherType");
  let moscowIconToday = document.querySelector("#iconToday");
  let moscowHumidityToday = document.querySelector("#humidity");
  moscowWeatherToday.innerHTML = moscowWeather;
  moscowHumidityToday.innerHTML = moscowHumidity;
  moscowIconToday.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${moscowIcon}@2x.png`
  );
  getForecast(response.data.coord);
}

function positionMoscow(position) {
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=2625d6a8fc1f0d27c67c06204d7105e5";
  console.log(apiURL);
  axios.get(apiURL).then(moscowTemper);
}

positionMoscow();

function displayCelcTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celcTemp;
}
