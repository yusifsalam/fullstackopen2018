import React from 'react'

const User = ({ user }) => {
    console.log('user', user)
    if (user === null) return null
    return(
      <div>
        <h2>{user.name} aka {user.username}</h2>
        <h3>Added blogs</h3>
        {user.blogs.map(blog=> (
          <div>
            <li>{blog.title} </li>
          </div>
        ))}
      </div>
    )
  }
  
export default User