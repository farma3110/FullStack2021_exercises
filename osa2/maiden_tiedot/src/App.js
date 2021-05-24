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

  const getWeather = (capital) => {
    
    const getCapitalWeather = () => {
      console.log('getting capital')
      const key = process.env.REACT_APP_API_KEY
      console.log(key)
      console.log(capital)
      axios
        .get(`http://api.weatherstack.com/current?access_key=${key}&query=${capital}`)
        .then(response => {
          setWeather([response.data])
      })
    }

    useEffect(getCapitalWeather, [])
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const matching = countries.filter(country => country.name.includes(event.target.value))
    setCountriesToShow(matching)
    if(matching.length !== 1) {
      setWeather([])
    } 
  }

  const showButtonHandler = (name) => {
    console.log(`pressed ${name} show button`)
    setCountriesToShow(countries.filter(country => country.name.includes(name) && country.name.length === name.length))
  }

  return (
    <div>
      <FilterForm filter={newFilter} handler={handleFilterChange} />
      <CountriesList countries={countriesToShow} buttonHandler={showButtonHandler} weather={weather} getCapitalWeather={getWeather}/>
      <Weather weather={weather} />
    </div>
  )

}

export default App;
