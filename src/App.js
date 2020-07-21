import React, { useState, useEffect } from 'react';
import {MenuItem , Select, FormControl} from '@material-ui/core'
import './App.css';

function App() {
   
  const [countries, setCountries]=useState([]) 
 

useEffect(()=>{
 
const getCountriesData = async () =>{
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then(
               response => response.json()
            )
            .then(data =>{

              const countries =data.map(country =>(
                {
                  name:country.country,
                  value: country.countryInfo.iso2,
                  flag:country.countryInfo.flag

                }))
                setCountries(countries);
            })

}
getCountriesData();
},[])
  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid-19 TRACKER</h1>
      <FormControl className="app__dropdown" >
        <Select
          variant="outlined"
          value="abc">
            {
              countries.map(country => (
              <MenuItem 
              className="app__headerCountryName"
              value={country.value}><h5>{country.name}</h5> 
              <img
               className="app__headerFlag"
               src={country.flag} alt=""/>
               </MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option 2</MenuItem>
            <MenuItem value="worldwide">Option 3</MenuItem>
            <MenuItem value="worldwide">Option 4</MenuItem> */}
          </Select>
      </FormControl>
      </div>
     
    </div>
  );
}

export default App;
