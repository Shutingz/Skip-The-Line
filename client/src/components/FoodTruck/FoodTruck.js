import React from 'react';
import {withRouter} from 'react-router-dom';
import './FoodTruck.css';

const foodTruck = (props) => {
    const goToOrderBuilder = () => {
        if (props.status === 'open') props.history.push({
            pathname: '/order-builder',
            state: { truckId: props.truckId }
        });
    };

    let imagePath = '';
    try {
        imagePath = require(`../../images/${props.truckId}.png`);
    } catch(err){
        imagePath = require('../../images/TruckDefaultImage.png');  //set default image path
    }

    return (
        <div className={`foodtruck-container ${props.status === 'open' ? 'foodtruck-container-clickable' : null}`}
             onClick={goToOrderBuilder}>
            <img
                alt="food truck"
                className="foodtruck-image"
                src={imagePath}
            />
            <div className="foodtruck-info">
                <div className="foodtruck-name"> {props.name} </div>
                <div className="foodtruck-wait-time">
                    {props.avgWaitTime}
                </div>
                <div className="foodtruck-description">
                    {props.description}
                </div>
            </div>
            <div
                className={`foodtruck-status-${props.status === 'open' ? 'open' : 'closed'}`}
            >
                {props.status === 'open' ? 'Open' : 'Closed'}
            </div>
        </div>
    );
};

export default withRouter(foodTruck);
