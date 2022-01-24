import React from 'react';

const Notification = ({notificationMessage}) => {
    
    //Styles for Notification component
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

    //Adjust styles based on success/error (type of message passed in props)
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
    //If type is not success or error (e.g. blank message), return null
    else {
        return null;
    }
    
}

export default Notification;