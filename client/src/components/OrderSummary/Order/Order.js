import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import './Order.css';

const order = (props) => {
    return (
        <div className="order-container">
            <IconButton aria-label="delete" className="food-button" size='small' onClick={props.addThisFood}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
            <span className="order-num">  {props.numUnits}</span>
            <IconButton aria-label="delete" className="food-button" size='small' onClick={props.removeThisFood}>
                <RemoveCircleOutlineOutlinedIcon/>
            </IconButton>
            <span className="order-name"> {props.name} </span>
            <span className="order-price"> ${props.price}
                <IconButton aria-label="delete" size='small' onClick={props.clearThisFood}>
        <HighlightOffIcon/>
      </IconButton> </span>
        </div>
    );
};

export default order;
