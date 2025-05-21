// routes/pagesRoutes.js
const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/homeController');
const shopController = require('../controllers/shopController');

router.get('/',  homeController.getHome);
router.get('/about',  homeController.getAbout);
router.get('/menInfoSneakers', (req, res) => {
    res.render('menInfoSneakers', {
        title: 'menInfoSneakers',
        stylesheet: 'menInfoSneakers', 
        // script: 'menInfoSneakers'
      });
});

router.get('/sneakers', shopController.getsneakers)
router.get('/heels', shopController.getheels)
router.get('/flats', shopController.getflats)

router.get('/menInfoSports', (req, res) => {
    res.render('menInfoSports', {
        title: 'menInfoSports',
        stylesheet: 'menInfoSports', 
       
      });
});

router.get('/menInfoFormals', (req, res) => {
    res.render('menInfoFormals', {
        title: 'menInfoFormals',
        stylesheet: 'menInfoFormals', 
      });
});

module.exports = router;


