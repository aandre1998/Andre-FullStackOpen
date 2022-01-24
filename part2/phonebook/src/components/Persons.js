import React from 'react';
import DeleteButton from './DeleteButton';

const Persons = ({ filter, persons, handleDelete}) => {
    const filteredPersons = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase());
    })

    if (filter === '') {
        return(
            <ul>
                {persons.map(person =>
                    <li className='note' key={person.id}>{person.name} {person.number}
                        <DeleteButton id={person.id} handleDelete={handleDelete}/></li>
                )}
            </ul>
        )
    }
    else {
        return(
            <ul>
                {filteredPersons.map(person =>
                    <li className='note' key={person.id}>{person.name} {person.number}
                        <DeleteButton id={person.id} handleDelete={handleDelete}/></li>
                )}
            </ul>
        )
    }
}

export default Persons;