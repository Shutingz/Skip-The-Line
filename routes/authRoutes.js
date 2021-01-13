const { mongoose } = require('../database/mongoose');
const Customer = mongoose.model('customer');
const Admin = mongoose.model('admin');
const Vendor = mongoose.model('vendor');
module.exports = app => {
    app.post('/api/customer/signUp', (req, res) => {
        Promise.all([
            Customer.findOne({ name: req.body.name}),
            Admin.findOne({ name: req.body.name}),
            Vendor.findOne({ name: req.body.name})]).then(result => {
            const user = result.find(r => r);
            if (user) res.send('user name taken');
            else {
                const newCustomer = new Customer({
                    name: req.body.name,
                    password: req.body.password,
                });
                newCustomer.save().then((user) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error) // 400 for bad request
                });
            }
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })
    });

    app.post('/api/vendor/signUp', (req, res) => {
        Promise.all([
            Customer.findOne({ name: req.body.name}),
            Admin.findOne({ name: req.body.name}),
            Vendor.findOne({ name: req.body.name})]).then(result => {
            const user = result.find(r => r);
            if (user) res.send('user name taken');
            else {
                const newVendor = new Vendor({
                    name: req.body.name,
                    password: req.body.password,
                    foodTrucks: []
                });
                newVendor.save().then((user) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error) // 400 for bad request
                });
            }
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })
    });

    app.post('/api/users/login', (req, res) => {
        Promise.all([
            Customer.findOne({ name: req.body.name}),
            Admin.findOne({ name: req.body.name}),
            Vendor.findOne({ name: req.body.name})]).then(result => {
                const user = result.find(r => r);
                if (!user) res.send('bad user name');
                else if (user.accountStatus !== 'active') res.send('account no longer valid');
                else if (user.password !== req.body.password) res.send('bad password');
                else {
                    req.session.user = user.id;
                    req.session.name = user.name;
                    req.session.type = user.type;
                    res.send(user);
                }
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })
    });

    app.get('/api/users/session', (req, res) => {
        if (req.session.user) res.send({ id: req.session.user, name: req.session.name, type: req.session.type });
        else res.send('not logged in');
    });

    app.get('/api/users/logout', (req, res) => {
        req.session.destroy((error) => {
            if (error) res.status(500).send(error);
            else res.send('logged out!');
        })
    });

    app.get('/api/users/get/all', (req, res) => {
        Promise.all([
            Customer.find(),
            Admin.find(),
            Vendor.find()]).then(result => {
                const allUsers = [].concat.apply([], result);
                res.send(allUsers);
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })
    });

    app.delete('/api/users/delete/:userId/:userType', (req, res) => {
        if (req.params.userType === 'customer') {
            Customer.findOneAndDelete({_id: req.params.userId}).then((user) => {
                res.send('success');
            }, (error) => {
                res.status(500).send(error) // server error
            });
        } else if (req.params.userType === 'vendor') {
            Vendor.findOneAndDelete({_id: req.params.userId}).then((user) => {
                res.send('success');
            }, (error) => {
                res.status(500).send(error) // server error
            });
        }
        // Cannot delete admin
    });

    app.patch('/api/users/status/:userId/:userType/:newStatus', (req, res) => {
        if (req.params.userType === 'customer') {
            Customer.findById(req.params.userId).then((user) => {
                user.accountStatus = req.params.newStatus;
                user.save().then((user) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error) // 400 for bad request
                });
            }, (error) => {
                res.status(500).send(error) // server error
            });
        } else if (req.params.userType === 'vendor') {
            Vendor.findById(req.params.userId).then((user) => {
                user.accountStatus = req.params.newStatus;
                user.save().then((user) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error) // 400 for bad request
                });
            }, (error) => {
                res.status(500).send(error) // server error
            });
        } else if (req.params.userType === 'admin') {
            Admin.findById(req.params.userId).then((user) => {
                user.accountStatus = req.params.newStatus;
                user.save().then((user) => {
                    res.send('success');
                }, (error) => {
                    res.status(400).send(error) // 400 for bad request
                });
            }, (error) => {
                res.status(500).send(error) // server error
            });
        }
    });
};
