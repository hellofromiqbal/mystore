const fs = require('fs');
const Product = require('./model');

const store = async (req, res) => {
  try {
    let { name, description, price, category, tags } = req.body;
    tags = tags.split(',');
    const imageFile = req.file;
    const newProduct = await Product.create({
      name, description, price, category, tags, image_url: imageFile.path
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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, description, price, category, tags } = req.body;
    tags = tags.split(',');

    const product = await Product.findById(id);
    const imageFile = req.file;
    if (imageFile) {
      fs.unlinkSync(product.image_url);
      product.image_url = imageFile.path;
    };

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.tags = tags.length > 0 ? tags : [];

    await product.save();

    return res.status(200).json({
      message: 'Product updated!',
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    fs.unlinkSync(product.image_url);
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Product deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

module.exports = { store, index, destroy, update };