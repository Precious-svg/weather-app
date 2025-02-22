//  for the forecast  html page

const sideBarButton = document.getElementById('sidebar-btn')
 sideBarButton.addEventListener('click', (showNav) => {
    const linkNav = document.getElementById('link-nav')
    if(linkNav.style.width === '0%'){
        return linkNav.style.width = '25%'
    }
    else{
        return linkNav.style.width ='0%'
    }
 })

const fullUrl = "https://api.openweathermap.org/data/2.5/weather?q=Dudley&appid=5cfb3cbe3d5b8932b333a40ddf1c8e08&units=metric";

async function getForecastPageWeather() {
    try{
        console.log("fetching from URL:", fullUrl)
        const forecastPageWeatherResponse = await fetch( fullUrl);
        const forecastPageWeatherData = await forecastPageWeatherResponse.json()
        console.log("API response:", forecastPageWeatherData);
        
        displayCurrentWeatherOnForecastPage(forecastPageWeatherData)
    }catch (error){
        console.error('Error fetching data:', error);
        alert('failed to fetch weather data.');
    }
}
  getForecastPageWeather();
 

function displayCurrentWeatherOnForecastPage(data){
    if(window.location.pathname === '/nextFiveDaysForecast.html'){
        const actualTemp = document.getElementById('actual-temp');
        const currentCity =  document.getElementById('current-city')
        currentCity.textContent = data.name;
        actualTemp.textContent = `${data.main.temp} ${data.weather[0]["main"]}`
       
    }
   
}


async function displaySearchedCityCurrentWeatherOnForecastPage(data){
    const citySearch = document.getElementById('search-city').value;
    const apiKey = '5cfb3cbe3d5b8932b333a40ddf1c8e08';
    const fullUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;

    try{ 
        console.log('fetching fullUrl:', fullUrl)
        const weatherResponse = await fetch(fullUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        displayCurrentWeatherOnForecastPage(weatherData);

    } catch(error){
        console.error('Error fetching data:', error);
        alert('failed to fetch weather data')
    }
}

document.getElementById('weather-search-btn').addEventListener('click', displaySearchedCityCurrentWeatherOnForecastPage)
