const mongoose = require('mongoose');

const { Schema } = mongoose;

const walletSchema = Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  balance: {
    type: Number,
    required: true,
  },
  orderHistory: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'orders',
    },
  ],
});
const Wallet = mongoose.model('wallets', walletSchema);
module.exports = Wallet;
