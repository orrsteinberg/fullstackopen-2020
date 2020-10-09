import React from "react";

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h3>Languages:</h3>
    <ul>
      {country.languages.map((lang, i) => (
        <li key={i}>{lang.name}</li>
      ))}
    </ul>
    <img src={country.flag} width="200" alt={`${country.name} flag`} />
  </div>
);

export default CountryInfo;
