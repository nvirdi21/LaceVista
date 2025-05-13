// routes/checkout.js
const express = require('express');
const router = express.Router();

// GET checkout page
router.get('/checkout', (req, res) => {
  res.render('checkout');
});

module.exports = router;
