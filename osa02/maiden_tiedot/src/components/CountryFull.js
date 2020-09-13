import React from 'react';

const CountryFull = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital} <br></br>
            population: {country.population}</p>
            <img src = {country.flag} alt = "Flag here" height = "150" width = "200"></img>
        </div>
    );
};

export default CountryFull;