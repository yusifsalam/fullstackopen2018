import React, { useState } from 'react'
// import { useApolloClient } from 'react-apollo-hooks'

const Books = ({ result, show }) => {
  
  const [genre, setGenre] = useState("")
  if (result.loading) return <div>loading...</div>

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.filter(a=> genre===""?a:a.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={()=>setGenre('classic')}>classic</button>
      <button onClick={()=>setGenre('agile')}>agile</button>
      <button onClick={()=>setGenre('design')}>design</button>
      <button onClick={()=>setGenre('crime')}>crime</button>
      <button onClick={()=>setGenre('fantasy')}>fantasy</button>
      <button onClick={()=>setGenre("")}>all</button>

    </div>
  )
}

export default Books