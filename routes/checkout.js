// routes/checkout.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// // GET checkout page
// router.get('/checkout', (req, res) => {
//   res.render('checkout');
// });

// GET checkout page with user info
router.get('/checkout', (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  const { first_name, last_name } = req.session.user;
  res.render('checkout', { firstName: first_name, lastName: last_name });
});

// POST order
router.post('/place-order', orderController.placeOrder);

module.exports = router;
