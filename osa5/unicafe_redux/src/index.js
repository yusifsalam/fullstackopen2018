import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const calculateKA = () => {
    let summa = store.getState().good - store.getState().bad
    let count = store.getState().good + store.getState().bad + store.getState().ok
    let ka = summa / count
    return ka
}
const positiivisia = () => {
    let pos = (store.getState().good /(store.getState().good + store.getState().bad + store.getState().ok)* 100).toFixed(1)
    return pos
}
const Statistiikka = () => {
  const palautteita = store.getState().good+store.getState().ok+store.getState().bad;

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    );
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä {store.getState().good}</td>
            <td />
          </tr>
          <tr>
            <td>neutraali {store.getState().ok}</td>
            <td />
          </tr>
          <tr>
            <td>huono {store.getState().bad}</td>
            <td />
          </tr>
          <tr>
            <td>keskiarvo {calculateKA().toFixed(1)}</td>
            <td />
          </tr>
          <tr>
            <td>positiivisia {positiivisia()}%</td>
            <td />
          </tr>
        </tbody>
      </table>

      <button onClick={e=>store.dispatch({type:'ZERO'})}>nollaa tilasto</button>
    </div>
  );
};

class App extends React.Component {
  //   klik = nappi => (event) => {store.dispatch({type: event.data})};

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={e => store.dispatch({ type: "GOOD" })}>hyvä</button>
        <button onClick={e=>store.dispatch({type:'OK'})}>neutraali</button>
        <button onClick={e=>store.dispatch({type:'BAD'})}>huono</button>
        <Statistiikka />
      </div>
    );
  }
}

const renderApp= () => {
    ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)
