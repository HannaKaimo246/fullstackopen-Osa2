import { useEffect, useState } from 'react';
import './App.css';
import React from 'react';


const Filter = ({ handleFilter }) => {
  return (
    <input type='text' onChange={handleFilter}></input>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = countries.filter(country => 
      country.name.common.toLowerCase().startsWith(value)
    );
    setFilteredCountries(filtered);
  }

  const renderLanguages = (languages) => {
    return (
      <ul>
        {Object.values(languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className='container'>
      <p>Find countries:</p>
      <Filter handleFilter={handleFilter} />
      <table>
        <tbody>
          {filteredCountries.length > 10 ? (
            <tr>
              <td>Too many matches, specify another filter</td>
            </tr>
          ) : filteredCountries.length === 1 ? (
            <tr>
              <td>
                <h2>{filteredCountries[0].name.common}</h2>
                <p>capital: {filteredCountries[0].capital} <br></br>
                area: {filteredCountries[0].area}</p>
                <b>languages:</b>
                {renderLanguages(filteredCountries[0].languages)}
                <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} width="130" />
              </td>
            </tr>
          ) : (
            filteredCountries.map((country, index) => (
              <tr key={index}>
                <td>{country.name.common}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
