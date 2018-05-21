import React from 'react';
import './Compatibility.css';

const DeleteAll = (props) => {
    return (
        <button className='updateButton'
            onClick={() => props.deleteAll()}>Delete all
        </button>
    )
}

export default DeleteAll;