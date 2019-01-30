const path = require('path');

const express = require('express');

const router = express.Router();

const {getAddProduct,postAddProduct} = require('../controllers/admin');

//Admin/add-product by GET request
router.get('/add-product', getAddProduct);
//admin/products/ by GET request
router.get('/products');
//admin/add-products by POST
router.post('/add-product', postAddProduct);



module.exports = {router};