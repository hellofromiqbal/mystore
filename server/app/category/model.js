const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    enum: ['food', 'drink', 'snack'],
    required: true
  }
});

module.exports = model('Category', categorySchema);