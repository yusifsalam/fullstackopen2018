import React from 'react'

const Kurssi = (props) => {
    return (
      <div>
        <Otsikko kurssi={props.kurssi} />
        <Sisalto kurssi={props.kurssi} />
        <Yhteensa kurssi={props.kurssi} />
      </div>
    )
  }

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

export default Kurssi