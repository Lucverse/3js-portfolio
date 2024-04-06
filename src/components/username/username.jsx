import React from 'react';

const Username = ({ username }) => {
    const nameParts = username.split(' ');
    return (
        <div className='username-div'>
            {nameParts.map((part, index) => (
                <p className='username' key={index}>{part}</p>
            ))}
        </div>
    );
}

export default Username;