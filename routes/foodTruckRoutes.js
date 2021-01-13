const {mongoose} = require('../database/mongoose');
const Vendor = mongoose.model('vendor');
const FoodTruck = mongoose.model('foodTruck');
const Food = mongoose.model('food');
module.exports = app => {
    app.patch('/api/foodtruck/add', (req, res) => {
        Vendor.findById(req.session.user, (err, vendor) => {
            if (!err && vendor) {
                const {foodTruck} = req.body;
                foodTruck.foodList.forEach((food) => {
                    if (food.uuid) delete food.uuid;
                });
                let newFoodTruck;
                if (foodTruck.status === 'open' || foodTruck.status === 'closed') {
                    newFoodTruck = new FoodTruck({
                        name: foodTruck.name,
                        averageWaitTime: foodTruck.averageWaitTime,
                        description: foodTruck.description,
                        foodList: foodTruck.foodList,
                        _ownerId: req.session.user,
                        status: foodTruck.status
                    });
                } else {
                    newFoodTruck = new FoodTruck({
                        name: foodTruck.name,
                        averageWaitTime: foodTruck.averageWaitTime,
                        description: foodTruck.description,
                        foodList: foodTruck.foodList,
                        _ownerId: req.session.user,
                    });
                }
                vendor.foodTrucks.push(newFoodTruck);
                vendor.save().then((vendor) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error);
                })
            } else {
                if (err) res.send(err);
                else res.send('cannot find vendor');
            }
        });
    });

    app.patch('/api/foodtruck/update/:truckId', (req, res) => {
        Vendor.findById(req.session.user, (err, vendor) => {
            if (!err && vendor) {
                const {foodTruck} = req.body;
                foodTruck.foodList.forEach((food) => {
                    if (food.uuid) delete food.uuid;
                });

                const updatedFoodTruck = vendor.foodTrucks.id(req.params.truckId);
                updatedFoodTruck.name = foodTruck.name;
                updatedFoodTruck.averageWaitTime = foodTruck.averageWaitTime;
                updatedFoodTruck.description = foodTruck.description;
                updatedFoodTruck.foodList = foodTruck.foodList;
                if (foodTruck.status === 'open' || foodTruck.status === 'closed') {
                    updatedFoodTruck.status = foodTruck.status;
                }

                vendor.save().then((vendor) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error);
                })
            } else {
                if (err) res.send(err);
                else res.send('cannot find vendor');
            }
        });
    });

    app.delete('/api/foodtruck/delete/:truckId', (req, res) => {
        Vendor.findById(req.session.user, (err, vendor) => {
            if (!err && vendor) {
                vendor.foodTrucks.forEach((truck, i) => {
                    if (truck.id === req.params.truckId) vendor.foodTrucks.splice(i, 1)
                });
                vendor.save().then((v) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error);
                })
            } else {
                if (err) res.send(err);
                else res.send('cannot find vendor');
            }
        });
    });

    app.delete('/api/foodtruck/delete/:ownerId/:truckId', (req, res) => {
        Vendor.findById(req.params.ownerId, (err, vendor) => {
            if (!err && vendor) {
                vendor.foodTrucks.forEach((truck, i) => {
                    if (truck.id === req.params.truckId) vendor.foodTrucks.splice(i, 1)
                });
                vendor.save().then((v) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error);
                })
            } else {
                if (err) res.send(err);
                else res.send('cannot find vendor');
            }
        });
    });

    app.get('/api/foodtruck/get/all', (req, res) => {
        Vendor.find().then((vendors) => {
            const foodTrucksOpen = [];
            const foodTrucksClosed = [];
            vendors.forEach((vendor) => {
                if (vendor.accountStatus === 'active') {
                    vendor.foodTrucks.forEach((foodTruck) => {
                        if (foodTruck.status === 'open') foodTrucksOpen.push(foodTruck);
                        else foodTrucksClosed.push(foodTruck);
                    })
                }
            });
            const allFoodTrucks = foodTrucksOpen.concat(foodTrucksClosed);
            res.send(allFoodTrucks);
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.get('/api/foodtruck/get/:id', (req, res) => {
        Vendor.find().then((vendors) => {
            let targetFoodTruck = null;
            vendors.forEach((vendor) => {
                vendor.foodTrucks.forEach((foodTruck) => {
                    if (foodTruck.id === req.params.id) targetFoodTruck = foodTruck;
                })
            });
            res.send(targetFoodTruck);
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.get('/api/foodtruck/filter/:keyWord', (req, res) => {
        Vendor.find().then((vendors) => {
            const targetFoodTrucks = [];
            vendors.forEach((vendor) => {
                vendor.foodTrucks.forEach((foodTruck) => {
                    if (foodTruck.name.toLowerCase().includes(req.params.keyWord.toLowerCase())) targetFoodTrucks.push(foodTruck);
                })
            });
            res.send(targetFoodTrucks);
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.get('/api/foodtruck/filter/:truckId/:keyWord', (req, res) => {
        Vendor.find().then(vendors => {
            const targetFood = [];
            vendors.forEach(vendor => {
                vendor.foodTrucks.forEach(foodTruck => {
                    if (foodTruck.id === req.params.truckId) {
                        foodTruck.foodList.forEach(food => {
                            if (food.name.toLowerCase().includes(req.params.keyWord.toLowerCase())) targetFood.push(food);
                        });
                    }
                })
            });
            res.send(targetFood);
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.get('/api/foodtruck/myTrucks', (req, res) => {
        Vendor.findById(req.session.user).then(vendor => {
            res.send(vendor.foodTrucks);
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });
};
