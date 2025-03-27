import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import snow_icon from '../assets/snow.png'

const Weather = () => {
       const inputRef = useRef()
      const [weatherData, setWeatherData] = useState(null);
       
      const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        
      }

     const search = async (city)=> {
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unit=metric&appid=${import.meta.env.VITE_API_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if(data.cod !==200){
              throw new Error(data.message)
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              temperature: Math.floor(data.main.temp), // Corrected key
              location: data.name,
              icon: icon
            })

        }catch (error){
          console.error("Error fetching weather data:", error);

        }
     }
    
     useEffect(() => {
        search ("london");

     },[]);
  

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text"  placeholder='search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>

        {weatherData && (
          <>
                  <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}ºc</p> {/* Corrected key */}
        <p className='location'>{weatherData.location}</p>

          <div className="weather-data">

              <div className="col">
                  <img src={humidity_icon} alt="" />
              <div>
              <p>{weatherData.humidity} %</p>
              <span>humidity</span>
              </div>
          </div>
          <div className="col">
              <img src={wind_icon} alt="" />
          
              <div>
                  <p>{weatherData.windSpeed}km/h</p>
                  <span>Wind speed</span>
              </div>
          </div>
        </div>
          </>
        )}

    
    </div>
  );
};

export default Weather