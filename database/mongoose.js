const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false);
module.exports = { mongoose };
