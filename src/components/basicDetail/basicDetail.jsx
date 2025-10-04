import React from 'react';

const BasicDetails = ({ BasicDetails }) => {
    return (
        <div className='basic-details-div'>
            <p className='basic-details'>{BasicDetails.title}</p>
            <p className='basic-address'>{BasicDetails.address.city}, {BasicDetails.address.country}</p>
        </div>
    );
}

export default BasicDetails;