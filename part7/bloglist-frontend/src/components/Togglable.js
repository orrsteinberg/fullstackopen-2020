import React, { useState, useImperativeHandle } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Card, Button } from '../globalStyles'

const StyledToggleableDiv = styled.div`
  ${({ hide }) =>
    hide &&
    css`
      display: none;
    `}
`

const Togglable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Card>
      <StyledToggleableDiv hide={isVisible}>
        <Button primary onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </StyledToggleableDiv>
      <StyledToggleableDiv hide={!isVisible}>
        {children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </StyledToggleableDiv>
    </Card>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

Togglable.displayName = 'Toggleable'

export default Togglable
