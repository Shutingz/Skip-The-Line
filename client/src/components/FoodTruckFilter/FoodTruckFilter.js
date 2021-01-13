import React from 'react';
import './FoodTruckFilter.css';
import '../../GlobalStyle.css';


const foodTruckFilter = (props) => {
    let keyWord;
    const handleChangeKeyWard = (event) => {
        keyWord = event.target.value;
        if (!keyWord) {
            props.filterFoodTruck('');
        }
    };
    return (
        <div>
            <input
                className="foodtruck-filter-input"
                value={keyWord}
                placeholder="Search Food Trucks..."
                onChange={handleChangeKeyWard}
            />
            <button
                className="filter-button foodtruck-filter-search-button"
                onClick={() => {props.filterFoodTruck(keyWord)}}
            >
                <i className="fa fa-search"></i>
            </button>
        </div>
    )
};

export default foodTruckFilter;
