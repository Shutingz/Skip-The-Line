import React from 'react';
import { uuid } from 'uuidv4';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import useForceUpdate from 'use-force-update';
import './Password.css';
import '../AccountSettingsStyle.css';
import '../../../GlobalStyle.css';

const Password = () => {
    const StyledTextField = withStyles({
        root: {
            marginBottom: '10px',
            marginTop: '10px',
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
    const forceUpdate = useForceUpdate();
    const user = {};

    let oldPassword;
    let newPassword;
    let confirmNewPassword;

    const axios = require('axios');
    axios.get('/api/users/session')
        .then(response => {
            if (response.data.name) {
                user.name = response.data.name;
                user.id = response.data.id;
                user.type = response.data.type;
            }
        });

    const handleChangeOldPassword = (event) => {
        oldPassword = event.target.value;
    };
    const handleChangeNewPassword = (event) => {
        newPassword = event.target.value;
    };
    const handleChangeConfirmNewPassword = (event) => {
        confirmNewPassword = event.target.value;
    };

    const handleResetPasswordButton = () => {
        if (!oldPassword) {
            alert('Please input your current password');
            return false;
        } else if (!newPassword) {
            alert('Please input your new password');
            return false;
        } else if (newPassword !== confirmNewPassword) {
            alert('Cannot confirm new password');
            return false;
        } else {
            axios.patch('/api/account/password', {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword
            })
                .then(response => {
                    if (response.data === 'success') {
                        alert('change password success!');
                        oldPassword = '';
                        newPassword = '';
                        confirmNewPassword = '';
                        forceUpdate();
                    } else if (response.data === 'user not logged in') {
                        alert('please login')
                    } else if (response.data === 'wrong password') {
                        alert('please provide correct password')
                    } else {
                        alert('change password failed');
                    }
                }).catch(error => {
                    alert('change password failed');
                    console.log('change password failed', error)
                });
        }
    };

    return (
        <div className="container password-container">
            <h2 className="header"> Reset Your Password</h2>
            <div className="body">
                <StyledTextField
                    id={uuid()}
                    type="password"
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                    label="Old Password"
                    variant="outlined"/>
                <StyledTextField
                    id={uuid()}
                    type="password"
                    value={newPassword}
                    onChange={handleChangeNewPassword}
                    label="New Password"
                    variant="outlined"/>
                <StyledTextField
                    id={uuid()}
                    type="password"
                    value={confirmNewPassword}
                    onChange={handleChangeConfirmNewPassword}
                    label="Confirm New Password"
                    variant="outlined"/>
                <button className="account-setting-button account-setting-button-color password-reset-button"
                        onClick={handleResetPasswordButton}>
                    Reset Password
                </button>
            </div>
        </div>
    );
};

export default Password;
