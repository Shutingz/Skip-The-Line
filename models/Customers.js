const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: String,
    password: String,
    type: {type: String, default: 'customer'},
    accountStatus: {type: String, default: 'active'}
});

mongoose.model('customer', customerSchema);
