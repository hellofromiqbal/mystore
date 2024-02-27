const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
  name: {
    type: String,
    enum: ['signature', 'best_seller']
  }
});

module.exports = model('Tag', tagSchema);