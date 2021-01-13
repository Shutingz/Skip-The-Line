const mongoose = require('mongoose');
const { Schema } = mongoose;
const foodTruckSchema = require('./FoodTrucks');

const vendorSchema = new Schema({
    name: String,
    password: String,
    type: {type: String, default: 'vendor'},
    accountStatus: {type: String, default: 'active'},
    foodTrucks: [foodTruckSchema]
});

mongoose.model('vendor', vendorSchema);
