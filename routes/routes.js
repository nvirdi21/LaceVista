// routes/routes.js
const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController'); // ✅ imported

// Pages
router.get('/', (req, res) => res.render('home'));
router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));
router.post('/register', (req, res) => {
  console.log(req.body);
  res.redirect('/login');
});
router.get('/about', (req, res) => res.render('about'));
router.get('/shop', (req, res) => res.render('shop'));

// ✅ Chatbot route uses controller logic
router.post('/api/chat', chatbotController.handleChat);

module.exports = router;
