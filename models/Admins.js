const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: String,
    password: String,
    type: {type: String, default: 'admin'},
    accountStatus: {type: String, default: 'active'}
});

mongoose.model('admin', adminSchema);
