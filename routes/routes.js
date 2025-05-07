const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController')

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Shop Page
router.get('/shop',  shopController.getShop);

// About Us Page 
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
