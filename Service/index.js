const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/inventory_management';
const Schema = mongoose.Schema;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const router = express.Router();
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5001));
app.use('/api', router);
// const schema = require('./schema.js');
app.listen(app.get('port'), function () {
  console.log(' App is running on port ', app.get('port'));
});
mongoose.Promise = require('bluebird');

mongoose.connect(dbURL, function (error, success) {
  if (error) console.log(error);
  if (success) console.log('success');
});

const register = {
    '_id': { type: String, required: true },
    'email': { type: String, required: true},
    'password': { type: String, required: true}
};

const registerSchema = new Schema(register, {collection: 'user'});
const registration = mongoose.model('register', registerSchema);

const product = {
    '_id': { type: String, required: true },
    'price': { type: Number, required: true},
    'rating': { type: Number, required: true}
}

const productSchema = new Schema(product, {collection: 'products'});
const products = mongoose.model('products', productSchema);

router.post('/Accounts/register', (req, res) => {
   const data = req.body;
   const tempData = {
       _id: data.username,
       email: data.email,
       password: data.password
   }
   const registrationData = registration(tempData)
   registrationData.save({}, function(err, data) {
       if (err) {
           console.log(err);
           res.send({'message': 'some error occured'});
       }
       if (data) {
           console.log(data);
           res.send({'message': 'user registered successfully'});
       }
   });
});

router.post('/Accounts/login', (req, res) => {
    const reqData = req.body;
    registration.findById(reqData.username, function(err, data) {
        if (err) console.log(err);
        if (data) {
            console.log(data)
            if (data.password === reqData.password)
                res.send({'message': 'authenticated'});
            else
                res.send({'message': 'Incorrect credentials'});
        } else {
            res.send({'message': 'user not found'});
        }
    })
});

router.post('/Products/list', (req, res) => {
    const reqData = req.body;
    if (reqData.name) {
        products.findById(reqData.name, function(err, data) {
            if (err) console.log(err);
            if (data) {
                console.log(data)
                    res.send({'message': data});
            } else {
                res.send({'message': 'product not found'});
            }
        });
    } else {
     products.find({}, (err, data) => {
        if (err) console.log(err);
        if (data) {
            console.log(data);
            res.send({'message': data});
        } else {
            res.send({'message': 'no products found'});
        }
     })       
    }
 });

 router.post('/Products/add', (req, res) => {
    const data = req.body;
    const tempData = {
        _id: data.name,
        price: data.price,
        rating: data.rating
    }
    const productData = products(tempData)
    productData.save({}, function(err, data) {
        if (err) {
            console.log(err);
            res.send({'message': 'some error occured'});
        }
        if (data) {
            console.log(data);
            res.send({'message': 'product added successfully'});
        }
    });
 });

 router.post('/Products/edit', (req, res) => {
    const reqData = req.body;
    const payload = {
        _id: reqData.name,
        price: reqData.price,
        rating: reqData.rating
    }
    console.log(reqData);
    products.findByIdAndUpdate(reqData.name, payload, {new: true}, (err, data) => {
        if (err) {
            console.log(err);
            res.send({'message': 'some error occured'});
        }
        if (data) {
            console.log(data);
            res.send({'message': 'product updated successfully'});
        }
    });
 });

 router.post('/Products/delete', (req, res) => {
    const reqData = req.body;
    products.findByIdAndRemove(reqData.name, (err, data) => {
        if (err) {
            console.log(err);
            res.send({'message': 'some error occured'});
        } else if (data) {
            console.log(data);
            res.send({'message': 'product removed successfully'});
        }
    });
 });