import React from 'react';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import Button from "@material-ui/core/Button/Button";
import '../Auth.css';
import '../../../GlobalStyle.css';

const logIn = (props) => {
    const StyledTextField = withStyles({
        root: {
            marginBottom: '7%',
            '& label.Mui-focused': {
                color: orange[700],
            },
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: orange[500],
                },
                '&.Mui-focused fieldset': {
                    borderColor: orange[700],
                },
            },
        },
    })(TextField);

    const StyledButton = withStyles(() => ({
        root: {
            backgroundColor: orange[400],
            color: 'white',
            border: 0,
            '&:hover': {
                backgroundColor: orange[700],
            },
        },
    }))(Button);

    let userName;
    let password;

    const handleChangeUserName = (event) => {
        userName = event.target.value;
    };

    const handleChangePassword = (event) => {
        password = event.target.value;
    };

    const loginAndGoBack = () => {
        const axios = require('axios');
        axios.post('/api/users/login', {
            name: userName,
            password: password
        })
            .then(response => {
                if (response.data === 'bad user name') alert('bad user name');
                else if (response.data === 'account no longer valid') alert('Sorry your account is no longer valid :(');
                else if (response.data === 'bad password') alert('bad password');
                else if (response.data['type']) props.history.push('/');
            }).catch(error => {
                console.log('login failed: ', error)
            });
    };

    return (
        <div className="container auth-container">
            <h2 className="header"> Log In to Skip The Lines </h2>
            <div className="body">
                <StyledTextField
                    id="outlined"
                    className="auth-input"
                    value={userName}
                    onChange={handleChangeUserName}
                    label="User Name"
                    variant="outlined"
                />
                <StyledTextField
                    id="outlined"
                    type="password"
                    className="auth-input"
                    value={password}
                    onChange={handleChangePassword}
                    label="Password"
                    variant="outlined"/>

                <StyledButton onClick={loginAndGoBack}>
                    Log In
                </StyledButton>
            </div>
            <div className="auth-redirect-container">
        <span
            className="auth-redirect-guide">
          Need an account?
        </span>
                <button
                    className="auth-redirect-button"
                    onClick={props.updateAuthAction}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default withRouter(logIn);
