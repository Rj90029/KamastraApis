const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/orders')
const Product = require('../models/products');
const OrdersController = require('../controllers/orders');

router.get('/',OrdersController.get_all_orders);

router.post('/',OrdersController.create_orders);

router.get('/:orderId',OrdersController.find_order_by_id);

router.delete('/:orderId',OrdersController.delete_order);

module.exports = router;