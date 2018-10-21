import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'


class App extends React.Component {

  render() {
    // const anecdotes = this.context.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <Filter  />
        <AnecdoteList  />
        <AnecdoteForm/>
      </div>
    )
  }
}


export default App