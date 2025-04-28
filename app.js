const express = require('express');
const app = express();
const path = require('path');
const homeRoutes = require('./routes/home');

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (css, images)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', homeRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
