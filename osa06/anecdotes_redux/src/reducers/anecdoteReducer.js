import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  case 'CREATE':
    return [...store, action.data]
  case 'INIT':
    return action.data
  default:
    return store
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createNew = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}


export const voteUp = id => {
  return async dispatch => {
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

export default reducer
