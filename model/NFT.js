const mongoose = require('mongoose');

const { Schema } = mongoose;

const nftSchema = Schema({
  nft_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    old_price: {
      type: Number,
    },
    new_price: {
      type: Number,
      required: true,
    },
    offers: {
      type: Number,
    },
  },
  created_date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  approval_status: {
    type: String,
  },
});
const NFT = mongoose.model('nfts', nftSchema);
module.exports = NFT;
