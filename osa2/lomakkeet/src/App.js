import React from 'react'
import Person from './components/Person'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService.getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.persons.length + 1
    }
    if (this.state.persons.filter(person => person.name === personObject.name).length > 0) {
      if (window.confirm(`${personObject.name} on jo luettelossa, korvataanko vanha numero uudella?`)){
        const person = this.state.persons.find(n => n.name === this.state.newName)
        const changedPerson = {...person, number:this.state.newNumber}
        personService.update(person.id, changedPerson).then(changedPerson => {
          const persons = this.state.persons.filter(n=> n.name !== personObject.name)
          this.setState({
            persons: persons.concat(changedPerson.data),
            newName: '',
            newNumber: ''
          })
        })
      }
    }
    else {
      personService.create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(personObject),
            newName: '',
            newNumber: ''
          })
        })
    }
  }

  handlePersonName = (event) => {
    this.setState({ newName: event.target.value })
  }
  handlePersonNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleSearch = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleDeletePerson = (id, name) => {
    return () => {
      if (window.confirm(`poistetaanko ${name}`)) {
        personService.deletePerson(id)
          .then(deletedPersons => {
            const persons = this.state.persons.filter(n => n.id !== id)
            this.setState(
              {
                persons: persons,
                newName: '',
                newNumber: ''
              })
          })
      }

    }
  }

  render() {
    return (
      <div>
        {/* debug: name: {this.state.newName} number: {this.state.newNumber} filter: {this.state.filter} */}
        <h2>Puhelinluettelo</h2>
        <Search handleSearch={this.handleSearch} />
        <h2>Lisää uusi</h2>
        <PersonForm personName={this.handlePersonName} newName={this.state.newName}
          personNumber={this.handlePersonNumber} newNumber={this.state.newNumber} addPerson={this.addPerson} />
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter)).map(person => <Person key={person.name} person={person} deletePerson={this.handleDeletePerson(person.id, person.name)} />)}
        </ul>
      </div>
    )
  }
}

export default App