// const getId = () => (100000 * Math.random()).toFixed(0)

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

export const anecdotesInit = data => {
  return {
    type: 'INIT',
    data
  }
}

export const anecdoteCreation = data => {
  return {
    type: 'CREATE',
    data
  }
}

export const voteUp = id => {
  return {
    type: 'VOTE',
    id
  }
}

export default reducer
