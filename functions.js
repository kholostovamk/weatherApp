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

function convToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 77;
}

let cel = document.querySelector("#cel");
let far = document.querySelector("#far");
cel.addEventListener("click", convToCel);
far.addEventListener("click", convToF);

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temperature");
  heading.innerHTML = temp;
}

function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#cityChanger");
  let h1 = document.querySelector("#city");
  h1.innerHTML = input.value;
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
  axios.get(apiURL).then(showTemp);
}

navigator.geolocation.getCurrentPosition(positionNow);

let form = document.querySelector("#cityForm");
form.addEventListener("submit", cityChange);

function changeCurCity() {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = "Your current location :confetti_ball: ";
}
function getCurrentLocation(event) {
  event.preventDefault();
}

let currentLoc = document.querySelector("#currentLocationButton");
currentLoc.addEventListener("click", getCurLocation);
