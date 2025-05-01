import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
function App() {
  const key = process.env.REACT_APP_API_KEY; //api.weather.com API KEY
  const [date, setDate] = useState("");
  const [searchValueOfCity, setSearchValueOfCity] = useState("");
  const [searchValueOfCountry, setSearchValueOfCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([
    "Altai",
    "Arvayheer",
    "Baruun-Urt",
    "Bayangol",
    "Bayanhongor",
    "Cecerleg",
    "Chihertey",
    "Choyr",
    "Dalandzadgad",
    "Darhan",
    "Han-Uul",
    "Javhlant",
    "Khovd",
    "Mandalgovi",
    "Ovoot",
    "Saynshand",
    "Toyrim",
    "Ulaan-Uul",
    "Ulan Bator",
    "Uliastay",
    "Undurkhaan",
  ]);
  const [isCountryInputFocused, setIsCountryInputFocused] = useState(false);
  const [isCityInputFocused, setIsCityInputFocused] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Ulan Bator");
  const [selectedCountry, setSelectedCountry] = useState("Mongolia");
  // Husvel odoonii Temperaturiig avch bolno :)
  // const [weatherCurrent, setWeatherCurrent] = useState("");
  const [weatherMax, setWeatherMax] = useState("");
  const [weatherMin, setWeatherMin] = useState("");
  const [weatherCurrentConditionImgSrc, setWeatherCurrentConditionImgSrc] =
    useState("");
  // const [weatherCurrentConditionText, setWeatherCurrentConditionText] =
  //   useState("");
  const [weatherMorningCondition, setWeatherMorningCondition] = useState("");
  const [weatherEveningCondition, setWeatherEveningCondition] = useState("");
  const handleChange = (event) => {
    setSearchValueOfCountry(event.target.value);
  };
  const handleCityChange = (event) => {
    setSearchValueOfCity(event.target.value);
  };
  const fetchWeather = () => {
    try {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${selectedCity}&days=1&aqi=no&alerts=no`
      )
        .then((response) => response.json())
        .then((result) => {
          setDate(result.forecast?.forecastday?.[0]?.date || "");
          setWeatherCurrentConditionImgSrc(
            result.current?.condition?.icon || ""
          );
          // setWeatherCurrent(result.current?.temp_c ?? "");
          // setWeatherCurrentConditionText(result.current?.condition?.text || "");
          setWeatherMax(
            result.forecast?.forecastday?.[0]?.day?.maxtemp_c ?? ""
          );
          setWeatherMin(
            result.forecast?.forecastday?.[0]?.day?.mintemp_c ?? ""
          );
          setWeatherEveningCondition(
            result.forecast?.forecastday?.[0]?.hour?.[21]?.condition?.text
          );
          setWeatherMorningCondition(
            result.forecast?.forecastday?.[0]?.hour?.[8]?.condition?.text
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
          console.log("Countries:", result.data); // ene dotor cities ch baigaa
        })
        .catch((error) => {
          console.log("error", error); // Eniig arilgahaar errordood bgaan??
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
    console.log("Fetch Weather data worked");
  }, [selectedCity]);
  useEffect(() => {
    fetchData();
    console.log("Fetch data worked");
  }, []);
  //Jijgeer bichsen ch garj irdeg bolgoson
  const filteredCountries = countries.filter((e) =>
    e.country.toLowerCase().startsWith(searchValueOfCountry.toLowerCase())
  );
  const filteredCities = cities.filter((e) =>
    e.toLowerCase().startsWith(searchValueOfCity.toLowerCase())
  );
  //Favicon changer here
  useEffect(() => {
    if (!weatherCurrentConditionImgSrc) return;
    const favicon = document.querySelector("link[rel~='icon']");
    if (favicon) {
      favicon.href = weatherCurrentConditionImgSrc;
    } else {
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = weatherCurrentConditionImgSrc;
      document.head.appendChild(link);
    }
  }, [weatherCurrentConditionImgSrc]);
  return (
    // <div className="box-border">
    //   <div className="flex ">
    //     <div className="pl-6 pr-6 text-[1.5rem] pt-7 h-screen min-w-[25rem] w-[25rem] bg-blue-400  ">
    //       <div className=" relative max-w-sm ">
    //         <div>
    //           Selected Country:{" "}
    //           <span className="font-medium">{selectedCountry || ""}</span>{" "}
    //         </div>
    //         <div className="absolute  pl-3 pt-3">
    //           <Search size={30} className="text-gray-400 " />
    //         </div>
    //         <input
    //           value={searchValueOfCountry}
    //           onChange={handleChange}
    //           onFocus={() => {
    //             setIsCountryInputFocused(true);
    //           }}
    //           // onBlur={() => setIsCountryInputFocused(false)}
    //           placeholder="Search countries..."
    //           className=" mb-2 block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {isCountryInputFocused && (
    //         <div className=" h-[11rem] overflow-auto ">
    //           <div className="flex flex-col gap-1 bg-gray-200 rounded-lg">
    //             {filteredCountries.length > 0 ? (
    //               filteredCountries.map((value, index) => (
    //                 <button
    //                   onClick={() => {
    //                     setSelectedCountry(`${value.country}`);
    //                     setCities(value.cities);
    //                     setIsCountryInputFocused(false);
    //                     console.log("cities from setcities;", cities);
    //                   }}
    //                   className=" text-left rounded-lg border hover:bg-blue-200"
    //                   key={index}>
    //                   {value.country}
    //                 </button>
    //               ))
    //             ) : (
    //               <div className="p-3 text-gray-500">No countries found</div>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //       <div className="relative max-w-sm rounded-full mt-10 ">
    //         <div>
    //           Selected City:
    //           <span className="font-medium">{selectedCity || ""}</span>
    //         </div>
    //         <div className="absolute  pl-3 pt-3">
    //           <Search size={30} className="text-gray-400 " />
    //         </div>
    //         <input
    //           value={searchValueOfCity}
    //           onChange={handleCityChange}
    //           onFocus={() => setIsCityInputFocused(true)}
    //           // onBlur={() => setIsCityInputFocused(false)}
    //           placeholder="Search cities..."
    //           className="mb-2 block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {isCityInputFocused && (
    //         <div className=" h-[11rem] overflow-y-auto max-w-sm min-w-full w-[100px]">
    //           <div className="flex flex-col gap-1 bg-gray-200 rounded-lg">
    //             {filteredCities.length > 0 ? (
    //               filteredCities.map((value, index) => (
    //                 <button
    //                   onClick={() => {
    //                     setSelectedCity(`${value}`);
    //                     setIsCityInputFocused(false);
    //                   }}
    //                   className=" text-left rounded-lg border hover:bg-blue-200"
    //                   key={index}>
    //                   {value}
    //                 </button>
    //               ))
    //             ) : (
    //               <div className="p-3 text-gray-500">No cities found</div>
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //     <div className="h-screen w-full flex">
    //       <div className="w-1/2 h-screen bg-[#f3f4f6] flex justify-center items-center">
    //         <div className="w-[25rem]  rounded-[3rem] bg-white pt-4 pl-8">
    //           <div className="text-blue-400 text-lg  flex justify-between">
    //             {date || ""} Morning
    //           </div>
    //           <div className="text-[2.5rem] font-extrabold text-[#111827] ">
    //             {selectedCity}
    //           </div>
    //           <div className="flex justify-center">
    //             {" "}
    //             <img
    //               alt="Sun"
    //               src="sun-min.png"
    //               className="w-[15rem] h-[15rem] "></img>
    //           </div>

    //           <div className="pl-6 text-[110px] font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[#111827] to-[#6b7280]">
    //             {weatherMax ?? ""}°C
    //           </div>
    //           <div className="text-[#FF8E27] text-[1.5rem] font-bold pl-8 pb-4">
    //             {weatherMorningCondition}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-1/2 h-screen bg-[#0f141e] flex justify-center items-center">
    //         <div className="w-[25rem]  rounded-[3rem] bg-gradient-to-b from-[#3a4f7b] to-[#111827BF] pt-4 pl-8">
    //           <div className="text-[#9CA3AF] text-lg ">
    //             {date || ""} Evening
    //           </div>
    //           <div className="text-[2.5rem] font-extrabold text-white ">
    //             {selectedCity}
    //           </div>
    //           <div className="flex justify-center">
    //             {" "}
    //             <img
    //               alt="Moon"
    //               src="moon-min.png"
    //               className="w-[15rem] h-[15rem] "></img>
    //           </div>

    //           <div className="pl-6 text-[110px] font-bold tracking-tighter bg-gradient-to-b from-[#f9fafb] to-[#f9fafb00] bg-clip-text text-transparent">
    //             {weatherMin ?? ""}°C
    //           </div>
    //           <div className="text-[#777CCE] text-[1.5rem] font-bold pl-8 pb-4">
    //             {weatherEveningCondition}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <div className="box-border flex ">
        <div className="w-1/2 h-screen bg-[#f3f4f6] relative">
          <div className=" max-w-sm absolute top-0 left-1/2 transform -translate-x-1/2 ">
            <div>
              Selected Country:{" "}
              <span className="font-medium">{selectedCountry || ""}</span>{" "}
            </div>
            <div className="absolute pl-3 pt-1 ">
              <Search size={30} className="text-gray-400 " />
            </div>
            <input
              value={searchValueOfCountry}
              onChange={handleChange}
              onFocus={() => {
                setIsCountryInputFocused(true);
              }}
              // onBlur={() => setIsCountryInputFocused(false)}
              placeholder="Search countries..."
              className=" mb-2 block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {isCountryInputFocused && (
            <div className=" h-[8rem] overflow-auto absolute top-20 left-1/2 transform -translate-x-1/2  ">
              <div className="flex flex-col backdrop-blur-[64px] bg-white opacity-80 rounded-lg">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((value, index) => (
                    <button
                      onClick={() => {
                        setSelectedCountry(`${value.country}`);
                        setCities(value.cities);
                        setIsCountryInputFocused(false);
                        console.log("cities from setcities;", cities);
                      }}
                      className="flex text-left pl-6 gap-4 text-3xl font-bold text-black rounded-lg hover:bg-blue-200 "
                      key={index}>
                      <MapPin size={40} color="gray" />
                      {value.country}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No countries found</div>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-center items-center mt-20">
            <div className="w-[25rem]  rounded-[3rem] bg-white pt-4 pl-8">
              <div className="text-blue-400 text-lg  flex justify-between">
                {date || ""} Morning
              </div>
              <div className="text-[2.5rem] font-extrabold text-[#111827] ">
                {selectedCity}
              </div>
              <div className="flex justify-center">
                {" "}
                <img
                  alt="Sun"
                  src="sun-min.png"
                  className="w-[15rem] h-[15rem] "></img>
              </div>

              <div className="pl-6 text-[110px] font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-[#111827] to-[#6b7280]">
                {weatherMax ?? ""}°C
              </div>
              <div className="text-[#FF8E27] text-[1.5rem] font-bold pl-8 pb-4">
                {weatherMorningCondition}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-screen bg-[#0f141e] relative ">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 max-w-sm rounded-full z-10 ">
            <div className="text-white">
              Selected City:{" "}
              <span className="font-medium">{selectedCity || ""}</span>
            </div>
            <div className="absolute  pl-3 pt-1">
              <Search size={30} className="text-gray-400 " />
            </div>
            <input
              value={searchValueOfCity}
              onChange={handleCityChange}
              onFocus={() => setIsCityInputFocused(true)}
              // onBlur={() => setIsCityInputFocused(false)}
              placeholder="Search cities..."
              className="mb-2 block w-full pl-12 pr-3 py-2 border border-slate-950 rounded-full bg-blue-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {isCityInputFocused && (
            <div className=" h-[8rem] overflow-auto absolute top-20 left-1/2 transform -translate-x-1/2  ">
              <div className="flex flex-col backdrop-blur-[64px] bg-slate-800 opacity-80 rounded-lg">
                {filteredCities.length > 0 ? (
                  filteredCities.map((value, index) => (
                    <button
                      onClick={() => {
                        setSelectedCity(`${value}`);
                        setIsCityInputFocused(false);
                      }}
                      className="flex text-left pl-5 gap-3 text-3xl font-bold text-white rounded-lg hover:bg-blue-200 "
                      key={index}>
                      <MapPin size={40} color="gray" />
                      {value}
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No cities found</div>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-center items-center mt-20">
            <div className="w-[25rem]  rounded-[3rem] bg-gradient-to-b from-[#3a4f7b] to-[#111827BF] pt-4 pl-8">
              <div className="text-[#9CA3AF] text-lg ">
                {date || ""} Evening
              </div>
              <div className="text-[2.5rem] font-extrabold text-white ">
                {selectedCity}
              </div>
              <div className="flex justify-center">
                {" "}
                <img
                  alt="Moon"
                  src="moon-min.png"
                  className="w-[15rem] h-[15rem] "></img>
              </div>

              <div className="pl-6 text-[110px] font-bold tracking-tighter bg-gradient-to-b from-[#f9fafb] to-[#f9fafb00] bg-clip-text text-transparent">
                {weatherMin ?? ""}°C
              </div>
              <div className="text-[#777CCE] text-[1.5rem] font-bold pl-8 pb-4">
                {weatherEveningCondition}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
