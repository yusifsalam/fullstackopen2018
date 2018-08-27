import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {

  return (
    <div>
      {props.kurssi.osat.map(osa => <Osa osa={osa.nimi} tehtavia={osa.tehtavia} key={osa.id} />)}

    </div>
  )
}
const Yhteensa = (props) => {
  const osat = props.kurssi.osat.map(kurssi => kurssi.tehtavia)

  return (
    <p>yhteensä {osat.reduce((a, b) => a + b)} tehtävää</p>
  )
}

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko kurssi={props.kurssi} />
      <Sisalto kurssi={props.kurssi} />
      <Yhteensa kurssi={props.kurssi} />
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi kurssi = {kurssi} key = {kurssi.id}/>)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)