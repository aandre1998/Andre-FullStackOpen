import React, { useState, useEffect } from 'react';

//Services
import personsService from './services/persons';

//Componenets
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';
import Notification from './components/Notification';

const App = () => {
  //Used to hold list of persons in phone book
  const [persons, setPersons] = useState([])

  //Used to temporarily hold new person info for AddPersonForm
  const [newPerson, setNewPerson] = useState({name:'', number:''});

  //Used to hold filter text
  const [filter, setFilter] = useState('');

  //Used to temporarily hold notification messages
  const [notificationMessage, setNotificationMessage] = useState({type:'', message:''});

  //When App is reloaded, get all persons from backend
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, [])

  //Handles adding a new person (and editing if person already exists)
  const addPerson = (event) => {
    event.preventDefault();

    const personObject = { 
      name: newPerson['name'],
      number: newPerson['number']
    };

    //Add new person if not already in array. Display success notification.
    if (typeof persons.find(person => person.name.toLowerCase() === newPerson['name'].toLowerCase()) === "undefined") {
      personsService.create({...personObject, id: persons.length + 1}).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({name:'', number:''});

        setNotificationMessage({type: 'success', message: 'Successfully created phonebook entry'});
        setTimeout(() => {
          setNotificationMessage({type:'', message:''});
        }, 5000)
      })
    } 
    
    //Person already exists. Ask user if they want to edit the phone number. Display success notification.
    else {
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

  //Handles deleting a person. Display success notification.
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

  //Handles AddPersonForm's name text box changes
  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  //Handles AddPersonForm's number text box changes
  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  }

  //Handles Filter's text box changes
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return(
    <div>
      <Notification notificationMessage={notificationMessage}/>
      <h1>Phonebook</h1>

      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <AddPersonForm formProps={{newPerson, handleNameChange, handleNumberChange, addPerson}}/>

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;