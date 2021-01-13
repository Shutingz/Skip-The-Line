import React from 'react';
import MenuItem from './MenuItem/MenuItem';

const foodTruckMenu = (props) => {
    console.log('props.foodTruck.foodList ', props.foodTruck.foodList);
    return (
        <div>
            {props.foodTruck.foodList.map(food => {
                return <MenuItem
                    key={food._id ? food._id : food.uuid}
                    foodTruck={props.foodTruck}
                    menuItem={food}
                    infoStatus={props.infoStatus}
                    removeMenuItem={props.removeMenuItem}
                    handleChangeFoodDescription={props.handleChangeFoodDescription}
                    handleChangeFoodName={props.handleChangeFoodName}
                    handleChangeFoodPrice={props.handleChangeFoodPrice}
                />
            })}
        </div>
    );
};

export default foodTruckMenu;
