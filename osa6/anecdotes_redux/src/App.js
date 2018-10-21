import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
// import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount() {
    this.props.initializeAnecdotes()
  }

  render() {
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


export default connect(
  null,
  { initializeAnecdotes }
)(App)