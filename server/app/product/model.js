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
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }
}, { timestamps: true });

module.exports = model('Product', productSchema);