import React, { useState } from 'react';
import Button from './Button';

const Country = ({ country, singleCountry }) => {
    const [single, setSingle] = useState(false);

    const handleShowCountry = (event) => {
        setSingle(true);
    }

    if (single) {
        return (
            <>
                <h2>{country.name.common}</h2>

                <p>capital {country.capital[0]}</p>
                <p>population {country.population}</p>

                <h3>Spoken languages</h3>
                <ul>
                    {
                        Object.values(country.languages).map((language, index) =>
                            <li key={index}>{language}</li>
                        )
                    }
                </ul>

                <h1>{country.flag}</h1>
            </>
        )
    }
    else {
        return(
            <>
                <div>{country.name.common}<Button onClick={handleShowCountry} text={'show'}/></div>
            </>
        )
    }
}

export default Country;