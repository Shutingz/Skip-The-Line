import React, {Component} from 'react';
import Spinner from '../../../components/LoadingPlaceholder/LoadingPlaceHolder';
import Transaction from './Transaction/Transaction';

const axios = require('axios');

class Transactions extends Component {
    state = {
        allTransactions: null,
        user: null
    };

    getAllOrderHistory = () => {
        axios.get('/api/orderHistory/all')
            .then(response => {
                this.setState({allTransactions: response.data});
            }).catch(error => {
                console.log('Get all order history failed: ', error)
            });
    };

    componentDidMount() {
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.name) {
                    const user = {
                        id: response.data.id,
                        name: response.data.name,
                        type: response.data.type,
                    };
                    this.setState({user: user});
                    this.getAllOrderHistory();
                }
            });
    };

    removeTransactionHistory = (orderId) => {
        if (this.state.user.type === 'admin') {
            axios.delete(`/api/orderHistory/remove/${orderId}`).then(response => {
                if (response.data === 'success') this.getAllOrderHistory();
                else console.log('delete order history failed');
            }).catch(error => {
                console.log('delete order history failed: ', error);
            })
        } else {
            axios.patch(`/api/orderHistory/disable/${orderId}`)
                .then(response => {
                    if (response.data === 'success') this.getAllOrderHistory();
                    else console.log('Oops remove transaction history failed');
                }).catch(error => {
                    console.log('Oops remove transaction history failed: ', error);
            });
        }
    };

    changeOrderStatus = (orderId, newStatus) => {
        axios.patch(`/api/orderHistory/status/${orderId}/${newStatus}`)
            .then(response => {
                if (response.data === 'success') this.getAllOrderHistory();
                else console.log('change order status failed');
            }).catch(error => {
                console.log('change order status failed: ', error);
            });
    };

    render() {
        let adminTransaction = <Spinner/>;
        if (this.state.allTransactions) {
            adminTransaction =
                <Transaction
                    changeOrderStatus={this.changeOrderStatus}
                    removeRow={this.removeTransactionHistory}
                    transactions={this.state.allTransactions}
                    user={this.state.user}/>
        }
        return (
            <div className="log-container">
                {adminTransaction}
            </div>
        );
    };
}

export default Transactions;
