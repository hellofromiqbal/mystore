const fs = require('fs');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');

const store = async (req, res) => {
  try {
    let payload = req.body;
    const isProductNameAlreadyTaken = await Product.findOne({ name: payload.name });
    if(isProductNameAlreadyTaken) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      };
      return res.status(403).json({
        message: 'Product name already taken!'
      });
    } else {
      if(payload.tags && payload.tags.length > 0) {
        payload = { ...payload, tags: payload.tags };
      };
      const imageFile = req.file;
      const newProduct = await Product.create({
        ...payload,
        image_url: imageFile ? imageFile.path : null
      }).then((product) => product.populate('category'));
  
      return res.status(201).json({
        message: 'New product created!',
        data: newProduct
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  };
};

const index = async (req, res) => {
  try {
    const {
      q = '',
      id = '',
      cat = '',
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

    if(cat.length) {
      const catResult = await Category.findOne({ _id: cat });

      if(catResult) {
        criteria = { ...criteria, category: catResult._id }
      };
    };

    if(tags.length) {
      const tagIds = tags.split(',');

      const tagsResult = await Tag.find({ _id: { $in: tagIds } });

      if (tagsResult.length > 0) {
        const tagIdsArray = tagsResult.map(tag => tag._id);

        criteria = { ...criteria, tags: { $in: tagIdsArray } };
      }
    };

    const count = await Product.find(criteria).countDocuments();

    const products = await Product
      .find(criteria)
      .populate('category')
      .populate('tags');
    return res.status(200).json({
      count,
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

    if(payload.tags !== '') {
      payload = { ...payload, tags: payload.tags };
    } else {
      payload = { ...payload, tags: [] };
    };

    if (imageFile) {
      fs.unlinkSync(product.image_url);
      payload = { ...payload, image_url: imageFile.path };
    };

    const updatedProduct = await Product
      .findByIdAndUpdate(id, payload, { new:true })
      .populate('category')
      .populate('tags');

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