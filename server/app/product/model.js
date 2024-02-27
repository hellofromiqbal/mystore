const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  image_url: {
    type: String,
    default: null
  },
  category: {
    type: String,
    enum: ['food', 'drink', 'snack'],
    required: true
  },
  tags: {
    type: String,
    enum: ['signature', 'regular'],
    required: true
  }
});

module.exports = model('Product', productSchema);