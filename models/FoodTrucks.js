const mongoose = require('mongoose');
const { Schema } = mongoose;
const foodSchema = require('./Food');

const foodTruckSchema = new Schema({
    name: String,
    status: { type: String, default: 'closed' },
    averageWaitTime: String,
    description: String,
    foodList: [foodSchema],
    _ownerId: String
});

mongoose.model('foodTruck', foodTruckSchema);
module.exports = foodTruckSchema;
