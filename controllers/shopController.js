
exports.getShop = (req, res) => {
    res.render('shop', {
      title: 'Shop',
      stylesheet: 'shop', 
      script: 'shop'
    });
  };