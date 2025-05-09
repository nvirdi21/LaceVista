const express = require('express');
const app = express();
const path = require('path');
const pagesRoutes   = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRoutes); // ✅ Handles all pages + /api/chat

// Route mounting
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', cartRoutes);
app.use('/', pagesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
