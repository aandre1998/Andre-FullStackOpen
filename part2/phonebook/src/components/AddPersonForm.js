import React from 'react';

const AddPersonForm = ({ formProps }) => {
    return (
        <form onSubmit={formProps.addPerson}>
        <div>name: <input value={formProps.newPerson['name']} onChange={formProps.handleNameChange}/></div>
        <div>number: <input value={formProps.newPerson['number']} onChange={formProps.handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    )
}

export default AddPersonForm;