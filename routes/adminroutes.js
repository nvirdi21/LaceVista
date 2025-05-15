const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.');

// Admin route to view orders
router.get('/admin/orders', orderController.getAllOrders);

module.exports = router;
