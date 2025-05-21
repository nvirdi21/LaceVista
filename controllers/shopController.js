const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const { color, maxPrice } = req.query;

    const filter = {};
    console.log('color', color);
    // Case-insensitive color filter
    if (color) {
      filter.color = { $regex: new RegExp(`^${color}$`, 'i') };  // 'i' makes it case-insensitive
    }

    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    const products = await Product.find(filter);

    
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
};

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.render('admin/products', { products });
};

exports.newForm = (req, res) => {
  res.render('admin/newProduct');
};

exports.create = async (req, res) => {
  const { name, description, color, price, image } = req.body;
  await Product.create({ name, description, color, price, image });
  res.redirect('/admin/products');
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/editProduct', { product });
};

exports.update = async (req, res) => {
  const { name, description, color, price, image } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, description, color, price, image });
  res.redirect('/admin/products');
};

exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
};

exports.bulkUpdatePrice = async (req, res) => {
  const priceChange = parseFloat(req.body.priceChange);

  if (isNaN(priceChange)) {
    return res.status(400).send('Invalid price change value');
  }

  try {
    await Product.updateMany({}, { $inc: { price: priceChange } });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update prices');
  }
};

exports.getsneakers = (req, res) => {
  res.render('sneakers', {
    title: 'sneakers',
    stylesheet: 'sneakers',
    script: 'sneakers'
  });
}

exports.getheels = (req, res) => {
  res.render('heels', {
    title: 'heels',
    stylesheet: 'heels',
    script: 'heels'
  });
}

exports.getflats = (req, res) => {
  res.render('flats', {
    title: 'flats',
    stylesheet: 'flats',
    script: 'flats'
  });
}