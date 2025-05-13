// routes/pagesRoutes.js
const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/homeController');

router.get('/',  homeController.getHome);
router.get('/about',  homeController.getAbout);
router.get('/menInfoSneakers', (req, res) => {
    res.render('menInfoSneakers', {
        title: 'menInfoSneakers',
        stylesheet: 'menInfoSneakers', 
        // script: 'menInfoSneakers'
      });
});

module.exports = router;


