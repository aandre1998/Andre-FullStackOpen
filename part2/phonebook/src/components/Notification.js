import React from 'react';

const Notification = ({notificationMessage}) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }
    
    if (notificationMessage['message'] === '') {
        return null;
    }

    if (notificationMessage['type'] === 'success') {
        return (
            <div className='success' style={successStyle}>
                {notificationMessage['message']}
            </div>
        )
    } 
    else if (notificationMessage['type'] === 'error') {
        return (
            <div className='error' style={errorStyle}>
                {notificationMessage['message']}
            </div>
        )
    }
    else {
        return null;
    }
    
}

export default Notification;