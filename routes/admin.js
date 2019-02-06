const path = require('path');

const express = require('express');

const router = express.Router();

const {getAddProduct,postAddProduct,getEditProduct,getProducts} = require('../controllers/admin');

//Admin/add-product by GET request
router.get('/add-product', getAddProduct);

//admin/products/ by GET request
router.get('/products', getProducts);

//admin/add-products by POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);


module.exports = {router};