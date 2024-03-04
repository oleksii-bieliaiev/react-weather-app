import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/clouds.png';
import mist_icon from '../Assets/mist.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import ErrorMessage from '../Error/ErrorMessage';



const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [temprature, setTemprature] = useState(null);
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [showWeather, setShowWeather] = useState(false);
  const [error, setError] = useState('');

  
  const password = process.env.REACT_APP_API_KEY;


  useEffect(() => {
    setShowWeather(true)
  }, [weatherData]);
  

  async function search() {
    const element = document.getElementsByClassName('cityInput');
     
    if (element[0].value === '') {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${password}`;

    try {
      let response = await fetch(url);
      let data = await response.json();


      if (data.cod === 200) {
        setError('');
        setWeatherData(data);
        setHumidity(data.main.humidity);
        setWind(Math.floor(data.wind.speed));
        setTemprature(Math.floor(data.main.temp));
        setLocation(data.name);

        switch (data.weather[0].main) {
          case 'Clouds':
            setWeatherIcon(cloud_icon);
            break;
          case 'Clear':
            setWeatherIcon(clear_icon);
            break;
          case 'Rain':
            setWeatherIcon(rain_icon);
            break;
          case 'Drizzle':
            setWeatherIcon(drizzle_icon);
            break;
          case 'Mist':
            setWeatherIcon(mist_icon);
            break;
          case 'Snow':
            setWeatherIcon(snow_icon);
            break;
          default:
            setWeatherIcon(cloud_icon);
        }
      } else {
        setError('Invalid city or no data available');
        setWeatherData(null);
      }
    } catch (error) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  }

  return (
    <div className={`container ${weatherData ? 'down' : ''}`} >
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Please enter a city' />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" className="" />
        </div>
      </div>

      {weatherData ? (
        <div className={`${showWeather ? 'fadeIn' : ''}`}>
          <div className="weather-image">
            <img src={weatherIcon} alt="weatherIcon" />
          </div>
          <div className="weather-temp">{temprature}&deg;c</div>
          <div className="weather-location">{location}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="humidity_icon" className="icon" />
              <div className="data">
                <div className="humidity-persent">{humidity} %</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="wind_icon" className="icon" />
              <div className="data">
                <div className="wind-rate">{wind} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      ) : <ErrorMessage message={error}/>}
    </div>
  )
}

export default WeatherApp
