const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: String,
    description: String,
    unitPrice: Number,
    _foodTruckId: String
});
mongoose.model('food', foodSchema);
module.exports = foodSchema;
