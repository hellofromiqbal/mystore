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
      message: 'Added to cart!',
      data: newCartItem
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store };