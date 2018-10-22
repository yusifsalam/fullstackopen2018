import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '', maxWidth:200 }
    const showWhenVisible = { display: this.state.visible ? '' : 'none', maxWidth:200  }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button bsStyle='primary' block onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button bsStyle='warning' block onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable