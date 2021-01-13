import React from 'react';
import {withStyles} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField/TextField";
import './MyFoodTruck.css';

const StyledTextField = withStyles({
    root: {
        width: '23%',
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

const MyFoodTruck = (props) => {

    return (
        <div className="my-foodtruck-container">
            <StyledTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.foodTruck._id ? props.foodTruck._id + 1 : props.foodTruck.uuid + 1}
                variant="outlined"
                value={props.foodTruck.name || ''}
                onChange={e => props.handleChangeTruckName(props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid, e.target.value)}
                label="Food Truck Name"/>
            <StyledTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.foodTruck._id ? props.foodTruck._id + 2 : props.foodTruck.uuid + 2}
                variant="outlined"
                value={props.foodTruck.status || ''}
                onChange={e => props.handleChangeTruckStatus(props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid, e.target.value)}
                label="Food Truck Status"/>
            <StyledTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.foodTruck._id ? props.foodTruck._id + 3 : props.foodTruck.uuid + 3}
                variant="outlined"
                value={props.foodTruck.averageWaitTime || ''}
                onChange={e => props.handleChangeTruckAverageWaitTime(props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid, e.target.value)}
                label="Average Wait Time"/>
            <StyledTextField
                disabled={props.infoStatus === 'disabled'}
                id={props.foodTruck._id ? props.foodTruck._id + 4 : props.foodTruck.uuid + 4}
                variant="outlined"
                value={props.foodTruck.description || ''}
                onChange={e => props.handleChangeTruckDescription(props.foodTruck._id ? props.foodTruck._id : props.foodTruck.uuid, e.target.value)}
                label="Food Truck Description"/>
        </div>
    );
};

export default MyFoodTruck;
