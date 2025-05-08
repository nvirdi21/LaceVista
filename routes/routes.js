const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const cartController = require('../controllers/cartController');

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Shop Page
router.get('/shop',  shopController.getShop);

// Cart Page
router.get('/cart',  cartController.getCartPage);

// About Us Page 
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
