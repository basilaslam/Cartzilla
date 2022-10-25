const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
  name: {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  joined_date: {
    type: Date,
    required: true,
  },
  wallerAddress: {
    type: String,
  },
  followers: {
    type: Number,
    required: true,
  },
  following: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
  },
  social_media: {
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  nft_detailes: {
    created: {
      type: Array,
    },
    liked: {
      type: Array,
    },
    collection: {
      type: Array,
    },
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model('users', userSchema);
module.exports = User;
