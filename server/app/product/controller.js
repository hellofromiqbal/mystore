const Product = require('./model');

const store = async (req, res) => {
  try {
    const { name, description, price, category, tags } = req.body;
    const newProduct = await Product.create({
      name, description, price, category, tags
    });

    return res.status(201).json({
      message: 'New product created!',
      data: newProduct
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store };