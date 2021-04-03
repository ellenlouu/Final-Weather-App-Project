function formatDate(date) {
  let years = date.getFullYear();
  let dates = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let weekDays = days[date.getDay()];

  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let months = month[date.getMonth()];
  return `Today is ${weekDays} ${dates} ${months} ${years} ${hour}:${minutes}`;
}

function formatDay(timestamp){
let dateTwo = new Date(timestamp * 1000);
let day = dateTwo.getDay();

let dayForecast = [
    "Sun", "Mon","Tue", "Wed", "Thur", "Fri", "Sat"
]

return dayForecast[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
   
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 5) {
  forecastHTML = forecastHTML + 
    `
        <div class="col-2">
             <ul class="mon">
                 <li>
                  ${formatDay(forecastDay.dt)}
                 </li>
                     <li>
                       <img
                       src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                       alt=""
                       width="42"
                       />
                    </li>
                    <li class = "forecast-weather-temp">
                        ${Math.round(forecastDay.temp.max)}°c
                    </li>
             </ul>               
        </div>
    `;
        }

    });
  
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;                   
}


function getForecast(coordinates){
console.log(coordinates);
let apiKey = "361230dc039099d02f70071a7c0d0798";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


function getWeather(response) {
  console.log(response.data);
  console.log(response);
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidityData").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windData").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
 getForecast(response.data.coord);
    
}

function searchCity(city){
  let apiKey = "361230dc039099d02f70071a7c0d0798";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position){
    console.log(response.data);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "361230dc039099d02f70071a7c0d0798";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
  
}

function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature - 32) / 1.8);
}

let timeDate = document.querySelector("#date");
let currentTime = new Date();
timeDate.innerHTML = formatDate(currentTime);

let button = document.querySelector("#update_btn");
button.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Bristol")
