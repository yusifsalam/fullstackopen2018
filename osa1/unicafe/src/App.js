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
    const Button = ({ handleClick, text }) => (
      <button onClick={handleClick}>{text}</button>
    )

    const Statistic = ({ text, value, trailingText }) => (
      <p>{text} {value} {trailingText}</p>
    )

    const Statistics = () => {
      return (
        <div>
          <h1>statistiikka</h1>
          <Statistic text = "hyvä" value = {this.state.hyva}/>
          <Statistic text = "neutraali" value = {this.state.neutraali}/>
          <Statistic text = "huono" value = {this.state.huono}/>
          <Statistic text = "keskiarvo" value = {calculateKA().toFixed(1)}/>
          <Statistic text = "positiivisia" value = {(this.state.hyva / (this.state.hyva + this.state.neutraali + this.state.huono)
          * 100).toFixed(1)} trailingText = "%"/>
        </div>
      )
    }

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
        <Button handleClick={addHyva()} text="hyvä" />
        <Button handleClick={addNeutraali()} text="neutraali" />
        <Button handleClick={addHuono()} text="huono" />
        <Statistics />
      </div>
    );
  }
}

export default App;
