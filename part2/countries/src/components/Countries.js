import React from 'react';

import Country from './Country';

const Countries = ({ filter, countries }) => {
    let id = 0;
    
    let filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase());
    })

    if (filteredCountries.length === 1) {
        return (
            <>
                <Country key={1} country={filteredCountries[0]} singleCountry={true}/>
            </>
        )
    }
    else if (filter === '' || filteredCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else {
        return (
            <>
                {filteredCountries.map(country => {
                    id += 1;
                    return(
                        <Country key={id} country={country} singleCountry={false}/>
                    )
                })}
            </>
        )
    }
}

export default Countries;