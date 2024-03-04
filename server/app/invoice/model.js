const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
  cartItem: {
    type: Schema.Types.ObjectId,
    ref: 'CartItem'
  },
  paymentStatus: {
    type: String,
    enum: ['waiting_for_payment', 'delivering', 'completed'],
    default: 'waiting_for_payment'
  }
});

module.exports = model('Invoice', invoiceSchema);