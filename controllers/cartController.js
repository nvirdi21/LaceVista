
  exports.getCart = (req, res) => {
    const cartItems = [
      { id: 1, name: "Nike Air Max", image:"/images/shoe1.jpg" , price: 120, quantity: 2, color: "black", size: 7 },
      { id: 2, name: "Adidas UltraBoost", image:"/images/shoe1.jpg", price: 150, quantity: 1, color: "red", size: 4 },
    ];
  
    const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    res.render('cart', { title: 'Cart',
        stylesheet: 'cart', 
        script: 'cart',
        cartItems, 
        totalCost });
  };

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
  
  