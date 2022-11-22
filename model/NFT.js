const { ObjectId, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

// Schema 1
const nftSchema = Schema({
  creator: {
    type: String,
    required: true,
  },
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
  current_price: {
    type: String,
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
  },
  description: {
    type: String,
    default: '',
  },
  wallet_address_auction: {
    type: String,
    default: null,
  },
  wallet_address_buy: {
    type: String,
    default: null,
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
