import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/Filter.js'
import CountriesList from './components/Countries.js'
import Weather from './components/Weather.js'

const App = () => {
  
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState(countries) 
  const [ newFilter, setNewFilter] = useState('')
  const [ weather, setWeather ] = useState([])
 
  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow([])
      })
  }

  useEffect(hook, [])

  
  /*
  Weather is fetched from https://weatherstack.com/, with personal access key.
  Access key is given in REACT_APP_API_KEY environment variable when running the application
  REACT_APP_API_KEY=*Access key here* npm start
  */
  const getWeather = (capital) => {
    const key = process.env.REACT_APP_API_KEY
    const address = `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
    axios
      .get(address)
      .then(response => {
        setWeather([response.data])
    })
  }
    
  

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const matching = countries.filter(country => country.name.includes(event.target.value))
    if(matching.length !== countriesToShow.length) {
      setCountriesToShow(matching)
      if(matching.length !== 1) {
        setWeather([])
      } else {
        getWeather(matching[0].capital)
      }
    }
  }

  const showButtonHandler = (name) => {
    const matching = countries.filter(country => country.name.includes(name) && country.name.length === name.length)
    setCountriesToShow(matching)
    setNewFilter('')
    getWeather(matching[0].capital)
  }

  return (
    <div>
      <FilterForm filter={newFilter} handler={handleFilterChange} />
      <CountriesList countries={countriesToShow} buttonHandler={showButtonHandler} weather={weather} />
      <Weather weather={weather} />
    </div>
  )

}

export default App;
