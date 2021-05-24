import React from 'react'

const Person = ({ name, number, deleteFunction }) => {
  return(
  	<li>{name} {number} <button onClick={deleteFunction}>Delete</button></li>
  )
}

const Persons = ({persons, deleteFunction}) => {
  return (
  	<div>
  	  <ul>
        {persons.map(person =>
          <Person key={person.name} name={person.name} number={person.number} deleteFunction={() => deleteFunction(person.id)}/>
        )}
      </ul>
  	</div>
  )
}

export default Persons
