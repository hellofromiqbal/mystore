const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  selectedAddress: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['waiting_for_payment', 'delivering', 'completed'],
    default: 'waiting_for_payment'
  }
}, { timestamps: true });

module.exports = model('Invoice', invoiceSchema);