import React from 'react';
import TextField from '@material-ui/core/TextField'
import {withStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import Button from "@material-ui/core/Button/Button";
import './SignUp.css';
import '../Auth.css';

const signUp = (props) => {
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
    let confirmedPassword;
    let userType;

    const handleChangeUserName = (event) => {
        userName = event.target.value;
    };

    const handleChangePassword = (event) => {
        password = event.target.value;
    };

    const handleChangeConfirmedPassword = (event) => {
        confirmedPassword = event.target.value;
    };

    const handleChangeType = (event) => {
        userType = event.target.value;
    };

    const axios = require('axios');
    const handleSignUp = () => {
        if (!userName) {
            alert('Please type in your user name');
        } else if (!password) {
            alert('Please type in your password');
        } else if (password !== confirmedPassword) {
            alert('fail to confirm your password');
        } else {
            if (userType === 'Food Truck Owner') {
                axios.post('/api/vendor/signUp', {
                    name: userName,
                    password: password
                }).then(response => {
                    if (response.data === 'success') {
                        alert('sign up success!');
                    } else if (response.data === 'user name taken') {
                        alert('User name already taken. Please choose a different name!');
                    }
                }).catch(error => {
                    console.log('Vendor sign up failed: ', error)
                });
            } else {
                axios.post('/api/customer/signUp', {
                    name: userName,
                    password: password
                }).then(response => {
                    if (response.data === 'success') {
                        alert('sign up success!');
                    } else if (response.data === 'user name taken') {
                        alert('User name already taken. Please choose a different name!');
                    }
                }).catch(error => {
                    console.log('Customer sign up failed: ', error)
                });
            }
        }
    };
    return (
        <div className="container auth-container">
            <h2 className="header"> Sign Up For An Account </h2>
            <div className="body">
                <StyledTextField
                    className="auth-input"
                    label="User Name"
                    onChange={handleChangeUserName}
                    value={userName}
                    variant="outlined"/>
                <StyledTextField
                    type="password"
                    className="auth-input"
                    label="Password"
                    onChange={handleChangePassword}
                    value={password}
                    variant="outlined"/>
                <StyledTextField
                    className="auth-input"
                    type="password"
                    label="Confirm Password"
                    onChange={handleChangeConfirmedPassword}
                    value={confirmedPassword}
                    variant="outlined"/>
                <div className="auth-identity-instruction">I am a</div>
                <select value={userType} onChange={handleChangeType} className="auth-identity-selection">
                    <option defaultValue value="customer">Customer</option>
                    <option value="Food Truck Owner">Food Truck Owner</option>
                </select>
                <StyledButton onClick={handleSignUp}> Sign Up </StyledButton>
            </div>
            <div className="auth-redirect-container">
            <span
                className="auth-redirect-guide">
              Already Have An Account?
            </span>
                <button
                    className="auth-redirect-button"
                    onClick={props.updateAuthAction}>
                    Log In
                </button>
            </div>
        </div>
    );
};

export default signUp;
