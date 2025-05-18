const Order = require('../models/order');
const Cart = require('../models/cart');

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deleted: false })
      .populate('userId')
      .populate('items.productId');    
    
    res.render('admin/orders', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch orders');
  }
};

exports.softDeleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { deleted: true });
    res.redirect('/admin/orders');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete order');
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = req.session.user;

    if (!userId || !user) return res.status(401).send('Unauthorized');

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).send('Cart is empty');
    }

    const {
      length,
      width,
      arch,
      address,
      city,
      zip,
      country,
      card,
      expiry,
      cvv
    } = req.body;

    const newOrder = new Order({
      userId,
      shoe_length: length,
      shoe_width: width,
      shoe_arch: arch,
      user_address: address,
      user_city: city,
      user_zipcode: zip,
      user_country: country,
      cc_no: card,
      cc_expiry: expiry,
      cc_cvv: cvv,
      items: cart.items.map(item => ({
        productId: item.productId,
        qty: item.qty
      }))
    });

    await newOrder.save();
    await Cart.deleteOne({ userId });

    res.render('order-success', {
      firstName: user.first_name,
      lastName: user.last_name 
    });
  } catch (err) {
    console.error('Order Placement Error:', err);
    res.status(500).send('Failed to place order');
  }
};