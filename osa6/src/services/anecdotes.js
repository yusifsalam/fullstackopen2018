import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async content => {
  const res = await axios.post(url, { content, votes: 0 })
  return res.data
}

const voteUp = anecdote => {
  const res = axios.put(url+`/${anecdote.id}`, { content: anecdote.content, id: anecdote._id, votes: anecdote.votes+1 })
  return res.data
}

export default { getAll, createNew, voteUp }
