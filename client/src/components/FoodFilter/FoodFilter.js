import React from 'react';
import './FoodFilter.css';
import '../../GlobalStyle.css';

const foodFilter = (props) => {
    let keyWord;
    const handleChangeKeyWard = (event) => {
        keyWord = event.target.value;
        if (!keyWord) {
            props.filterFood('');
        }
    };
    return (
        <div>
            <input
                className="food-filter-input"
                value={keyWord}
                placeholder="Search Food..."
                onChange={handleChangeKeyWard}
            />
            <button
                className="filter-button"
                onClick={() => {props.filterFood(keyWord)}}
            >
                <i className="fa fa-search"></i>
            </button>
        </div>
    )
};

export default foodFilter;
