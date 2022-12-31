const express = require('express');
const routePath = express.Router();
const customerPath = require('../controllers/customer');
const productPath = require('../controllers/products');

// customer 
routePath.post('/register', customerPath.register);
routePath.post('/login', customerPath.login);
routePath.post('/forgotpassword', customerPath.forgotPassword);
// customer 
routePath.post('/addproduct',productPath.addProduct)
// products

// products


module.exports = { routePath };