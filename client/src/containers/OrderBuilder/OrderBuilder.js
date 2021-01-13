import React, {Component} from 'react';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import FoodList from '../../components/FoodList/FoodList';
import Auxiliary from '../../high-order-component/Auxiliary';
import Spinner from '../../components/LoadingPlaceholder/LoadingPlaceHolder';
import FoodFilter from '../../components/FoodFilter/FoodFilter';
import './OrderBuilder.css';
const axios = require('axios');

class OrderBuilder extends Component {
    state = {
        selectedFood: {},
        selectedTruck: null,
        userType: null,
    };

    componentDidMount() {
        axios.get(`/api/foodtruck/get/${this.props.location.state.truckId}`)
            .then(response => {
                this.setState({selectedTruck: response.data});
            }).catch(error => {
                console.log('order builder get food truck failed', error)
            });
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.type) {
                    this.setState({ userType: response.data.type });
                }
            });
    };

    filterFood = (keyWord) => {
        if (!keyWord) {
            axios.get(`/api/foodtruck/get/${this.props.location.state.truckId}`)
                .then(response => {
                    this.setState({selectedTruck: response.data});
                }).catch(error => {
                    console.log('order builder get food truck failed', error)
                });
        } else {
            axios.get(`/api/foodtruck/filter/${this.props.location.state.truckId}/${keyWord}`)
                .then(response => {
                    const updatedSelectedTruckInfo = {...this.state.selectedTruck};
                    updatedSelectedTruckInfo.foodList = response.data;
                    this.setState({selectedTruck: updatedSelectedTruckInfo});
                }).catch(error => {
                    console.log('order builder filter failed', error)
                });
        }
    };

    updateSelectedFood = (foodId, newCount) => {
        const updatedSelectedFood = {...this.state.selectedFood};
        updatedSelectedFood[foodId] = newCount;
        this.setState({selectedFood: updatedSelectedFood});
    };

    addFood = (foodId) => {
        axios.get('/api/users/session')
            .then(response => {
                if (response.data.id) {
                    const oldCount = this.state.selectedFood[foodId]
                        ? this.state.selectedFood[foodId]
                        : 0;
                    const newCount = oldCount + 1;
                    this.updateSelectedFood(foodId, newCount);
                } else {
                    this.props.history.push('/authentication');
                }
            });
    };

    removeFood = (foodId) => {
        const oldCount = this.state.selectedFood[foodId]
            ? this.state.selectedFood[foodId]
            : 0;
        if (oldCount > 0) {
            const newCount = oldCount - 1;
            this.updateSelectedFood(foodId, newCount);
        }
    };

    clearFood = (foodId) => {
        this.updateSelectedFood(foodId, 0);
    };

    checkout = () => {
        this.props.history.push({
            pathname: '/checkout',
            state: {
                selectedFood: this.state.selectedFood,
                foodTruckId: this.state.selectedTruck._id
            }
        });
    };

    render() {
        let orderBuilder = <Spinner/>;
        if (this.state.selectedTruck) {
            orderBuilder = (
                <Auxiliary>
                    <FoodFilter filterFood={this.filterFood}/>
                    <FoodList selectedTruck={this.state.selectedTruck}
                              addFood={this.addFood}
                              userType={this.state.userType}/>
                    <OrderSummary selectedTruck={this.state.selectedTruck}
                                  selectedFood={this.state.selectedFood}
                                  addFood={this.addFood}
                                  removeFood={this.removeFood}
                                  clearFood={this.clearFood}
                                  userType={this.state.userType}
                                  checkout={this.checkout}/>
                </Auxiliary>
            )
        }

        return (
            <div className="order-builder-container">
                {orderBuilder}
            </div>
        );
    };
}

export default OrderBuilder;
