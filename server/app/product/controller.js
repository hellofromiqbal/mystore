const fs = require('fs');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');

const store = async (req, res) => {
  try {
    let payload = req.body;
    if(payload.tags && payload.tags.length > 0) {
      payload = { ...payload, tags: payload.tags };
    };
    const imageFile = req.file;
    console.log(imageFile);
    const newProduct = await Product.create({
      ...payload,
      image_url: imageFile.path
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
    const {
      skip = 0,
      limit = 10,
      q = '',
      id = '',
      category = '',
      tags = []
    } = req.query;

    let criteria = {};

    if(q.length) {
      criteria = {
        ...criteria,
        name: { $regex: `${q}`, $options: 'i' }
      };
    };

    if(id.length) {
      criteria = {
        ...criteria,
        _id: id
      };
    };

    if(category.length) {
      const categoryResult = await Category.findOne({ name: { $regex: `${category}`, $options: 'i' } });

      if(categoryResult) {
        criteria = { ...criteria, category: categoryResult._id }
      };
    };

    if(tags.length) {
      const tagsResult = await Tag.find({ name: { $in: tags } });

      if(tagsResult.length > 0) {
        criteria = { ...criteria, tags: { $in: tagsResult.map((tag) => tag._id) } }
      };
    };

    const count = await Product.find(criteria).countDocuments();

    const products = await Product
      .find(criteria)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate('category')
      .populate('tags');
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
    const product = await Product.findById(id);
    const imageFile = req.file;
    
    let payload = req.body;
    if(payload.category) {
      payload = { ...payload, category: payload.category };
    };

    if(payload.tags && payload.tags.length > 0) {
      payload = { ...payload, tags: payload.tags.split(',') };
    };

    if (imageFile) {
      fs.unlinkSync(product.image_url);
      payload = { ...payload, image_url: imageFile.path };
    } else {
      payload = { ...payload, image_url: product.image_url };
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, payload, { new:true });

    return res.status(200).json({
      message: 'Product updated!',
      data: updatedProduct
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

module.exports = { store, index, update, destroy };