let now = new Date();
let time = document.querySelector("#time");
let days = ["Sun", "Monday", "Tue", "Wed", "Thu", "Fri", "Sat"];
let hour = now.getHours();
let minutes = now.getMinutes();
function minutesZero(now) {
  return (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
}
time.innerHTML = `${days[now.getDay()]}, ${hour}: ${minutesZero(now)}`;

function convToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 25;
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
}

function positionMoscow(position) {
  let apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=2625d6a8fc1f0d27c67c06204d7105e5";
  console.log(apiURL);
  axios.get(apiURL).then(moscowTemper);
}

let celcTemp = null;

positionMoscow();

function displayFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = (celcTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function displayCelcTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celcTemp;
}

let fahrLink = document.querySelector("#far");
fahrLink.addEventListener("click", displayFahrTemp);

let celcLink = document.querySelector("#cel");
celcLink.addEventListener("click", displayCelcTemp);

displayForecast();

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col day">
              <h5>${day}</h5>
              <div class="data">23°/20°</div>
              <div class="data"><i class="fas fa-cloud-sun-rain"></i></div>
            </div>`;
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  });
}
