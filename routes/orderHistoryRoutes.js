const {mongoose} = require('../database/mongoose');
const OrderHistory = mongoose.model('orderHistory');
const Vendor = mongoose.model('vendor');
module.exports = app => {
    app.post('/api/orderHistory/add', (req, res) => {
        const {selectedFood, foodTruckId} = req.body;

        Vendor.find().then((vendors) => {
            let targetFoodTruck = null;
            let foodTruckOwner = null;
            vendors.forEach((vendor) => {
                vendor.foodTrucks.forEach((foodTruck) => {
                    if (foodTruck.id === foodTruckId) {
                        targetFoodTruck = foodTruck;
                        foodTruckOwner = vendor.name;
                    }
                })
            });

            const orderItems = [];
            Object.keys(selectedFood).forEach(foodId => {
                targetFoodTruck.foodList.forEach(food => {
                    if (food.id === foodId) {
                        const orderItemObj = {
                            name: food.name,
                            unitPrice: food.unitPrice,
                            numberOrdered: selectedFood[foodId],
                            totalPrice: selectedFood[foodId] * food.unitPrice
                        };
                        orderItems.push(orderItemObj);
                    }
                })
            });

            let orderTotal = 0;
            orderItems.forEach((orderItem) => {
                orderTotal += orderItem.totalPrice;
            });
            const newOrder = new OrderHistory({
                time: Date.now(),
                total: orderTotal,
                orderItems: orderItems,
                customer: {
                    _id: req.session.user,
                    name: req.session.name
                },
                foodTruck: {
                    _id: foodTruckId,
                    name: targetFoodTruck.name,
                    owner: foodTruckOwner,
                }
            });

            newOrder.save().then((order) => {
                res.send('success');
            }, (error) => {
                res.status(400).send(error) // 400 for bad request
            })

        }, (error) => {
            res.status(500).send(error) // server error
        });


    });

    app.get('/api/orderHistory/all', (req, res) => {
        if (req.session.type === 'admin') {
            OrderHistory.find().then((allOrderHistory) => {
                res.send(allOrderHistory);
            }, (error) => {
                res.status(500).send(error) // server error
            })
        } else {
            OrderHistory.find().then((allOrderHistory) => {
                const orderHistory = [];
                allOrderHistory.forEach(order => {
                    if (req.session.type === 'vendor') {
                        if (order.foodTruck.owner === req.session.name && order.foodTruck.available) orderHistory.push(order);
                    } else if (req.session.type === 'customer') {
                        if (order.customer.name === req.session.name && order.customer.available) orderHistory.push(order);
                    }
                });
                res.send(orderHistory);
            }, (error) => {
                res.status(500).send(error) // server error
            })
        }
    });

    app.patch('/api/orderHistory/disable/:orderId/', (req, res) => {
        OrderHistory.findById(req.params.orderId).then((order) => {
            if (req.session.type === 'vendor') order.foodTruck.available = false;
            else order.customer.available = false;
            order.save().then(order => {
                res.send('success');
            }, (error) => {
                res.status(500).send(error);
            });
        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.patch('/api/orderHistory/status/:orderId/:newStatus', (req, res) => {
        OrderHistory.findById(req.params.orderId).then((order) => {
            order.status = req.params.newStatus;
            order.save().then(order => {
                res.send('success');
            }, (error) => {
                res.status(500).send(error);
            });

        }, (error) => {
            res.status(500).send(error) // server error
        })
    });

    app.delete('/api/orderHistory/remove/:orderId', (req, res) => {
        OrderHistory.findOneAndDelete({_id: req.params.orderId}).then((order) => {
            res.send('success');
        }, (error) => {
            res.status(500).send(error) // server error
        });
    });
};
