const Product = require('./model');

const store = async (req, res) => {
  try {
    let { name, description, price, category, tags } = req.body;
    tags = tags.split(',');
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

const index = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('tags');
    return res.status(200).json({
      message: 'Products fetched!',
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, index };