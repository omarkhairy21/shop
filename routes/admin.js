const path = require('path');

const express = require('express');

const router = express.Router();

const { getAddProduct,postAddProduct,
    getEditProduct,postEditProduct,getProducts,postDeleteProduct} = require('../controllers/admin');

//Admin/add-product by GET request
router.get('/add-product', getAddProduct);

//admin/products/ by GET request
router.get('/products', getProducts);

//admin/add-products by POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct);

router.post('/edit-product', postEditProduct);

router.post('/delete-product', postDeleteProduct);


module.exports = {router};