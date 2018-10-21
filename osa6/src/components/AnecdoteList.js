import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => {
                  this.props.voteUp(anecdote.id)
                  this.props.showNotification(
                    `you voted up '${anecdote.content}'`
                  )
                  setTimeout(() => {
                    this.props.showNotification(null)
                  }, 3000)
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  const result = anecdotes
    .filter(anecdote => anecdote.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
  return result
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { showNotification, voteUp }
)(AnecdoteList)
