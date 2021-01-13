import React from 'react';
import {withRouter} from 'react-router-dom';
import Order from './Order/Order';
import './OrderSummary.css';

const orderSummary = (props) => {
    let canCheckout = false;
    if (props.userType === 'customer') {
        (Object.keys(props.selectedFood)).forEach((foodId) => {
            if (props.selectedFood[foodId] > 0) canCheckout = true;
        });
    }

    if (canCheckout) {
        let subTotal = 0;
        const orders = props.selectedTruck.foodList.map(food => {
            if (props.selectedFood[food._id]) {
                const numUnits = props.selectedFood[food._id];
                const price = food.unitPrice * numUnits;
                subTotal += price;
                return <Order
                    key={food._id}
                    numUnits={numUnits}
                    name={food.name}
                    price={price.toFixed(2)}
                    addThisFood={() => props.addFood(food._id)}
                    removeThisFood={() => props.removeFood(food._id)}
                    clearThisFood={() => props.clearFood(food._id)}/>
            }
            return null;
        });
        return (
            <div className="order-summary-container">
                <h2 className="order-summary-header"> Your Order </h2>
                <div className="order-summary">
                    {orders}
                </div>
                <div className="order-summary-subtotal">
                    Food & Beverage Subtotal: ${subTotal.toFixed(2)}
                </div>
                <div
                    tabIndex="1"
                    className="order-summary-checkout-button" onClick={() => {
                    props.checkout();
                }}>
                    Checkout
                </div>
            </div>
        );
    } else if (props.userType === 'customer') {
        return (
            <div className="order-summary-empty-container">
                <h2 className="order-summary-header"> Your Order </h2>
                <div className="order-summary-empty">
                    You haven't order anything yet ¯\_(ツ)_/¯
                </div>
            </div>
        );
    } else if (props.userType && props.userType !== 'customer') {
        // TODO: COME UP WITH A LESS SHITTIER MESSAGE
        return (
            <div className="order-summary-empty-container">
                <div className="order-summary-empty">
                    Good Morning ヾ(´･ω･｀)ﾉ
                </div>
            </div>
        );
    } else {
        return (
            <div className="order-summary-empty-container">
                <h2 className="order-summary-header"> Your Order </h2>
                <div className="order-summary-empty">
                    Please sign in first
                </div>
            </div>
        );
    }
};

export default withRouter(orderSummary);
