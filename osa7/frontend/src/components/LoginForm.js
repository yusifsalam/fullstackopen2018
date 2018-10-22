import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
          <Button bsStyle='primary' block type='submit'>login</Button>
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