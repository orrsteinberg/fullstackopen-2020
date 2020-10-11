import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
    if (!message) {
        return null;
    }

    if (type === 'error') {
        return (
            <div className="error">{message}</div>
        );
    } else {
        return (
            <div className="success">{message}</div>
        );
    }
};

Notification.propTypes = {
    type: PropTypes.string.isRequired
};

export default Notification;
