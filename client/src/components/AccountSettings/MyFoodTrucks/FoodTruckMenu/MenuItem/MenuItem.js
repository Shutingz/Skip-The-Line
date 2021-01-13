import React from 'react';
import {withStyles} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField/TextField";
import './MenuItem.css';

const FoodNameTextField = withStyles({
    root: {
        width: '20%',
        marginRight: '15px',
        marginBottom: '20px',
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

const FoodDescriptionTextField = withStyles({
    root: {
        width: '60%',
        marginRight: '10px',
        marginBottom: '20px',
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

const FoodPriceTextField = withStyles({
    root: {
        width: '12%',
        marginRight: '10px',
        marginBottom: '20px',
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

const menuItem = (props) => {
    const handleChangeName = (event) => {
        const truckId = props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid;
        const foodId = props.menuItem._id ? props.menuItem._id : props.menuItem.uuid;
        props.handleChangeFoodName(truckId, foodId, event.target.value);
    };
    const handleChangeDescription = (event) => {
        const truckId = props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid;
        const foodId = props.menuItem._id ? props.menuItem._id : props.menuItem.uuid;
        props.handleChangeFoodDescription(truckId, foodId, event.target.value);
    };
    const handleChangePrice = (event) => {
        const truckId = props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid;
        const foodId = props.menuItem._id ? props.menuItem._id : props.menuItem.uuid;
        props.handleChangeFoodPrice(truckId, foodId, event.target.value);
    };

    return (
        <div>
            <FoodNameTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.menuItem._id ? props.menuItem._id : props.menuItem.uuid}
                variant="outlined"
                value={props.menuItem.name || ''}
                onChange={handleChangeName}
                label="Menu Item Name"/>
            <FoodDescriptionTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.menuItem._id ? props.menuItem._id + 1 : props.menuItem.uuid + 1}
                variant="outlined"
                value={props.menuItem.description || ''}
                onChange={handleChangeDescription}
                label="Menu Item Description"/>
            <FoodPriceTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.menuItem._id ? props.menuItem._id + 2 : props.menuItem.uuid + 2}
                variant="outlined"
                value={props.menuItem.unitPrice || ''}
                onChange={handleChangePrice}
                type="number"
                label="Unit Price"/>
            <i className={`menu-item-remove-button fa fa-times ${props.infoStatus === 'disabled' ? "menu-item-remove-button-disabled" : ""}`}
               onClick={() => {props.removeMenuItem(`${props.menuItem._id ? props.menuItem._id : props.menuItem.uuid}`, props.foodTruck._id)}}></i>
        </div>
    );
};

export default menuItem;
