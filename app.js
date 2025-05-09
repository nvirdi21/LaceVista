const express = require('express');
const app = express();
const path = require('path');
const homeRoutes = require('./routes/routes'); // ✅ Your only route file now
const bodyParser = require('body-parser'); 

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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
