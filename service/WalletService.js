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
      return wallet;
    } catch (error) {
      console.log(error);
    }
  },
  addMoneyToWallet: async (money, user) => {
    const { _id } = user;

    const wallet = await walletModel.findOne({
      user: mongoose.Types.ObjectId(_id),
    });
    const id = wallet._id;
    const totalToUpdate = wallet.balance + money;

    const filter = { _id: id };
    const update = { balance: totalToUpdate };
    const updated = await walletModel.findOneAndUpdate(filter, update);
    return updated;
  },
  getWalletBalance: async (user) => {
    console.log(user);
    try {
      const { _id } = user;

      const wallet = await walletModel.findOne({
        user: mongoose.Types.ObjectId(_id),
      });

      return wallet.balance;
    } catch (err) {
      console.log(err);
    }
  },
  reduceaMoney: async (price, user) => {
    console.log(user);
    const { _id } = user;

    const wallet = await walletModel.findOne({
      user: mongoose.Types.ObjectId(_id),
    });
    const id = wallet._id;
    const totalToUpdate = wallet.balance - price;

    const filter = { _id: id };
    const update = { balance: totalToUpdate };
    const updated = await walletModel.findOneAndUpdate(filter, update);
    return updated;
  },
};
