import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username
            <input value={username} onChange={handleChange} name="username" />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  };

  export default LoginForm