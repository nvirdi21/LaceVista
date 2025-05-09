// Cart Page
// routes/pagesRoutes.js
const express = require('express');
const router  = express.Router();

const cartController = require('../controllers/cartController');
router.get('/cart',  cartController.getCartPage);

router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router;