const User = require('../user/model');
const CartItem = require('./model');

const store = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const newCartItem = await CartItem.create({
      user: userId,
      product: productId,
    });

    await User.findByIdAndUpdate(userId, {
      $push: { cart: newCartItem._id }
    });

    return res.status(201).json({
      message: 'Added to Cart.',
      data: newCartItem
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

const destroy = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId).populate('cart');
    
    const cartItemToBeRemoved = user.cart.find((cartItem) => cartItem.product.toString() === productId);

    user.cart = user.cart.filter((cartItem) => cartItem.product.toString() !== productId);
    user.save();

    await CartItem.findByIdAndDelete(cartItemToBeRemoved._id);
    
    return res.status(200).json({
      message: 'Item removed from Cart.'
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, destroy };