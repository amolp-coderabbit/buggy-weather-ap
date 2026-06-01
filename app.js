// SF Weather App
// BUG: API key is hardcoded and exposed in client-side code
const API_KEY = "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4";
const CITY = "San Francisco";

// BUG: lat/lon are swapped (longitude first, latitude second)
const SF_LAT = -122.4194;
const SF_LON = 37.7749;

var weatherData = {};  // BUG: using var instead of const/let, global state

// Update clock every second
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("clock").innerText = timeStr;
}

setInterval(updateClock, 1000);
updateClock();

// BUG: API URL uses swapped lat/lon from above
async function fetchWeather() {
  document.getElementById("error").innerText = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${SF_LAT}&lon=${SF_LON}&appid=${API_KEY}&units=imperial`;

  // BUG: no try/catch — unhandled promise rejection if network fails
  const response = await fetch(url);
  const data = await response.json();

  // BUG: no check for response.ok — API errors (401, 404) silently fail
  weatherData = data;
  displayWeather(data);
}

function displayWeather(data) {
  // BUG: no null checks — will throw if data.main or data.weather is missing
  const temp = Math.round(data.main.temp);
  const condition = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  document.getElementById("temp").innerText = temp + "°F";
  document.getElementById("condition").innerText = condition;
  // BUG: humidity and wind show raw numbers with no labels
  document.getElementById("humidity").innerText = humidity + "%";
  document.getElementById("wind").innerText = windSpeed + " mph";
}

// BUG: fetchWeather() is never called on page load — page starts blank
fetchWeather();