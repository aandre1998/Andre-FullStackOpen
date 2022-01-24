import React from 'react';
import DeleteButton from './DeleteButton';

const Persons = ({ filter, persons, handleDelete}) => {
    
    //Styles for Persons component
    const noteStyle = {
        color: 'grey',
        paddingTop: '10px',
        fontSize: '15px'
    }
    
    //Create a new array that filters persons based on filter prop
    const filteredPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    })

    //If no filter is applied, map from persons prop
    if (filter === '') {
        return(
            <ul>
                {persons.map(person =>
                    <li style={noteStyle} key={person.id}>{person.name} {person.number}
                        <DeleteButton id={person.id} handleDelete={handleDelete}/></li>
                )}
            </ul>
        )
    }
    //If filter is applied, map from filteredPersons array
    else {
        return(
            <ul>
                {filteredPersons.map(person =>
                    <li style={noteStyle} key={person.id}>{person.name} {person.number}
                        <DeleteButton id={person.id} handleDelete={handleDelete}/></li>
                )}
            </ul>
        )
    }
}

export default Persons;