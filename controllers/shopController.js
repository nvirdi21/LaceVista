const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch from DB

    res.render('shop', {
      title: 'Shop',
      stylesheet: 'shop',
      script: 'shop',
      productList: products
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
};
