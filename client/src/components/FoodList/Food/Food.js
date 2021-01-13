import React from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import './Food.css';

const AddToCartButton = withStyles(() => ({
    root: {
        backgroundColor: orange[400],
        color: 'white',
        border: 0,
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
}))(Button);

const food = (props) => {
    return (
        <div className="food-container">
            <div className="food-name"> {props.name} </div>
            <div className="food-description"> {props.description} </div>
            <div className="food-price"> ${props.price} </div>
            <AddToCartButton
                disabled={props.userType !== 'customer'}
                className='add-to-cart'
                onClick={props.addThisFood}
                variant="outlined">
                Add to Cart
            </AddToCartButton>
        </div>
    );
};

export default food;
