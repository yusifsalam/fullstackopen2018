import React from 'react'

const Recommend = ({ user, result, show }) => {

  if (result.loading) return <div>loading...</div>

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <span style={{fontWeight : "bold"}}>{user.data.me.favoriteGenre}</span></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.filter(a => a.genres.includes(user.data.me.favoriteGenre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend