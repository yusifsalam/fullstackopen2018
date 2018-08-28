import React, { Component } from 'react';
import axios from 'axios'
import Country from './components/Country'
import CountryFull from './components/CountryFull'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      countries: [],
      searchTerm: ''
    }
  }
  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all').then(response => this.setState({countries: response.data}))
  }

  handleSearch = (event) => {
    this.setState({searchTerm: event.target.value})
  }
  render() {
    const results = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchTerm))
    return (
      <div>
        find countries: <input onChange = {this.handleSearch}/>
        <ul>
          {results.length > 10 ? "too many matches, specify another filter": results.length === 1?
          results.map(country => <CountryFull key = {country.name} country = {country}/>) :
          results.map(country => <Country key = {country.name} country = {country}/>)}
        </ul>
      </div>
    )
  }
}

export default App;
