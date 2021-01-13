import React from 'react';
import Food from './Food/Food';
import './FoodList.css';

const foodList = (props) => {
    const truckFoodList = props.selectedTruck.foodList.map(food => {
        return <Food key={food._id}
                     name={food.name}
                     description={food.description}
                     price={food.unitPrice}
                     userType={props.userType}
                     addThisFood={() => props.addFood(food._id)}/>
    });
    return (
        <div className="foodlist-container">
            <h1> {props.selectedTruck.name} </h1>
            <div className="foodlist"> {truckFoodList} </div>
        </div>
    );
};

export default foodList;
