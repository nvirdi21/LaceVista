// Shop Page
// routes/pagesRoutes.js
const express = require('express');
const router  = express.Router();
router.get('/shop',  shopController.getShop);
module.exports = router;