import React from 'react'
//import Country from './Country.js'

const Country = ({ name, capital, population, languages, flag }) => {
  const flag_alt = `Flag of ${name}`
  return(
    <div>
      <h2>{name}</h2>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map(language =>
          <li key = {language.name}>{language.name}</li>
        )}
      </ul>
      <img src={flag} alt={flag_alt} style={{width:128}} />
    </div> 
  )
}

const CountriesList = ({countries, buttonHandler, getCapitalWeather }) => {
  if (countries.length === 1) {
    const country = countries[0]
    getCapitalWeather(country.capital)
    return(
      <div>
        <Country 
          name={country.name}
          capital={country.capital}
          languages={country.languages} 
          population={country.population} 
          flag={country.flag}
        />
      </div>
    )
  }
  else if(countries.length < 11) {
    return (
      <div>
        <h2>List</h2>
        <ul>
          {countries.map(country =>
            <li key={country.name}>
              {country.name}
              <button onClick={() => buttonHandler(country.name)}>
                show
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

export default CountriesList
