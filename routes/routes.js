const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('home');
});

// Shop Page
router.get('/shop',  shopController.getShop);

// Cart Page
router.get('/cart',  cartController.getCartPage);

router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router;
