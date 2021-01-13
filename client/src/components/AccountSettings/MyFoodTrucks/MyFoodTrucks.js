import React, {Component} from 'react';
import {uuid} from 'uuidv4';
import MyFoodTruck from './MyFoodTruck/MyFoodTruck';
import FoodTruckMenu from './FoodTruckMenu/FoodTruckMenu';
import Spinner from '../../../components/LoadingPlaceholder/LoadingPlaceHolder';
import Auxiliary from '../../../high-order-component/Auxiliary';
import './MyFoodTrucks.css';
import '../AccountSettingsStyle.css';

const axios = require('axios');

class MyFoodTrucks extends Component {
    state = {
        myFoodTruckStatus: {},
        myFoodTrucks: null,
    };

    getMyFoodTruck = () => {
        axios.get('/api/foodtruck/myTrucks')
            .then(response => {
                this.setState({myFoodTrucks: response.data});
                const updatedStatus = {};
                this.state.myFoodTrucks.forEach(foodTruck => {
                    updatedStatus[foodTruck._id] = 'disabled';
                });
                this.setState({myFoodTruckStatus: updatedStatus});
            }).catch(error => {
                console.log('Get my trucks failed', error)
            });
    };

    componentDidMount() {
        this.getMyFoodTruck();
    };

    editFoodTruckInfo = (foodTruckId) => {
        if (this.state.myFoodTruckStatus[foodTruckId] === 'disabled') {
            const updatedStatus = {...this.state.myFoodTruckStatus};
            updatedStatus[foodTruckId] = 'edit';
            this.setState({myFoodTruckStatus: updatedStatus});
        }
    };

    saveFoodTruckInfo = (foodTruckId) => {
        if (this.state.myFoodTruckStatus[foodTruckId] === 'edit') {
            const updatedStatus = {...this.state.myFoodTruckStatus};
            updatedStatus[foodTruckId] = 'disabled';
            this.setState({myFoodTruckStatus: updatedStatus});
            this.state.myFoodTrucks.forEach((foodTruck) => {
                if (foodTruck._id && foodTruck._id === foodTruckId) {
                    axios.patch(`/api/foodtruck/update/${foodTruckId}`, {
                        foodTruck: foodTruck
                    }).then(response => {
                        if (response.data === 'success') this.getMyFoodTruck();
                        else console.log('update food truck failed: ', response.data);
                    }).catch(error => {
                        console.log('update food truck failed: ', error);
                    });
                } else if (foodTruck.uuid && foodTruck.uuid === foodTruckId) {
                    axios.patch('/api/foodtruck/add', {
                        foodTruck: foodTruck
                    }).then(response => {
                        if (response.data === 'success') this.getMyFoodTruck();
                        else console.log('add food truck failed: ', response.data);
                    }).catch(error => {
                        console.log('add food truck failed: ', error);
                    });
                }
            });
        }
    };

