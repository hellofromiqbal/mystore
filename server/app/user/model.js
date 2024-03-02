const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [{
    type: Schema.Types.ObjectId,
    ref: 'CartItem'
  }],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = model('User', userSchema);