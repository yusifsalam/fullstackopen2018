import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
      <li className = "person">{person.name} {person.number} <button onClick={deletePerson}>Poista</button></li>
    )
  }
  
  export default Person