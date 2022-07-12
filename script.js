const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const button = document.querySelector('button');
const search = document.querySelector('input');
const icon = document.querySelector('.icon');

function init() {
	getCurrentLocation();
}

search.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		getLocation();
	}
});

button.addEventListener('click', getLocation);

function getCurrentLocation() {
	let options = {
		enableHighAccuracy: true,
		timeout: 1000 * 10, // 10 seconds
		maximumAge: 1000 * 60 * 5 // 5 minutes
	};
	navigator.geolocation.getCurrentPosition(success, failure, options);
}

async function getLocation() {
	try {
		if (!search.value) return;
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=1b79796dec5e64eab2d6444105641fe3`);
		const data = await response.json();
		displayData(data);
	} catch (error) {
		console.error(error);
	}
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
	try {
		const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b79796dec5e64eab2d6444105641fe3`);
		const data = await response.json();
		displayData(data);
	} catch (error) {
		console.error(err);
	}
}

function displayData(data) {
	console.log(data);
	city.textContent = `Weather in ${data.name}`;
	temp.textContent = `${kToF(data.main.temp)}°F`;
	description.textContent = data.weather[0].description;
	humidity.textContent = `Humidity: ${data.main.humidity}%`;
	wind.textContent = `Wind Speed: ${data.wind.speed} mph`;
	icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
	document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
}

function kToF(kelvin) {
	const temperature = (((kelvin - 273.15) * 9) / 5) + 32;
	return temperature.toFixed(0);
}

init();