const express = require('express');
const app = express();
const pagesRoutes   = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine (if using EJS etc.)
app.set('view engine', 'ejs');


// Route mounting
app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes);
app.use('/', productRoutes);


app.listen(5000, () => console.log('Server started on port 5000'));
