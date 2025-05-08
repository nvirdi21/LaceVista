
  exports.getCartPage = (req, res) => {
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
  