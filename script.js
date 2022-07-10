const heading1 = document.querySelector('h1');
const heading4 = document.querySelector('h4');

function init() {
  getLocation();
}

function getLocation() {
  let options = {
    enableHighAccuracy: true,
    timeout: 1000 * 10, // 10 seconds
    maximumAge: 1000 * 60 * 5 // 5 minutes
  };
  navigator.geolocation.getCurrentPosition(success, failure, options);
}

function success(position) {
  const lat = position.coords.latitude.toFixed(2);
  const lon = position.coords.longitude.toFixed(2);
  getData(lat, lon);
}

function failure(err) {
  console.error(err);
}

async function getData(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b79796dec5e64eab2d6444105641fe3`);
  const data = await response.json();
  displayData(data);
}

function displayData(data) {
  console.log(data);
  heading1.textContent = `It is ${kToF(data.main.temp)} degrees.`;
  heading4.textContent = `It will reach ${kToF(data.main.temp_max)} and go as low as ${kToF(data.main.temp_min)} today.`;
}

function kToF(kelvin) {
  const temperature = (((kelvin - 273.15) * 9) / 5) + 32;
  return temperature.toFixed(0);
}

init();