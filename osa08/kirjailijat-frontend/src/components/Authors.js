import React, { useState } from 'react'
// import { useApolloClient } from 'react-apollo-hooks'

const Authors = ({ result, show, editBorn }) => {
  // const client = useApolloClient()
  if (!show) return null
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    await editBorn({
      variables: { "name": author, "born": parseInt(born) }
    })
    setAuthor('')
    setBorn('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select
          onChange={({ target }) => setAuthor(target.value)}>
          <option value=''>--Select author--</option>
          {result.data.allAuthors.map(a => <option
            key={a.name}
            value={a.name}> {a.name}</option>)}</select>
        <div>
          born <input
            values={born}
            onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors