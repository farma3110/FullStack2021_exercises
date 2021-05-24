import React from 'react'

const Weather = ({weather}) => {
  if(weather.length > 0) {
	return (
	  <div>
	  	<h3>Weather in {weather[0].request.query}</h3>
	  	<p><strong>Temperature:</strong> {weather[0].current.temperature} Celsius</p>
	    <img src={weather[0].current.weather_icons[0]} alt='sääkuva tähän' />
	    <p><strong>Wind:</strong> {weather[0].current.wind_speed} kmph, direction {weather[0].current.wind_dir}</p>
	  </div>
	)
  } else {
    return (
  	  <div>
  	  </div>
  	)
  }
}

export default Weather