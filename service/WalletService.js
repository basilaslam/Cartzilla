const mongoose = require('mongoose');
const walletModel = require('../model/wallet');

module.exports = {
  createWallet: async (user) => {
    try {
      const walletDetailes = {
        user,
        balance: 0,
        orderHistory: user,
      };
      const wallet = await walletModel(walletDetailes).save();
      return wallet;
    } catch (err) {
      console.log(err);
    }
  },
  getWallet: async (userId) => {
    try {
      const wallet = walletModel.findOne({ user: userId });
      console.log(wallet.balance);
      return wallet;
    } catch (error) {
      console.log(error);
    }
  },
};
