const path = require('path')

const express = require('express');

const rootDir = require('../util/path');

const {products} = require('./admin');

const router = express.Router();


router.get('/',(req, res, next) =>{
  
    res.render('shop',{
        prods: products,
        pageTitle : 'Shop',
        path: '/',
        hasProducts: products.length > 0
    });
});

module.exports = router;