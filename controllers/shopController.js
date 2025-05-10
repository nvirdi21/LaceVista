
exports.getShop = (req, res) => {
  const cartItems = [
    { id: 1, name: "Nike Air Max", image:"/images/shoe1.jpg" , description: "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.",  price: 120, quantity: 2, color: "black", size: 7 },
    { id: 2, name: "Adidas UltraBoost", image:"/images/shoe1.jpg",description: "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.", price: 150, quantity: 1, color: "red", size: 4 },
    { id: 3, name: "Adidas UltraBoost2", image:"/images/shoe1.jpg",description: "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.", price: 150, quantity: 1, color: "red", size: 4 },
    { id: 4, name: "Adidas UltraBoost3", image:"/images/shoe1.jpg",description: "I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.", price: 150, quantity: 1, color: "red", size: 4 },
  ];

    res.render('shop', {
      title: 'Shop',
      stylesheet: 'shop', 
      script: 'shop',
      cartItems
    });
    console.error('Cart:', cartItems);
  };