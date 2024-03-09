const Invoice = require('./model');
const User = require('../user/model');
// const Product = require('../product/model');
const CartItem = require('../cartItem/model');

const store = async (req, res) => {
  try {
    const { userId, selectedAddress } = req.body;
    const user = await User.findById(userId);

    const cartItems = await CartItem.find({ _id: { $in: user.cart } })
      .populate({
        path: 'product',
        select: '-__v -createdAt -updatedAt'
      });
    const items = cartItems.map(cartItem => ({
      productId: cartItem.product._id,
      productName: cartItem.product.name,
      amount: cartItem.amount,
      price: cartItem.product.price
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

    await User.findOneAndUpdate({ role: 'admin' }, {
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

const index = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    let invoices;
    if(user.role === 'admin') {
      invoices = await Invoice.find()
        .populate({
          path: 'user',
          select: '-__v -email -password -address -cart -invoices -createdAt -updatedAt'
        })
        .populate({
          path: 'items',
          populate: [
            {
              path: 'product',
              select: '-__v -category -tags -description -createdAt -updatedAt'
            }
          ]
        });
    } else {
      invoices = await Invoice.find({ user: id })
        .populate({
          path: 'user',
          select: '-__v -email -password -address -cart -invoices -createdAt -updatedAt'
        })
        .populate({
          path: 'items',
          populate: [
            {
              path: 'product',
              select: '-__v -category -tags -description -createdAt -updatedAt'
            }
          ]
        });
    };
    return res.status(200).json({
      message: 'Invoices fetched!',
      data: invoices
    });
  } catch (error) {
    
  }
};

module.exports = { store, index };