import './NotPlayable.css'
import PropTypes from 'prop-types'
import React, { useState } from 'react';

const NotPlayable = ({ hideCard }) => {
    console.log(hideCard)
    return (
        <div>
            {hideCard ? (
                <div className="not_playable"></div> 
            ) : (
                <p></p> 
            )}
        </div>
    )
}

NotPlayable.propTypes = {
    hideCard: PropTypes.bool
};

export default NotPlayable;