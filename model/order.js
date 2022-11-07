const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'nfts',
  },
});
const Wallet = mongoose.model('orders', orderSchema);
module.exports = Wallet;
