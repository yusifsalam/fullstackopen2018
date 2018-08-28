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

  componentDidMount(){
    personService.getAll()
      .then(response => {
        this.setState({persons: response.data})
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
      alert("person already added!")
      this.setState({
        persons: this.state.persons,
        newName: '',
        newNumber: ''
      })
    }
    else {
      personService.create(personObject)
        .then(response => {this.setState({
          persons: this.state.persons.concat(personObject),
          newName: '',
          newNumber: ''
        })})
    }
  }

  handlePersonName = (event) => {
    this.setState({ newName: event.target.value })
  }
  handlePersonNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleSearch = (event) => {
    this.setState({filter: event.target.value})
  }

  render() {
    return (
      <div>
        {/* debug: name: {this.state.newName} number: {this.state.newNumber} filter: {this.state.filter} */}
        <h2>Puhelinluettelo</h2>
        <Search handleSearch = {this.handleSearch}/>
        <h2>Lisää uusi</h2>
        <PersonForm personName = {this.handlePersonName} newName = {this.newName}
        personNumber = {this.handlePersonNumber} newNumber ={this.newNumber} addPerson = {this.addPerson}/>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter)).map(person => <Person key={person.name} person={person}/>)} 
        </ul>
      </div>
    )
  }
}

export default App