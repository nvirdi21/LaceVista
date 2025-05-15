const Order = require('../models/orderModel');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.render('admin-orders', { orders }); // Pass orders to admin view
  } catch (err) {
    res.status(500).send('Error fetching orders');
  }
};
