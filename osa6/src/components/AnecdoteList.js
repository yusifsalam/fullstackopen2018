import React from 'react'
import { voteUp } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .filter((anecdote) => anecdote.content.includes(this.props.store.getState().filter))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() => {
                    this.props.store.dispatch(voteUp(anecdote.id))
                    this.props.store.dispatch(
                      showNotification(`you voted up '${anecdote.content}'`)
                    )
                    setTimeout(() => {
                      this.props.store.dispatch(showNotification(null))
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

export default AnecdoteList
