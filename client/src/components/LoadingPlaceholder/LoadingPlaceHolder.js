import React from 'react';
import './LoadingPlaceHolder.css';

const loadingPlaceHolder = () => {
    return (
        <div className="loading-placeholder">
            <i className="loading-placeholder-icon fa fa-spinner fa-pulse"></i>
            <div className="loading-placeholder-words"> loading... </div>
        </div>
    );

};

export default loadingPlaceHolder;
