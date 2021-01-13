const {mongoose} = require('../database/mongoose');
const Customer = mongoose.model('customer');
const Admin = mongoose.model('admin');
const Vendor = mongoose.model('vendor');
module.exports = app => {
    app.patch('/api/account/password', (req, res) => {
        Promise.all([
            Customer.findById(req.body.id),
            Admin.findById(req.body.id),
            Vendor.findById(req.body.id)]).then(result => {
            const user = result.find(r => r);
            if (!user) res.send('user not logged in');
            else if (user.password !== req.body.oldPassword) res.send('wrong password');
            else {
                user.password = req.body.newPassword;
                user.save().then(() => {
                    res.send('success');
                }, (error) => {
                    res.status(500).send(error);
                });
            }
        }, (error) => {
            res.status(400).send(error) // 400 for bad request
        })
    });
};
