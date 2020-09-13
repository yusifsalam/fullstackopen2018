import React from 'react'

const PersonForm = (props) => {
    return (
    <form>
          <div>
            nimi: <input onChange={props.personName} value={props.newName} />
          </div>
          <div>
            numero: <input onChange={props.personNumber} value={props.newNumber} />
          </div>
          <div>
            <button type="submit" onClick={props.addPerson}>lisää</button>
          </div>
        </form>
    )
}

export default PersonForm