import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './Header.css'


class Header extends Component {
    state = {
        userName: null,
        userId: null,
    };

    goToPage = (path) => {
        this.props.history.push(path);
    };

    updateUserName = () => {
        const axios = require('axios');
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.name) {
                    this.setState({userName: response.data.name});
                    this.setState({userId: response.data.id});
                }
            });
    };

    componentDidMount() {
        this.updateUserName();
    };

    render() {
        let userProfileButton = (
            <button onClick={() => {
                this.goToPage('/authentication');
            }}
                    className="header-login-button"
            >
                <i className="fa fa-user-circle header-login-button-logo"></i>
                LOG IN
            </button>
        );
        if (this.state.userName) {
            let imagePath = '';
            try {
                imagePath = require(`../../../images/${this.state.userId}.png`);
            } catch(err){
                imagePath = require('../../../images/UserDefaultImage.png');  //set default image path
            }
            userProfileButton = (
                <img
                    alt="User profile"
                    onClick={() => {
                        this.goToPage('/account-setting')
                    }}
                    className="header-profile-img"
                    src={imagePath}
                />
            );
        }
        return (
            <div className="header-container">
                <img
                    alt="header logo"
                    onClick={() => {
                        this.goToPage('/')
                    }}
                    className="header-logo"
                    src={require('../../../images/SkipTheLineLogo.png')}
                />
                {userProfileButton}
            </div>
        )
    };

}

export default withRouter(Header);
