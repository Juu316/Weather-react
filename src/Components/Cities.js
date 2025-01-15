import React from 'react';

const CitiesFilter = (countries) => {
    const citiesAndCountry = XPathResult.data.flatMap((country)=>{
        country.cities.map((city)=>`${city}, ${country.country}`)
    });
  return citiesAndCountry;
  
}

export default CitiesFilter;
