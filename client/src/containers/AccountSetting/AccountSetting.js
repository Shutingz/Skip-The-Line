import React, {Component} from 'react';
import AdminDashBoard from '../../components/AccountSettings/AdminDashBoard/AdminDashBoard';
import MyAccount from '../../components/AccountSettings/MyAccount/MyAccount';
import MyFoodTrucks from '../../components/AccountSettings/MyFoodTrucks/MyFoodTrucks';
import Password from '../../components/AccountSettings/Password/Password';
import Transactions from '../../components/AccountSettings/Transactions/Transactions';
import Spinner from '../../components/LoadingPlaceholder/LoadingPlaceHolder';
import Auxiliary from '../../high-order-component/Auxiliary';

import './AccountSetting.css';

class AccountSetting extends Component {
    state = {
        userType: null,
        currentSetting: "account"
    };

    componentDidMount() {
        const axios = require('axios');
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.name) this.setState({userType: response.data.type});
            });
    };

    getSettingChoice = () => {
        if (this.state.userType === 'admin') {
            return (
                <div
                    className={`account-setting-choice ${this.state.currentSetting === 'dashboard' ? 'account-setting-choice-selected' : ''}`}
                    onClick={() => {
                        this.updateCurrentSetting('dashboard')
                    }}>
                    Admin Dashboard
                </div>
            );
        }
        else if (this.state.userType === 'customer') {
            return null;
        }
        else {
            return (
                <div
                    className={`account-setting-choice ${this.state.currentSetting === 'foodtruck' ? 'account-setting-choice-selected' : ''}`}
                    onClick={() => {
                        this.updateCurrentSetting('foodtruck')
                    }}>
                    My Food Trucks
                </div>
            );
        }
    };

    updateCurrentSetting = (newSetting) => {
        this.setState({currentSetting: newSetting});
    };

    settingUI = () => {
        if (this.state.currentSetting === 'password') return <Password/>;
        else if (this.state.currentSetting === 'foodtruck') return <MyFoodTrucks/>;
        else if (this.state.currentSetting === 'dashboard') return <AdminDashBoard/>;
        else if (this.state.currentSetting === 'transactions') return <Transactions/>;
        else return <MyAccount/>;
    };


    render() {
        let accountSetting = <Spinner/>;
        if (this.state.userType) {
            accountSetting = (
                <div className="account-setting-container">
                    <div className="account-setting-title"> Account Settings</div>
                    <div className="account-setting-choices">
                        <div
                            className={`account-setting-choice ${this.state.currentSetting === 'account' ? 'account-setting-choice-selected' : ''}`}
                            onClick={() => {
                                this.updateCurrentSetting('account')
                            }}>
                            My Account
                        </div>
                        <div
                            className={`account-setting-choice ${this.state.currentSetting === 'password' ? 'account-setting-choice-selected' : ''}`}
                            onClick={() => {
                                this.updateCurrentSetting('password')
                            }}>
                            Password
                        </div>
                        {this.getSettingChoice()}
                        <div
                            className={`account-setting-choice ${this.state.currentSetting === 'transactions' ? 'account-setting-choice-selected' : ''}`}
                            onClick={() => {
                                this.updateCurrentSetting('transactions')
                            }}>
                            Order History
                        </div>
                    </div>
                    {this.settingUI()}
                </div>
            );
        }
        return (
            <Auxiliary>
                {accountSetting}
            </Auxiliary>
        );
    };
}

export default AccountSetting;
