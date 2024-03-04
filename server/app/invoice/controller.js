const Invoice = require('./model');
const User = require('../user/model');
// const Product = require('../product/model');
const CartItem = require('../cartItem/model');

const store = async (req, res) => {
  try {
    const { userId, selectedAddress } = req.body;
    const user = await User.findById(userId);

    const cartItems = await CartItem.find({ _id: { $in: user.cart } });
    const items = cartItems.map(cartItem => ({
      product: cartItem.product,
      amount: cartItem.amount
    }));

    await CartItem.deleteMany({ _id: { $in: user.cart } });

    const newInvoice = await Invoice.create({
      user: userId,
      items,
      selectedAddress,
    });

    await User.findByIdAndUpdate(userId, {
      $set: { cart: [] },
      $push: { invoices: newInvoice.id }
    });
    
    return res.status(200).json({
      message: 'Checkout success. Please make a payment so we can proceed to the delivering process.',
      data: newInvoice
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store };