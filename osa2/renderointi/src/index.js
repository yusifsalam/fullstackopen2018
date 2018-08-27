import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  
  return(
    <div>
      {props.kurssi.osat.map(osa => <Osa osa={osa.nimi} tehtavia = {osa.tehtavia} key={osa.key}/>)}
      
    </div>
  )
}
const Yhteensa = (props) => {
  const [osa1, osa2, osa3] = props.kurssi.osat
  
  return(
    <p>yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää</p>
  )
}

const Kurssi = (props) => {
  return(
    <div>
      <Otsikko kurssi = {props.kurssi} />
      <Sisalto kurssi = {props.kurssi}/>
      {/* <Yhteensa kurssi = {props.kurssi}/> */}
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        key:1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        key: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        key: 3
      },
      {
        nimi : 'Test nimi',
        tehtavia: 28,
        key:4
      }
    ]
  }
  return (
    <div>
      <Kurssi kurssi={kurssi}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)