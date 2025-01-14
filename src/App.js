import { useEffect, useState } from "react";
import search from "./svg/search.svg";

const countriesUrl = "https://countriesnow.space/api/v0.1/countries";
const weatherUrl = "https://api.weatherapi.com/v1/forecast.json?";

function App() {
  const [cities, setCities] = useState([]);
  const [citiesSearch, setCitiesSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (event) => {
    setCitiesSearch(event.target.value);
  };

  const fetchCities = () => {
    fetch(countriesUrl)
      .then((response) => response.json())
      .then((result) => {
        //  CitiesAndCountries()
        setFilteredData(result.data);
        setCities(result.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
function toLowerCase(value){
 return value.toLowerCase();
}
  const filterData = () => {
    setFilteredData(cities.filter((city) => {
      toLowerCase(city.cities)
    }));
  };

  const seperateAndGetCities = () => {
    cities.map((obj) => {
      return obj.cities;
    });
  };
  useEffect(() => {
    console.log("get cities function worked");
    seperateAndGetCities();
  }, []);
  useEffect(() => {
    console.log("Fetch data worked");
    fetchCities();
  }, []);

  useEffect(() => {
    filterData();
  }, [citiesSearch]);

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
          <input
            className="rounded-3xl text-4xl"
            onChange={handleChange}
            placeholder="          Search"
          />
        </div>
      </div>

      <div className="flex ">
        <div className="h-screen w-1/2 bg-gray-100  border-black">
        <ul>
        {filteredData.map((city) => (
          <li key={city.id}>{city.name}</li>
        ))}
      </ul>
        </div>
        <div className="h-screen w-1/2 bg-custom-color"></div>
      </div>
    </div>
  );
}

export default App;

// 1) Fetch==> server backend huselt data response "async await"           Promises
// 2) useEffect ==> Dependancy eees hamaaraad function ajilluuldag react iin hook 'useEffect(()=>{},[])' []-Dependancy,
