const input = document.querySelector('.form-control');

const currentDay = document.querySelector('#currentDay');
const currentDate = document.querySelector('#currentDate');
const currentMonth = document.querySelector('#currentMonth');
const cityName = document.querySelector('#cityName');
const temp = document.querySelector('.tempdeg');
const text = document.querySelector("#text");
const humidity = document.querySelector("#humidity");
const wind_kph = document.querySelector("#wind_kph");
const wind_dir = document.querySelector("#wind_dir");



const nextDay = document.querySelector("#nextDay")
const secondTempBig = document.querySelector("#secondTempBig")
const secondTempSmall = document.querySelector("#secondTempSmall")
const secondText = document.querySelector("#secondText")


const comingDay  = document.querySelector("#comingDay")
const thirdTempBig  = document.querySelector("#thirdTempBig")
const thirdTempSmall  = document.querySelector("#thirdTempSmall")
const thirdText  = document.querySelector("#thirdText")

let dateoffetch = [];


input.addEventListener("input",(e) => {
  e.preventDefault()
  fetchWeatherData(input.value);
})

function fetchWeatherData() {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=963d2d3998b64b82ae8115926241805&q=${input.value}&days=7`
  )
    .then((response) => {
      if (!response.ok) {
        console.error('Error fetching weather data: ', response.statusText);
        return;
      }
      return response.json();
    })
    .then((data) => {
      dateoffetch = data;

      console.log(dateoffetch.forecast.forecastday[2])


      let today = new Date(dateoffetch.location.localtime);


      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let dayIndex = today.getDay();
      let dayName = days[dayIndex];


      currentDay.textContent = dayName;
      currentDate.textContent = today.getDate();
      currentMonth.textContent = today.toLocaleString('default', { month: 'long' });
      cityName.textContent = data.location.name;
      temp.textContent = `${data.current.temp_c}`;
      text.textContent = data.current.condition.text;
      humidity.textContent = `${data.current.humidity}%`;
      wind_kph.textContent = `${data.current.wind_kph} kph`;
      wind_dir.textContent = data.current.wind_dir;


      let nextDayselcet = new Date(data.forecast.forecastday[1].date);
      let nextDayIndex = nextDayselcet.getDay()
      let nextDayName = days[nextDayIndex]  
      

      nextDay.textContent = nextDayName
      secondTempBig.textContent = `${data.forecast.forecastday[1].day.avgtemp_c}`
      secondTempSmall.textContent = `${data.forecast.forecastday[1].day.mintemp_c}`
      thirdText.textContent = `${data.forecast.forecastday[1].day.condition.text}`
      

      let comingDayselcet = new Date(dateoffetch.forecast.forecastday[2].date);
      let comingDayIndex = comingDayselcet.getDay()
      let comingDayName = days[comingDayIndex]  

      comingDay.textContent = comingDayName

      thirdTempBig.textContent = `${data.forecast.forecastday[2].day.avgtemp_c}`
      thirdTempSmall.textContent = `${data.forecast.forecastday[2].day.mintemp_c}`
      thirdText.textContent = `${data.forecast.forecastday[2].day.condition.text}`

    })
    .catch((error) => {
      console.error('Error fetching weather data: ', error);
    });
}


const navbarToggler = document.querySelector(".navbar-toggler ");
const resNav = document.querySelector(".navbar-collapse"); 

navbarToggler.addEventListener("click",(e) =>{
  resNav.classList.toggle("show")
})