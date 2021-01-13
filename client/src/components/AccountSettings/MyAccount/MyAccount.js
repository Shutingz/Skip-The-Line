import React from 'react';
import {withRouter} from 'react-router-dom';
import './MyAccount.css';
import '../AccountSettingsStyle.css';
import '../../../GlobalStyle.css';

const myAccount = (props) => {
    const logOut = () => {
        const axios = require('axios');
        axios.get('/api/users/logout')
            .then(response => {
                props.history.push('/');
            });
    };

    return (
        <div className="container my-account-container">
            <h2 className="header"> Log Out </h2>
            <div className="body">
                <div className="bye" >Bye (｡･_･)ﾉ</div>
                <button className="account-setting-button my-account-logout-button my-account-logout-button-color"
                        onClick={logOut}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default withRouter(myAccount);
