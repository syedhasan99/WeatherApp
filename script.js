const apiKey = "1f3d06d3d81137b1a9233d878e898ea3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let temp = document.querySelector(".temp");
let cityText = document.querySelector(".city");
let condition = document.querySelector(".condition");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let mainDiv = document.querySelector(".main-data");
let errorDiv = document.querySelector(".error-msg");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let weatherIcon = document.querySelector(".weather-icon");
let displayTime = document.querySelector('.time')

async function checkWeather(city) {
  let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  let data = await response.json();

  if (response.status === 200) {
    mainDiv.style.display = "flex";
    errorDiv.style.display = "none";
    console.log(data);
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    cityText.textContent = data.name + ", " + data.sys.country;
    condition.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;

    // timezone settings
    let timesoneOffset = data.timezone;

    let currentTime = new Date();

    let localTime = new Date(currentTime.getTime() + timesoneOffset * 1000);
    
    const options = {
        weekday: 'long', // Day of the week (e.g., Monday)
        year: 'numeric', // Full year (e.g., 2025)
        month: 'long', // Full month (e.g., January)
        day: 'numeric', // Day of the month (e.g., 13)
    };

    let formattedTime = new Intl.DateTimeFormat('en-US', options).format(localTime);

    displayTime.textContent = formattedTime;    

    // Weather Icon settings
    let iconCode = data.weather[0].icon;
    if (iconCode == "01d") {
      weatherIcon.src = "assets/Sun.png";
    } else if (iconCode == "02d" || iconCode == "03d" || iconCode == "04d") {
      weatherIcon.src = "assets/Clouds.png";
    } else if (iconCode == "09d" || iconCode == "10d") {
      weatherIcon.src = "assets/Rain.png";
    } else if (iconCode == "11d") {
      weatherIcon.src = "assets/Storm.png";
    } else if (iconCode == "13d") {
      weatherIcon.src = "assets/Snow.png";
    } else if (iconCode == "50d") {
      weatherIcon.src = "assets/Wind.png";
    } else if (iconCode == "01n") {
      weatherIcon.src = "assets/Moon.png";
    } else if (iconCode == "02n" || iconCode == "03n" || iconCode == "04n") {
      weatherIcon.src = "assets/CloudsN.png";
    } else if (iconCode == "09n" || iconCode == "10n") {
      weatherIcon.src = "assets/RainN.png";
    } else if (iconCode == "11n") {
      weatherIcon.src = "assets/StormN.png";
    } else if (iconCode == "13n") {
      weatherIcon.src = "assets/SnowN.png";
    } else if (iconCode == "50n") {
      weatherIcon.src = "assets/WindN.png";
    }
  } else {
    mainDiv.style.display = "none";
    errorDiv.style.display = "block";
    errorDiv.textContent = data.message;
    // console.error(`Error fetching weather data: ${data.message}`);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value !== "") {
    checkWeather(searchInput.value);
  }
});
