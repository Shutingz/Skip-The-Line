const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderItemSchema = require('./OrderItem');

const orderHistorySchema = new Schema({
    time: Date,
    total: Number,
    orderItems: [orderItemSchema],
    status: { type: String, default: 'pending' },
    customer: {
        _id: String,
        name: String,
        available: { type: Boolean, default: true }
    },
    foodTruck: {
        _id: String,
        name: String,
        owner: String,
        available: { type: Boolean, default: true }
    }
});

mongoose.model('orderHistory', orderHistorySchema);
