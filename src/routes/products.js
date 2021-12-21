const express = require('express');
const router = express.Router();

const productsController = require('../contollers/products');

router.get('/product', productsController.createProduct);

module.exports = router;
