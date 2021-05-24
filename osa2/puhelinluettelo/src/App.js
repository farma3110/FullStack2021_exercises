import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'
import FilterForm from './components/Filter.js'
import AddForm from './components/AddForm.js'
import Message from './components/Message.js'
import personService from './services/contacts.js'

const App = () => {
  
  const [ persons, setPersons] = useState([
    
  ])
  const [personsToShow, setPersonsToShow] = useState(persons) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ status, setStatus ] = useState('')
 
  const getPersons = () => {
    return (
      personService.getPersons()
        .then(persons => {
          setPersons(persons)
          setPersonsToShow(persons)
          return persons
        })
    )
  }

  useEffect(getPersons, [])

  const notify = (message) => {
    setNotification(message)
    var x = setInterval(clearMessage, 4000)
    function clearMessage() {
      if(notification === null) {
        clearInterval(x)
      }
      setNotification(null)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if(event.target.value === '') {
      setPersonsToShow(persons.filter(person => true))
    } else {
      setPersonsToShow(persons.filter(person => person.name.includes(event.target.value)))
    }
  }

  const addContact = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      window.alert(`Please include name and number`)
    } else {
      getPersons()
        .then(persons => {
          const existingPerson = persons.filter(person => person.name === newName)
          if (existingPerson.length > 0) {
            updateNumber({...existingPerson[0], number: newNumber})
          } else {
            personService.createPerson({name: newName, number: newNumber})
              .then(person => {
                setPersons(persons.concat(person))
                setNewName('')
                setNewNumber('')
                setNewFilter('')
                setPersonsToShow(persons.concat(person))
                setStatus('succeed')
                notify(`Added contact '${person.name}'`)
              })
          }
        })
    }
  }

  const deleteContact = (id) => {
    const person = persons.filter(person => person.id === id)[0]
    const message = `Are you sure you want to delete person ${person.name}?`
    let errors = false
    if(window.confirm(message)) {
      personService.deletePerson(id)
        .catch(error => {
          setStatus('error')
          notify(`An error occurred while deleting contact '${person.name}'. \nIt was probably already deleted from the database.`)  
          errors = true
          getPersons()
        })
        .then(response => {
          if(!errors) {
            getPersons()
              .then(persons => {
                notify(`Deleted contact '${person.name}'`)  
              })
          }
        })
    }
  }

  const updateNumber = (person) => {
    const message = `${person.name} is already added to the phonebook.\nDo you want to replace the existing number with the new one?`
    let errors = false
    if(window.confirm(message)) {
      personService.updateNumber(person)
        .catch(error => {
          setStatus('error')
          notify(`An error occurred while updating contact '${person.name}'`)  
          errors = true
          getPersons()
        })
        .then(response => {
          if(!errors) {
            getPersons()
              .then(persons => {
                notify(`Updated contact '${person.name}'`)  
              })
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message status={status} message={notification} />
      <FilterForm filter={newFilter} handler={handleFilterChange} />
      <h2>Add a new contact</h2>
      <AddForm 
        submit={addContact}
        name={newName} 
        nameHandler={handleNameChange} 
        number={newNumber}
        numberHandler={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deleteFunction={deleteContact}/>
    </div>
  )

}

export default App;
