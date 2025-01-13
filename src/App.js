import { useEffect, useState } from "react";
import search from "./svg/search.svg";
function App() {
  const [citiesSearch, setCitiesSearch] = useState("");
  const [cities, setCities] = useState();
  const handleChange = (event) => {
    setCitiesSearch(event.target.value);
  };
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = () => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const filterData = () => {
    setFilteredData();
  };
  useEffect(() => {
    fetchData();
    console.log("Fetch data worked");
  }, [citiesSearch]);
  return (
    <div className="box-border">
      <div className="flex ">
        <div className="h-screen w-1/2 bg-gray-100  border-black">
          <div id='containerOfSearchBar' className="h-16 rounded-3xl ml-32 mt-20 w-96 flex">
           <img className ="block" alt="search icon" src={search}/>
           
            <input
            className=""
              onChange={handleChange}
              placeholder=" Search"
            />
          </div>
        </div>
        <div className="h-screen w-1/2 bg-custom-color"></div>
      </div>
    </div>
  );
}

export default App;

// 1) Fetch==> server backend huselt data response "async await"           Promises
// 2) useEffect ==> Dependancy eees hamaaraad function ajilluuldag react iin hook 'useEffect(()=>{},[])' []-Dependancy,
