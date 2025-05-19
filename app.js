require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// === MongoDB Connection ===
mongoose.connect('mongodb://localhost:27017/LaceVista')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// === In-memory viewer tracking ===
const viewers = {}; // { productId: Set(socketId) }

// === Socket.IO Real-Time Logic ===
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  socket.viewingProducts = new Set();
  let activityTimer;

  function resetInactivityTimeout() {
    if (activityTimer) clearTimeout(activityTimer);

    activityTimer = setTimeout(() => {
      console.log('⏳ Socket inactive, cleaning up:', socket.id);
      if (socket.viewingProducts) {
        socket.viewingProducts.forEach(productId => {
          if (viewers[productId]) {
            viewers[productId].delete(socket.id);
            io.emit(`updateViewCount:${productId}`, viewers[productId].size);
            console.log(`🚫 Removed ${socket.id} from ${productId} after inactivity`);
          }
        });
      }
      socket.disconnect(); // Force disconnect after timeout
    }, 60000); // 60 seconds of inactivity
  }

  socket.on('viewingProduct', (productId) => {
    resetInactivityTimeout();

    if (!viewers[productId]) viewers[productId] = new Set();
    viewers[productId].add(socket.id);
    socket.viewingProducts.add(productId);

    io.emit(`updateViewCount:${productId}`, viewers[productId].size);
    console.log(`👁️ Product ${productId}: ${viewers[productId].size} viewers`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
    if (socket.viewingProducts) {
      socket.viewingProducts.forEach(productId => {
        viewers[productId]?.delete(socket.id);
        io.emit(`updateViewCount:${productId}`, viewers[productId].size);
        console.log(`👁️ Product ${productId}: ${viewers[productId].size} after disconnect`);
      });
    }
    clearTimeout(activityTimer);
  });
});


// === Middleware ===
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

// === Inject cart count middleware ===
const Cart = require('./models/cart'); // Ensure model exists
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
