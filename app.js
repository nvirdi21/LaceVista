require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const http = require('http').createServer(app); // Create HTTP server manually
const io = require('socket.io')(http);          // Attach Socket.IO


// Route imports
// const pagesRoutes = require('./routes/pagesRoutes');
// const authRoutes = require('./routes/authRoutes');
// const shopRoutes = require('./routes/shopRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const chatBotRoutes = require('./routes/chatBotRoute');
const session = require('express-session'); // session
const cartController = require('./controllers/cartController');
// const orderRoutes = require('./routes/orderRoutes');
const router = express.Router();


app.use(session({
  secret: 'LaceVista@2025',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// === View Engine & Static Files ===
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/LaceVista', {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


// Dummy user (replace in real auth)
// app.use((req, res, next) => {
//   req.user = { _id: '663df0ea3b42cdcdf204f8a4' }; // your test user ID
//   next();
// });

router.get('/', cartController.getHomePage); // Home page route
module.exports = router;

// Middleware to inject cart count globally
app.use(async (req, res, next) => {
  if (!req.session.userId) {
    res.locals.cartCount = 0;
    return next();
  }

  try {
    const cart = await Cart.findOne({ userId: req.session.userId });
    res.locals.cartCount = cart
      ? cart.items.reduce((sum, item) => sum + item.qty, 0)
      : 0;
  } catch (err) {
    console.error('Cart middleware error:', err);
    res.locals.cartCount = 0;
  }

  next();
});

// === Routes ===
const pagesRoutes = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checkoutRoutes = require('./routes/checkout');
const chatBotRoutes = require('./routes/chatBotRoute');

// === Mount Routes ===
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', cartRoutes);
app.use('/', pagesRoutes);
app.use('/', orderRoutes);
app.use('/', checkoutRoutes);
app.use('/api', chatBotRoutes);

// === Start Server ===
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

