const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema(
  {
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
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
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
      created: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'nfts',
        },
      ],
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
    isBan: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('users', userSchema);
module.exports = User;
