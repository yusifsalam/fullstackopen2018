import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { gql } from 'apollo-boost'
// import { Query, ApolloConsumer, Mutation} from 'react-apollo'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'

const CURRENT_USER = gql`{
  me {
    username
    favoriteGenre
  }
}`

const ALL_AUTHORS = gql`{
  allAuthors {
    name
    born
    bookCount
  }
}`

const ALL_BOOKS = gql`{
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author, 
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      id
  }
}`

const EDIT_BIRTHYEAR = gql`
  mutation editAuthorBirthYear($name: String!, $born: Int!){
    editAuthor(name:$name, setBornTo: $born) {
      name
      born
      id
    }
}`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(CURRENT_USER)
  const login = useMutation(LOGIN)
  const client = useApolloClient()
  
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const addBook = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  const editBorn = useMutation(EDIT_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })



  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
          handleError={handleError}
        />
      </div>
    )
  }

  return (
    <div>
      {errorNotification()}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        result={authors}
        show={page === 'authors'}
        editBorn={editBorn}
      />

      <Books
        result={books}
        show={page === 'books'}
      />

      <NewBook
        addBook={addBook}
        show={page === 'add'}
      />

      <Recommend
        result = {books}
        user = {me}
        show = {page === 'recommend'}
      />

    </div>
  )
}

export default App
