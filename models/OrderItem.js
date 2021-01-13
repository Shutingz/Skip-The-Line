const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    name: String,
    unitPrice: Number,
    numberOrdered: Number,
    totalPrice: Number
});

module.exports = orderItemSchema;
