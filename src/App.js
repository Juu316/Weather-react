import { useEffect, useState } from "react";
import search from "./svg/search.svg";
import CitiesFilter from "./Components/CitiesFilter";

const countriesUrl = "https://countriesnow.space/api/v0.1/countries";
const weatherApiKey = "a9777313c9bf4ac0b4a22203251501";

function App() {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weather, setWeather]=useState([]);
  // const [weatherUrl, setWeatherUrl] = useState(
  //   "https://api.weatherapi.com/v1/forecast.json?key=a9777313c9bf4ac0b4a22203251501&q=Ulaanbaatar&days=1&aqi=no&alerts=no"
  // );

  // const fetchWeather = async () => {
  //   try {
  //     const response = await fetch(weatherUrl);
  //     const weatherData = await response.json();
  //     console.log("Weather data: ", weatherData);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };

  const fetchCountry = async () => {
    setLoading(true);
    try {
      const response = await fetch(countriesUrl);
      const result = await response.json();
      const citiesAndCountries = CitiesFilter(result.data);

      setCities(citiesAndCountries);
      //cities is the data, not only cities but also countries
      // setFilteredData(citiesAndCountries);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetch data worked");
    fetchCountry();
  }, []);

  const getWeather = async (weatherApiKey, ) => {
    setWeatherLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=London`,
        { method: "get", headers: { "Content-Type": "application/json" } }
      );
      const result = await result.json();
      setWeather(result);
      setWeatherLoading(false);
    } catch (error) {}
  };
  useEffect(()=>{
    getWeather();
    
    console.log("Fetch weather worked");
    console.log("Weather of ulaanbaatar:",weather)
  },[]);
  
  //   const filterData = () => {
  //     setFilteredData(
  //       cities.filter((city) => {
  //         // console.log("country", city.country);

  //         const result = city.country
  //           .toUpperCase()
  //           .split()
  //           .includes(citiesSearch.toUpperCase());
  //         return city.country;
  //       })
  //     );
  //   };
  //   useEffect(() => {
  //     filterData();
  //   }, [citiesSearch]);
  // console.log("Countries:", filteredData);
  //// const seperateAndGetCountries = () => {
  ////   cities.map((obj) => {
  ////     return obj.country;
  ////   });
  //// };

  // var ulsuud = cities.map(function (cities) {
  //   return cities.country;
  // });

  // var hotuud = cities.map(function (cities) {
  //   return cities.cities;
  // });

  // //  const loweredCities = hotuud.map();
  // //  const loweredCountries = ulsuud.map(name => name.toLowerCase());
  // const stringCities = hotuud.toString();
  // const stringCountries = ulsuud.toString();
  const handleChange = (event) => {
    const inputValue = event.target.value;
    console.log("input value", inputValue);
    setInput(inputValue);
    setFilteredData(
      cities
        .filter((city) => {
          city.split(",").includes(inputValue);
        })
        .slice(0, 5)
    );
    console.log("Cities:", cities.slice(0, 5));
  };

  return (
    <div className="box-border">
      <div className="flex justify-center">
        <div
          id="containerOfSearchBar"
          className="h-16 rounded-3xl w-auto flex z-10 absolute top-10">
          <img
            className="block z-10 relative left-16"
            alt="search icon"
            src={search}
          />
          <div>
            <input
              className="rounded-3xl text-4xl"
              onChange={handleChange}
              placeholder="       Search"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="h-screen w-1/2 bg-gray-100  border-black flex justify-center items-center">
          <div className="w-[25.875vw] h-[69.333vh] bg-[rgba(255,255,255,0.75)] rounded-[3rem] shrink-0 backdrop-blur-md">
            {
              <ul>
                {filteredData.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            }
          </div>
        </div>
        <div className="h-screen w-1/2 bg-[#0F141E] flex justify-center items-center">
          <div className="w-[25.875vw] h-[69.333vh] bg-[rgba(17,24,39,0.75)] rounded-[3rem] shrink-0 backdrop-blur-md"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

// 1) Fetch==> server backend huselt data response "async await"           Promises
// 2) useEffect ==> Dependancy eees hamaaraad function ajilluuldag react iin hook 'useEffect(()=>{},[])' []-Dependancy,

// import React from 'react';
// import WeatherComponent from './Components/WeatherComponent';

// function App() {
//     return (
//         <div className="App">
//             <h1>Weather Application</h1>
//             <WeatherComponent />
//         </div>
//     );
// }

// export default App;
