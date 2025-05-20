const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getHomePage = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.session.userId });

    const cartCount = cart?.items?.reduce((total, item) => total + item.qty, 0) || 0;

    res.render('home', { cartCount });
  } catch (err) {
    console.error('Error fetching cart count:', err);
    res.render('home', { cartCount: 0 });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.session.userId;

    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || !cart.items.length) {
      return res.render('cart', { cartItems: [], totalCost: 0 });
    }

    // Filter out items where the product reference is missing
    const validItems = cart.items.filter(item => item.productId);

    // Optional: Save cleaned-up cart
    if (validItems.length !== cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const cartItems = validItems.map(item => {
      const product = item.productId;
      return {
        id: product._id,
        name: product.name,
        image: product.image,
        color: product.color,
        price: product.price,
        quantity: item.qty
      };
    });

    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    res.render('cart', { cartItems, totalCost });
  } catch (err) {
    console.error('Error loading cart:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, qty: 1 }]
      });
    } else {
      const existingItem = cart.items.find(
        item => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({ productId, qty: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.redirect('/cart');
    }

    // Remove the item by filtering it out
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
    res.redirect('/cart');
  } catch (err) {
    console.error('Error removing item from cart:', err);
    res.status(500).send('Failed to remove item from cart');
  }
};