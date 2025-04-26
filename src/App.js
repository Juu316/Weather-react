import { useEffect, useState } from "react";
import { MapPin, Globe } from "lucide-react";
function App() {
  const key = process.env.REACT_APP_API_KEY;
  const [date, setDate] = useState("");
  const [searchValueOfCity, setSearchValueOfCity] = useState("");
  const [searchValueOfCountry, setSearchValueOfCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulaanbaatar");
  const [selectedCountry, setSelectedCountry] = useState("Mongolia");
  const [weatherCurrent, setWeatherCurrent] = useState("");
  const [weatherMax, setWeatherMax] = useState("");
  const [weatherMin, setWeatherMin] = useState("");
  const [weatherCurrentConditionImgSrc, setWeatherCurrentConditionImgSrc] =
    useState("");
  const [weatherCurrentConditionText, setWeatherCurrentConditionText] =
    useState("");
  const handleChange = (event) => {
    setSearchValueOfCountry(event.target.value);
  };
  const handleCityChange = (event) => {
    setSearchValueOfCity(event.target.value);
  };
  const fetchWeather = () => {
    try {
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectedCity}&days=1&aqi=no&alerts=no`
      )
        .then((response) => response.json())
        .then((result) => {
          setDate(result.forecast?.forecastday?.[0]?.date || "");
          setWeatherCurrentConditionImgSrc(
            result.current?.condition?.icon || ""
          );
          setWeatherCurrent(result.current?.temp_c ?? "");
          setWeatherCurrentConditionText(result.current?.condition?.text || "");
          setWeatherMax(
            result.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? ""
          );
          setWeatherMin(
            result.forecast?.forecastday?.[0]?.day?.mintemp_c ?? ""
          );
          console.log("Weather:", result);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = () => {
    try {
      fetch("https://countriesnow.space/api/v0.1/countries")
        .then((response) => response.json())
        .then((result) => {
          setCountries(result.data);
          console.log("Countries:", result.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Search value of country:", searchValueOfCountry);
    // console.log("Cities:", cities);
  }, [searchValueOfCountry]);
  useEffect(() => {
    fetchWeather();
    console.log("Fetch Weather data worked");
  }, [selectedCity]);
  useEffect(() => {
    fetchData();
    console.log("Fetch data worked");
  }, []);
  // const filteredCities = cities.filter((e) =>
  //   e.toLowerCase().startsWith(searchValueOfCity.toLowerCase())
  // );
  const filteredCountries = countries.filter((e) =>
    e.country.toLowerCase().startsWith(searchValueOfCountry.toLowerCase())
  );
  const filteredCities = cities.filter((e) =>
    e.toLowerCase().startsWith(searchValueOfCity.toLowerCase())
  );
  return (
    <div className="box-border">
      <div className="flex ">
        <div className="pt-7 h-screen w-2/3 bg-gray-100  border-black flex justify-around">
          <div className="flex flex-col items-center rounded-full  text-[1.5rem] ">
            <div className="relative max-w-sm">
              <div className="absolute  pl-3 pt-3">
                <Globe size={30} className="text-gray-400 " />
              </div>
              <input
                value={searchValueOfCountry}
                onChange={handleChange}
                placeholder="Search countries..."
                className="mb-2 block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className=" h-[13rem] overflow-y-scroll max-w-sm min-w-full w-[100px]">
              <div className="flex flex-col bg-gray-200 rounded-lg">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((value, index) => (
                    <button
                      onClick={() => {
                        setSelectedCountry(`${value.country}`);
                        setCities(value.cities);
                        console.log("cities from setcities;", cities);
                      }}
                      className=" mt-1 text-left rounded-lg border hover:bg-blue-200"
                      key={index}>
                      {value.country}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No countries found</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-[1.5rem]">
            <div className="relative max-w-sm rounded-full  ">
              <div className="absolute  pl-3 pt-3">
                <MapPin size={30} className="text-gray-400 " />
              </div>
              <input
                value={searchValueOfCity}
                onChange={handleCityChange}
                placeholder="Search cities..."
                className="mb-2 block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className=" h-[13rem] overflow-y-scroll max-w-sm min-w-full w-[100px]">
              <div className="flex flex-col bg-gray-200 rounded-lg">
                {filteredCities.length > 0 ? (
                  filteredCities.map((value, index) => (
                    <button
                      onClick={() => {
                        setSelectedCity(`${value}`);
                      }}
                      className=" mt-1 text-left rounded-lg border hover:bg-blue-200"
                      key={index}>
                      {value}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No cities found</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-7 h-screen w-1/3 bg-custom-color text-white">
          <div>Selected Country: {selectedCountry || ""}</div>
          <div>Selected City: {selectedCity || ""}</div>
          <img alt="Icon" src={weatherCurrentConditionImgSrc || ""}></img>
          <div>Date: {date || ""}</div>
          <div>Current condition: {weatherCurrentConditionText || ""}</div>
          <div>Current Temperature:{weatherCurrent ?? ""}°C</div>
          <div>Today's Max Temperature:{weatherMax ?? ""}°C</div>
          <div>Today's Min Temperature:{weatherMin ?? ""}°C</div>
        </div>
      </div>
    </div>
  );
}

export default App;