    addMenuItem = (foodTruckId) => {
        if (this.state.myFoodTruckStatus[foodTruckId] !== 'disabled') {
            const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
            updatedFoodTruckInfo.forEach((foodTruck) => {
                if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) foodTruck.foodList.push({
                    name: undefined,
                    description: undefined,
                    unitPrice: undefined,
                    uuid: uuid()
                })
            });
            this.setState({myFoodTrucks: updatedFoodTruckInfo});
        }
    };

    removeMenuItem = (foodId, foodTruckId) => {
        if (this.state.myFoodTruckStatus[foodTruckId] !== 'disabled') {
            const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
            updatedFoodTruckInfo.forEach((foodTruck) => {
                if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                    foodTruck.foodList.forEach((food, i) => {
                        if ((food._id && food._id === foodId) || (food.uuid && food.uuid === foodId)) {
                            foodTruck.foodList.splice(i, 1);
                        }
                    });
                }
            });
            this.setState({myFoodTrucks: updatedFoodTruckInfo});
        }
    };

    addFoodTruck = () => {
        const newFoodTruck = {
            uuid: uuid(),
            name: undefined,
            status: undefined,
            averageWaitTime: undefined,
            description: undefined,
            foodList: [],
        };
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.push(newFoodTruck);
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
        const updatedStatus = {...this.state.myFoodTruckStatus};
        updatedStatus[newFoodTruck.uuid] = 'edit';
        this.setState({myFoodTruckStatus: updatedStatus});
    };

    removeFoodTruck = (foodTruckId) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck, i) => {
            if (foodTruck._id && foodTruck._id === foodTruckId) {
                axios.delete(`/api/foodtruck/delete/${foodTruckId}`)
                    .then(response => {
                        if (response.data === 'success') this.getMyFoodTruck();
                        else console.log('vendor delete food truck failed: ', response.data);
                    }).catch(error => {
                        console.log('vendor delete food truck failed: ', error);
                    });
            } else if (foodTruck.uuid && foodTruck.uuid === foodTruckId) {
                updatedFoodTruckInfo.splice(i, 1);
                this.setState({myFoodTrucks: updatedFoodTruckInfo});
                const updatedStatus = {...this.state.myFoodTruckStatus};
                delete updatedStatus[foodTruckId];
                this.setState({myFoodTruckStatus: updatedStatus});
            }
        });
    };

    handleChangeTruckName = (foodTruckId, newName) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.name = newName;
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeTruckStatus = (foodTruckId, newStatus) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.status = newStatus;
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeTruckAverageWaitTime = (foodTruckId, newAverageWaitTime) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.averageWaitTime = newAverageWaitTime;
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeTruckDescription = (foodTruckId, newDescription) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.description = newDescription;
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeFoodDescription = (foodTruckId, foodId, newDescription) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.foodList.forEach(food => {
                    if ((food._id && food._id === foodId) || (food.uuid && food.uuid === foodId)) {
                        food.description = newDescription;
                    }
                });
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeFoodName = (foodTruckId, foodId, newName) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.foodList.forEach(food => {
                    if ((food._id && food._id === foodId) || (food.uuid && food.uuid === foodId)) {
                        food.name = newName;
                    }
                });
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };

    handleChangeFoodPrice = (foodTruckId, foodId, newPrice) => {
        const updatedFoodTruckInfo = [...this.state.myFoodTrucks];
        updatedFoodTruckInfo.forEach((foodTruck) => {
            if ((foodTruck._id && foodTruck._id === foodTruckId) || (foodTruck.uuid && foodTruck.uuid === foodTruckId)) {
                foodTruck.foodList.forEach(food => {
                    if ((food._id && food._id === foodId) || (food.uuid && food.uuid === foodId)) {
                        food.unitPrice = newPrice;
                    }
                });
            }
        });
        this.setState({myFoodTrucks: updatedFoodTruckInfo});
    };


    render() {
        let myFoodTrucks = <Spinner/>;
        if (this.state.myFoodTrucks && Object.keys(this.state.myFoodTruckStatus).length === this.state.myFoodTrucks.length) {
            myFoodTrucks = (
                <Auxiliary>
                    {this.state.myFoodTrucks.map(foodTruck => {
                        return (
                            <div className="my-foodtrucks-truck-info"
                                 key={`${foodTruck._id ? foodTruck._id : foodTruck.uuid} + 1`}>
                                <div className="my-foodtrucks-info-header-container">
                                    <h3 className="my-foodtrucks-info-header">Truck Info </h3>
                                    <i className="my-foodtrucks-info-button fa fa-edit"
                                       onClick={() => {
                                           this.editFoodTruckInfo(foodTruck._id ? foodTruck._id : foodTruck.uuid)
                                       }}> edit</i>
                                    <i className="my-foodtrucks-info-button fa fa-save"
                                       onClick={() => {
                                           this.saveFoodTruckInfo(foodTruck._id ? foodTruck._id : foodTruck.uuid)
                                       }}> save</i>
                                    <i className="my-foodtrucks-info-button my-foodtrucks-delete-button fa fa-trash"
                                       onClick={() => {
                                           this.removeFoodTruck(foodTruck._id ? foodTruck._id : foodTruck.uuid)
                                       }}> delete</i>
                                </div>
                                <MyFoodTruck
                                    infoStatus={this.state.myFoodTruckStatus[foodTruck._id ? foodTruck._id : foodTruck.uuid]}
                                    foodTruck={foodTruck}
                                    handleChangeTruckName={this.handleChangeTruckName}
                                    handleChangeTruckStatus={this.handleChangeTruckStatus}
                                    handleChangeTruckAverageWaitTime={this.handleChangeTruckAverageWaitTime}
                                    handleChangeTruckDescription={this.handleChangeTruckDescription}
                                />
                                <div className="my-foodtrucks-info-header-container">
                                    <h3 className="my-foodtrucks-info-header">Menu Info </h3>
                                    <i className={`my-foodtrucks-info-button fa fa-plus ${this.state.myFoodTruckStatus[foodTruck._id ? foodTruck._id : foodTruck.uuid] === 'disabled' ? "my-foodtrucks-info-button-disabled" : ""}`}
                                       onClick={() => {
                                           this.addMenuItem(foodTruck._id ? foodTruck._id : foodTruck.uuid)
                                       }}> add</i>
                                </div>
                                <FoodTruckMenu
                                    infoStatus={this.state.myFoodTruckStatus[foodTruck._id ? foodTruck._id : foodTruck.uuid]}
                                    foodTruck={foodTruck}
                                    removeMenuItem={this.removeMenuItem}
                                    handleChangeFoodDescription={this.handleChangeFoodDescription}
                                    handleChangeFoodName={this.handleChangeFoodName}
                                    handleChangeFoodPrice={this.handleChangeFoodPrice}
                                />
                            </div>
                        );
                    })}
                    <button className="account-setting-button account-setting-button-color" onClick={() => {
                        this.addFoodTruck()
                    }}>
                        Add Another Truck
                    </button>
                </Auxiliary>
            )
        }
        return (
            <div className="my-foodtrucks-container">
                {myFoodTrucks}
            </div>
        );
    }
}

export default MyFoodTrucks;
