const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');
const ProductController = require('../controllers/products');

router.get('/',ProductController.get_all_products);

router.post('/',ProductController.add_product);

router.get('/:productId',ProductController.find_product_by_id);

router.patch('/:productId',ProductController.update_product);

router.delete('/:productId',ProductController.remove_product);

module.exports = router;