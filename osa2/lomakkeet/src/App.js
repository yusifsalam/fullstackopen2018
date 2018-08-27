import React from 'react'
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          id: 1
        }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      date: new Date().toISOString,
      id: this.state.persons.length + 1
    }
    const persons = this.state.persons.concat(personObject)
    this.setState({
      persons,
      newName: ''
    })
  }

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        debug: {this.state.newName}
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            nimi: <input onChange={this.handlePersonChange} />
          </div>
          <div>
            <button type="submit" onClick={this.addPerson}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.id} person={person} />)}
        </ul>
      </div>
    )
  }
}

export default App