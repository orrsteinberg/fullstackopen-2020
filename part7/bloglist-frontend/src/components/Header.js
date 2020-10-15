import React from 'react'
import PropTypes from 'prop-types'
import Notification from '../components/Notification'

const Header = ({ title }) => (
  <div>
    <h1>{title}</h1>
    <Notification />
  </div>
)

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header
