import React from 'react';
import {withRouter} from 'react-router-dom';
import './Payment.css';
import '../../GlobalStyle.css';

const Payment = (props) => {
    // const [paymentMethod, updatePaymentMethod] = useState('creditCard');
    // const getPaymentMethod = (e) => {
    //     updatePaymentMethod(e.currentTarget.value);
    // };
    //
    // const getPaymentUI = () => {
    //     if (paymentMethod === 'creditCard') {
    //         return (
    //             <div className="payment-card">
    //                 <input className="payment-card-number" placeholder="Credit Card Number"/>
    //                 <div>
    //                     <input className="payment-card-info" placeholder="Month"/>
    //                     <input className="payment-card-info" placeholder="Year"/>
    //                     <input className="payment-card-info" placeholder="CVV"/>
    //                 </div>
    //             </div>
    //         );
    //     } else if (paymentMethod === 'cash') {
    //         return <div className="payment-cash"> Pay when you pick up your order _(:3」∠❀)_ </div>;
    //     }
    // };

    const confirmOrder = () => {
        const axios = require('axios');
        axios.post('/api/orderHistory/add', {
            selectedFood: props.selectedFood,
            foodTruckId: props.foodTruckId
        }).then(response => {
            if (response.data === 'success') props.history.push('/thank-you');
            else alert('Oops your order was not successful please try again');
        }).catch(error => {
            alert('Oops your order was not successful please try again');
        });
    };

    return (
        <div className="container">
            <h2 className="header"> Confirm Order </h2>
            <div className="body payment-container">
                {/*<select className="payment-method-selection" onChange={getPaymentMethod}>*/}
                    {/*<option defaultValue value="creditCard">Credit Card</option>*/}
                    {/*<option value="cash">Cash</option>*/}
                {/*</select>*/}
                {/*{getPaymentUI()}*/}
                Please pay for your order at the food Truck. Thank you!
                <button className="payment-confirm-button"
                        onClick={() => { confirmOrder() }}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default withRouter(Payment);
