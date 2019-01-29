const path = require('path')

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const {getProducts} = require('../controllers/product');

router.get('/', getProducts);

module.exports = router;