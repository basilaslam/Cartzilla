const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = Schema({
  email: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },
});
const admin = mongoose.model('admin', adminSchema);
module.exports = admin;
