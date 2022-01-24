import React, { useState, useEffect } from 'react';
import axios from 'axios';

import personsService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name:'', number:''});
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({type:'', message:''});

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, [])

  const addPerson = (event) => {
    // Checks if name already exists. If not, add new person, clear input

    event.preventDefault();

    const personObject = { 
      name: newPerson['name'],
      number: newPerson['number']
    };

    if (typeof persons.find(person => person.name.toLowerCase() === newPerson['name'].toLowerCase()) === "undefined") {
      personsService.create({...personObject, id: persons.length + 1}).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({name:'', number:''});

        setNotificationMessage({type: 'success', message: 'Successfully created phonebook entry'});
        setTimeout(() => {
          setNotificationMessage({type:'', message:''});
        }, 5000)
      })
    } else {
      if(window.confirm(`${newPerson['name']} is already added to the phonebook, replace the old number with a new one?`)) {
        const currentId = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())['id'];
        console.log('id is: ', currentId);

        personsService.update(currentId, {...personObject, id: currentId}).then(() => {
          setPersons(persons.filter(person => person.id !== currentId).concat({...personObject, id: currentId}));
          setNewPerson({name:'', number:''});

          setNotificationMessage({type: 'success', message: `Successfully edited phone number for ${personObject['name']}`});
          setTimeout(() => {
            setNotificationMessage({type:'', message:''});
          }, 5000)
        })
      }
    }
  }

  const handleDelete = (id) => {
    const nameOfId = persons.find(person => person.id === id)['name'];

    if (window.confirm(`Delete ${nameOfId}?`)) {
      personsService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))

        setNotificationMessage({type: 'success', message: `Successfully deleted entry`});
        setTimeout(() => {
          setNotificationMessage({type:'', message:''});
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return(
    <div>
      <Notification notificationMessage={notificationMessage}/>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonForm formProps={{newPerson, handleNameChange, handleNumberChange, addPerson}}/>

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;