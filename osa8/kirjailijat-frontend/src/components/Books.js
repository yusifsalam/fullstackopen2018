import React from 'react'
// import { useApolloClient } from 'react-apollo-hooks'

const Books = ({result, show}) => {
  
  // const client = useApolloClient()
  // const [book, setBook] = useState(null)
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
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books