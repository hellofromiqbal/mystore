const Invoice = require('./model');
const User = require('../user/model');

const store = async (req, res) => {
  try {
    const { userId, selectedAddress } = req.body;
    const newInvoice = await Invoice.create({ user: userId, selectedAddress });
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