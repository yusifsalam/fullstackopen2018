import React, { Component } from 'react';
import axios from 'axios'
import Country from './components/Country'
import CountryFull from './components/CountryFull'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      searchTerm: '',
      showDetailed: true,
      showCountry: ''
    }
  }
  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => this.setState({ countries: response.data }))
  }

  handleSearch = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  countryClicked = (event) => {
    if (this.state.showCountry === event.target.textContent) {
      this.setState({ showDetailed: !this.state.showDetailed, showCountry: '' })
    }
    else {
      this.setState({ showDetailed: true, showCountry: event.target.textContent })
    }
  }

  render() {
    const results = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchTerm))
    return (
      <div>
        find countries: <input onChange={this.handleSearch} />
        <div onClick={this.countryClicked}>
          {results.length > 10 ? "too many matches, specify another filter" : results.length === 1 ?
            results.map(country => <CountryFull key={country.name} country={country} />) :
            results.map(country => <Country onClick={this.countryClicked} key={country.name} country={country} />)}
          {(this.state.showDetailed && results.length > 0 && results.length < 10) ? results.filter(country => country.name === this.state.showCountry).map(country => <CountryFull country={country} key={country.name} />) : ""}
        </div>
      </div>
    )
  }
}

export default App;
