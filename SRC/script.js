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

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
   
    let forecastHTML = `<div class="row">`;
    let days = ["Thur", "Fri", "Sat", "Mon"];
    days.forEach(function(day){
  forecastHTML = forecastHTML + 
    `
        <div class="col-2">
             <ul class="mon">
                 <li>
                  ${day}
                 </li>
                     <li>
                       <img
                       src="http://openweathermap.org/img/wn/10d@2x.png"
                       alt=""
                       width="42"
                       />
                    </li>
                    <li>
                        18°c
                    </li>
             </ul>               
        </div>
    `;

    });
  
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;                   
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
}

function searchCity(city){
  let apiKey = "361230dc039099d02f70071a7c0d0798";
  let units = "Metric";
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
displayForecast();