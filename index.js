const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./models/Admins');
require('./models/Customers');
require('./models/Vendors');
require('./models/OrderHistory');

const app = express();
app.use(session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3, // 3 hours
    }
}));
app.use(bodyParser.json());
require('./routes/authRoutes')(app);
require('./routes/foodTruckRoutes')(app);
require('./routes/foodTruckRoutes')(app);
require('./routes/orderHistoryRoutes')(app);
require('./routes/accountSettingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
