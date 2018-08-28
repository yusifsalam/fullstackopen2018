import React from 'react';

const CountryFull = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img src = {country.flag} alt = "Flag here" height = "250" width = "400"></img>
        </div>
    );
};

export default CountryFull;