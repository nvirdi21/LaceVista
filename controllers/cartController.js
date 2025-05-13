const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getHomePage = async (req, res) => {
  try {
    // Assuming the user is logged in and we have access to their user ID
    const cart = await Cart.findOne({ userId: req.session.userId });
    const cartCount = cart
      ? cart.items.reduce((total, item) => total + item.qty, 0)
      : 0;

    // Render the homepage and pass the cartCount to the view
    res.render('home', { cartCount: cartCount });
  } catch (err) {
    console.error('Error fetching cart count:', err);
    res.render('home', { cartCount: 0 }); // Default to 0 if error occurs
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.session.userId; // assumes user is authenticated and available

    // Populate product info inside cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.render('cart', { cartItems: [], totalCost: 0 });
    }

    const cartItems = cart.items.map(item => {
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
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.addToCart = async (req, res) => {
  try {    
    // console.log('Reach to AddToCart');
    const userId = req.session.userId; // Assume user ID stored in session
    // console.log('Logging User ID:', req.session.userId)
    const { productId } = req.body;
    // console.log('Product Body:', req.body);
    let cart = await Cart.findOne({ userId });
    // console.log('Found Existing Data:', cart);
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, qty: 1 }]
      });
      // console.log('Add New Card Data:', cart);
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
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

  
  
  
  // exports.getCart = (req, res) => {
  //   const cartItems = [
  //     { id: 1, name: "Nike Air Max", image:"/images/shoe1.jpg" , price: 120, quantity: 2, color: "black", size: 7 },
  //     { id: 2, name: "Adidas UltraBoost", image:"/images/shoe1.jpg", price: 150, quantity: 1, color: "red", size: 4 },
  //   ];
  
  //   const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  //   res.render('cart', { title: 'Cart',
  //       stylesheet: 'cart', 
  //       script: 'cart',
  //       cartItems, 
  //       totalCost });
  // };

  // app.get('/cart', (req, res) => {
  //   const cartItems = req.session.cart || [];
  //   const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  //   res.render('cart', { cartItems, totalCost });
  // });

  // app.post('/cart/add', (req, res) => {
  //   const { id, name, price, image, color, size } = req.body;
  
  //   if (!req.session.cart) req.session.cart = [];
  
  //   const existingItem = req.session.cart.find(item => item.id === id && item.size === size && item.color === color);
  
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //   } else {
  //     req.session.cart.push({
  //       id,
  //       name,
  //       price: parseFloat(price),
  //       image,
  //       color,
  //       size,
  //       quantity: 1
  //     });
  //   }
  
  //   res.redirect('/cart');
  // });
  
  