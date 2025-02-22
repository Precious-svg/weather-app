 const sideBarButton = document.getElementById('sidebar-btn')
 sideBarButton.addEventListener('click', (showNav) => {
    const linkNav = document.getElementById('link-nav')
    if(linkNav.style.width === '0%'){
        return linkNav.style.width = '18%'
    }
    else{
        return linkNav.style.width ='0%'
    }
 })






    
 const fullUrl = "https://api.openweathermap.org/data/2.5/weather?q=Dudley&appid=5cfb3cbe3d5b8932b333a40ddf1c8e08&units=metric";
 
 async function getWeather() {
    try{
        console.log("fetching from URL:", fullUrl)
        const weatherResponse = await fetch( fullUrl);
        const weatherData = await weatherResponse.json()
        console.log("API response:", weatherData);
        displayCurrentWeather(weatherData);
       
    
    } catch (error){
        console.error('Error fetching data:', error);
        alert('failed to fetch weather data.');
    }
  }
  getWeather();


  //   fetch forecast details from api for the main page

async function getForecast(){

    try{

        // const citySearch = document.getElementById('search-city').value;
        const apiKey = '5cfb3cbe3d5b8932b333a40ddf1c8e08';
        const forecastFullUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Dudley&appid=${apiKey}&units=metric`;
    
        console.log('fetching forecast URL:', forecastFullUrl)
        const forecastResponse = await fetch(forecastFullUrl)
        const forecastData = await forecastResponse.json()
        console.log(forecastData);

        displayCurrentForecastData(forecastData.list);
    } catch(error){
        console.error('error fetching hourly forecast data:', error);
        alert('Failed to fetch hourly forecast data');
    }
}
getForecast();

/*display weather details on default weather location which is dudley when the app  is opened*/

  function displayCurrentWeather(data){
    const highTemp = document.getElementById('high-temp');
    const actualTemp = document.getElementById('actual-temp');
    const lowTemp = document.getElementById('low-temp');
    const windSpeed = document.getElementById('wind-speed-per-hour')
    const humidityValue = document.getElementById('humidity-percent');

    
    document.getElementById('current-city').textContent = data.name;
    highTemp.textContent = `H: ${data.main.temp_max}°`;
    lowTemp.textContent = `L: ${data.main.temp_min}°`;
    actualTemp.textContent = `${data.main.temp}° ${data.weather[0]["main"]}`
    windSpeed.textContent = data.wind.speed;
    humidityValue.textContent = `${data.main.humidity}%`
    
  }


//   show forecast detaisl when the web is opened

  function displayCurrentForecastData(forecastList){


    // compare today date with the date in the dorecast data and return only the ones that matches today's date
    console.log(forecastList)
    
    const currentDate = new Date();
    const currentDateStringToShowOnMainPage = currentDate.toLocaleDateString('en-GB');
    // to make the date on the main page be the current date
    document.getElementById('current-date').textContent = currentDateStringToShowOnMainPage;


   //  to only shown current day's weather forecast
    const currentDayForecast =  forecastList.filter((forecast) => {

        const time = new Date (forecast.dt * 1000)
        const forecastDateString = time.toLocaleDateString('en-GB');
        return forecastDateString === currentDateStringToShowOnMainPage;
    })
    console.log(currentDate.getDate() + 1)
    
    currentDayForecast.push(forecastList[currentDayForecast.length]);
    console.log(currentDayForecast, forecastList);
    
    // this to make  more html children since i only created 6 spaces in th e html for the 3 hours weather details
    const forecastContainer = document.getElementById('selected-hour-weather-details')
    forecastContainer.innerHTML = '';

    currentDayForecast.forEach((forecast) => {

        const forecastItem = document.createElement('div');
        forecastItem.className = 'specific-hours';
        const time = new Date (forecast.dt * 1000)
        const timeString = time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

        const temp = forecast.main.temp;
        const description = forecast.weather[0].description;
        const icon  = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

        // to update the 3 hourly html with the forecast details

        // /create more spaces

        forecastItem.innerHTML =`
          <span class="forecasttime">${timeString}</span>
          <img class="weather-icon" src="${icon}" alt="weather icon"/>
          <span class="forecasttemp">${temp}°C: ${description}</span>
        `
        console.log(forecastItem);
        forecastContainer.appendChild(forecastItem);

        
    })
}


// to show the weather details for the city searched for 
// things to still do includes handling error such as when the city doesnt exist or is empty


async function searchedCityWeatherDetails(){
    const citySearch = document.getElementById('search-city').value.trim();
    if(!citySearch){
        alert('Please enter a city a name')
        return;
    }
    const apiKey = '5cfb3cbe3d5b8932b333a40ddf1c8e08';
    const fullUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
    

    try{ 
        console.log('fetching fullUrl:', fullUrl)
        const weatherResponse = await fetch(fullUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        displayCurrentWeather(weatherData);

    } catch(error){
        console.error('Error fetching data:', error);
        alert('failed to fetch weather data')
    }
}

const searchButton = document.getElementById('weather-search-btn')
searchButton.addEventListener('click', searchedCityWeatherDetails);
searchButton.addEventListener('click', function(event){
    if(event.key === "Enter"){
        searchedCityWeatherDetails();
    }
});

// THIS SECTION IS THE JAVASCRIT FOR FORECAST





// to show the forecast details for the city searched for 
// things to still do includes handling error such as when the city doesnt exist or is empty
async function searchedCityWeatherForecast(){
    const citySearch = document.getElementById('search-city').value.trim();
    if(!citySearch){
        alert('Please enter a city a name')
        return;
    }
    const apiKey = '5cfb3cbe3d5b8932b333a40ddf1c8e08';
    const fullUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=${apiKey}&units=metric`;
    
    try{ 
        console.log('fetching fullUrl:', fullUrl)
        const forecastResponse = await fetch(fullUrl);
        const forecastData = await forecastResponse.json();
        console.log(forecastData);
        displayCurrentForecastData(forecastData.list);
    } catch(error){
        console.error('Error fetching data:', error);
        alert('failed to fetch weather data')
    }
}

searchButton.addEventListener('click', searchedCityWeatherForecast);
searchButton.addEventListener('keydown', function(event){
    if(event.key === "Enter"){
        searchedCityWeatherForecast();
    }
});







