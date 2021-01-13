import React, {Component} from 'react';
import Auxiliary from '../../high-order-component/Auxiliary';
import FoodTruck from '../../components/FoodTruck/FoodTruck';
import FoodTruckFilter from '../../components/FoodTruckFilter/FoodTruckFilter';
import Spinner from '../../components/LoadingPlaceholder/LoadingPlaceHolder';
const axios = require('axios');

class FoodTruckSelector extends Component {
    state = {
        foodTruckList: null
    };

    getAllFoodTruck = () => {
        axios.get('/api/foodtruck/get/all')
            .then(response => {
                this.setState({foodTruckList: response.data});
            }).catch(error => {
                console.log('food truck selector get all food trucks failed', error)
            });
    };

    componentDidMount() {
        this.getAllFoodTruck();
    };

    filterFoodTruck = (keyWord) => {
        if (!keyWord) {
            this.getAllFoodTruck();
        } else {
            axios.get(`/api/foodtruck/filter/${keyWord}`)
                .then(response => {
                    this.setState({foodTruckList: response.data});
                }).catch(error => {
                    console.log('food truck selector filter food trucks failed', error)
                });
        }
    };

    render() {
        // TODO: ADD THE FILTER BACK. ADD A LOADER
        let foodTruckList = <Spinner/>;
        if (this.state.foodTruckList) {
            foodTruckList = (
                <Auxiliary>
                    {this.state.foodTruckList.map(foodTruck => {
                        return <FoodTruck
                            key={foodTruck._id}
                            truckId={foodTruck._id}
                            name={foodTruck.name}
                            status={foodTruck.status}
                            description={foodTruck.description}
                            avgWaitTime={foodTruck.averageWaitTime}
                        />
                    })}
                </Auxiliary>
            )
        }
        return (
            <Auxiliary>
                <FoodTruckFilter filterFoodTruck={this.filterFoodTruck}/>
                {foodTruckList}
            </Auxiliary>
        )
    }
}

export default FoodTruckSelector;
