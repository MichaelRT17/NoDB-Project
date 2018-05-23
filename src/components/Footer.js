import React from 'react';
import './Footer.css';

const Footer = (props) => {
    return (
        <div className='footer'>
            <br />
            <button className='updateButton'
                onClick={() => props.disclaimer()}> Disclaimer
            </button>
            <br />
            <hr />
            <img className='giphyLogo' src='https://raw.githubusercontent.com/cirla/vim-giphy/master/powered_by_giphy.gif' alt='Giphy Logo' />
            <img className='loveCalcLogo' src='https://s3.amazonaws.com/mashape-production-logos/apis/53aa5dcae4b0f2c97547140f_medium' alt='Love Calculator A P I' />
            <h5>© 2018 Michael Thurman</h5>
        </div>
    )
}

export default Footer