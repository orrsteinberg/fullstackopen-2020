import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from '../globalStyles'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const ShowWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Card>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={ShowWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </Card>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Toggleable'

export default Togglable
