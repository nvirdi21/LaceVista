const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Shop Page
router.get('/shop', (req, res) => {
  res.render('shop');
});

// About Us Page 
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
