const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema 1
const nftSchema = Schema({
  nft_name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  collection_name: {
    type: String,
    required: true,
  },
  price: {
    old_price: {
      type: Number,
    },
    new_price: {
      type: Number,
      default: null,
    },
    offers: {
      type: Number,
    },
  },
  current_bid_price: {
    type: Number,
    default: null,
  },
  selling_type: {
    type: String,
    default: null,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    default: null,
    required: true,
  },
  description: {
    type: String,
  },
  wallet_address: {
    type: String,
    default: null,
    required: true,
  },

  history: {
    type: Array,
  },
  approval_status: {
    type: String,
    default: 'pending',
  },
  soft_delete: {
    default: false,
    type: Boolean,
  },
});

const NFT = mongoose.model('nfts', nftSchema);
module.exports = NFT;
