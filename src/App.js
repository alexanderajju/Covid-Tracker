import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, Card, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from './Map';
import Table from './Table'
import { sortData } from "./util";


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
const [countryInfo , setCountryInfo]=useState({});
const [tableData, setTableData]= useState([])


useEffect(()=>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
},[])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange =async(event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

const url =
 countryCode === 'worldwide' 
 ?'https://disease.sh/v3/covid-19/all'
: `https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url)
.then(response => response.json())
.then(data => {
  setCountry(countryCode);


  //All of the data ...
  // from the country response
  setCountryInfo(data);

})
  };


  console.log("Country info >>>>>",countryInfo)

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>Covid-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange} >
            
            <MenuItem
            className="app__headerCountryName"
            value="worldwide"><h5>Worldwide</h5> <img className="app__headerFlag" src="data:image/jpeg;base64,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" alt="" /></MenuItem>
            
            {countries.map((country) => (
              <MenuItem
                className="app__headerCountryName"
                value={country.value}
              >
                <h5>{country.name}</h5>
                <img className="app__headerFlag" src={country.flag} alt="" />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered"  cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>
      <Map/>
      </div>
      <Card className="app__right">
<CardContent>
  <h3>Live Cases by Country</h3>
  <Table  countries={tableData}/>
  <h3>Worldwide new Cases</h3>
</CardContent>
      </Card>
    </div>
  );
}

export default App;
