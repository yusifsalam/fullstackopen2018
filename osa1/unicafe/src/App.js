import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }
  render() {
    const addHyva = () => () => {
      this.setState({ hyva: this.state.hyva + 1 })
    }
    const addNeutraali = () => () => {
      this.setState({ neutraali: this.state.neutraali + 1 })
    }
    const addHuono = () => () => {
      this.setState({ huono: this.state.huono + 1 })
    }

    const calculateKA = () => {
      let summa = this.state.hyva - this.state.huono
      let count = this.state.hyva + this.state.neutraali + this.state.huono
      let ka = summa / count
      return ka
    }


    return (
      <div>
        <h1>anna palautetta</h1>
        <button onClick={addHyva()}>hyvä</button>
        <button onClick={addNeutraali()}>neutraali</button>
        <button onClick={addHuono()}>huono </button>
        <h1>statistiikka</h1>
        <p>hyvä {this.state.hyva}</p>
        <p>neutraali {this.state.neutraali}</p>
        <p>huono {this.state.huono}</p>
        <p>keskiarvo {calculateKA().toFixed(1)}</p>
        <p>positiivisia {(this.state.hyva / (this.state.hyva + this.state.neutraali + this.state.huono)
          * 100).toFixed(1)} %</p>
      </div>
    );
  }
}

export default App;
