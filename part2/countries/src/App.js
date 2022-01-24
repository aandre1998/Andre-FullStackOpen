import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    });
  }, [])
  console.log(countries);

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <Countries filter={filter} countries={countries}/>
    </div>
  );
}

export default App;