import React, {Component} from 'react';
import AllUsers from './AllUsers/AllUsers';
import AllFoodTrucks from './AllFoodTrucks/AllFoodTrucks';
import Spinner from '../../../components/LoadingPlaceholder/LoadingPlaceHolder';
import Auxiliary from '../../../high-order-component/Auxiliary';
import './AdminDashBoard.css';
import '../../../GlobalStyle.css';

const axios = require('axios');

class AdminDashBoard extends Component {
    // Will use backend to get this data
    state = {
        allUsers: null,
        allFoodTrucks: null,
        currAdminId: null
    };

    loadAllUsers = () => {
        axios.get('/api/users/get/all')
            .then(response => {
                this.setState({allUsers: response.data});
            }).catch(error => {
                console.log('cannot load all users', error)
            });
    };

    loadAllFoodTrucks = () => {
        axios.get('/api/foodtruck/get/all')
            .then(response => {
                this.setState({allFoodTrucks: response.data});
            }).catch(error => {
            console.log('admin dashboard load food truck failed: ', error);
        });
    };

    componentDidMount() {
        this.loadAllFoodTrucks();
        this.loadAllUsers();
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.id) {
                    this.setState({currAdminId: response.data.id});
                }
            });
    };

    removeUser = (userId, userType) => {
        axios.delete(`/api/users/delete/${userId}/${userType}`).then(response => {
            if (response.data === 'success') {
                if (userId === this.state.currAdminId) this.props.history.push('/');
                else this.loadAllUsers();
            } else {
                console.log('remove user failed')
            }
        }).catch(error => {
            console.log('remove user failed', error);
        })

    };

    changeUserAccountStatus = (userId, userType, newStatus) => {
        axios.patch(`/api/users/status/${userId}/${userType}/${newStatus}`).then(response => {
            if (response.data === 'success') {
                this.loadAllUsers();
            } else console.log('change account status failed');
        }).catch(error => {
            console.log('change account status failed', error);
        })

    };

    removeTruck = (ownerId, truckId) => {
        axios.delete(`/api/foodtruck/delete/${ownerId}/${truckId}`)
            .then(response => {
                if (response.data === 'success') this.loadAllFoodTrucks();
                else console.log('admin delete food truck failed: ', response.data);
            }).catch(error => {
            console.log('admin delete food truck failed ', error);
            })
    };

    render() {
        let dashboard = <Spinner/>;
        if (this.state.allFoodTrucks && this.state.allUsers && this.state.currAdminId) {
            dashboard = (
                <Auxiliary>
                    <h1 className="header">All Users</h1>
                    <AllUsers className="admin-board"
                              removeUser={this.removeUser}
                              allUsers={this.state.allUsers}
                              changeUserAccountStatus={this.changeUserAccountStatus}/>
                    <AllFoodTrucks className="admin-board"
                                   removeTruck={this.removeTruck}
                                   allFoodTrucks={this.state.allFoodTrucks}/>
                </Auxiliary>
            );

        }
        return (
            <div className="admin-board-container">
                {dashboard}
            </div>
        );
    };
}

export default AdminDashBoard;
