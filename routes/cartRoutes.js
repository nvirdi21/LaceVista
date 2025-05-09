// Cart Page
router.get('/cart',  cartController.getCartPage);

router.get('/about', (req, res) => {
  res.render('about');
});


module.exports = router;