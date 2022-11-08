const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'nfts',
    },
  },
  { timestamps: true }
);
const order = mongoose.model('orders', orderSchema);
module.exports = order;
