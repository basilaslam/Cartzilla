const { array } = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const { millify } = require('millify');

const NftModel = require('../model/NFT');
const UserModel = require('../model/user');
const NftService = require('./NftService');

module.exports = class UserService {
  static async createUser(userdetailes) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userdetailes.password, salt);
      const name = {
        first_name: userdetailes.firstName,
        last_name: userdetailes.lastName,
      };
      const nftDetails = {
        created: [],
        liked: [],
        collection: [],
      };
      const socialMedia = {
        instagram: '',
        facebook: '',
        twitter: '',
      };
      const newUser = {
        name,
        username: userdetailes.username,
        email: userdetailes.email,
        phone: userdetailes.phone,
        // eslint-disable-next-line new-cap
        followers: Math.floor(1000 + Math.random() * 9000),
        following: Math.floor(1000 + Math.random() * 9000),
        nft_detailes: nftDetails,
        social_media: socialMedia,
        password: hashedPassword,
        isBan: false,
      };
      const response = await new UserModel(newUser).save();
      const user = this.modifyMongooseResponse(response);

      return { user: true, userData: user };
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        return { user: false, error: 'email already exist' };
      }
      console.log(err);
    }
  }

  static async loginUser(userDetailes) {
    try {
      const userResult = await UserModel.findOne({
        email: userDetailes.email,
      });

      if (!userResult) throw new Error('no user found');

      const userlog = await bcrypt.compare(userDetailes.password, userResult.password);

      const user = this.modifyMongooseResponse(userResult);
      return { user: userlog, userData: user };
    } catch (err) {
      if (err.message === 'no user found') {
        return { user: false, userData: null };
      }
    }
  }

  static async getVendor(id) {
    let vendor = await UserModel.findById(id);

    vendor = this.modifyMongooseResponse(vendor);

    return vendor;
  }

  static modifyMongooseResponse(obj) {
    let user;
    if (typeof obj !== 'object') {
      user = obj.toObject();
    } else {
      user = obj;
    }

    // create Date

    if (user.createdAt) {
      const date = new Date(user.createdAt);
      const year = date.getFullYear();
      // 👇️ getMonth returns integer from 0(January) to 11(December)
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const newDate = [year, month, day].join('-');
      user.joined_date = newDate;
    }

    delete user.password;
    user.followers = millify(user.followers);
    user.following = millify(user.following);

    return user;
  }

  static async registerCreated(id, user) {
    try {
      const nft = await NftModel.findById(id);
      const update = { $push: { 'nft_detailes.created': id } };
      const status = await UserModel.findByIdAndUpdate(nft.creator, update);
      console.log(status);
      return status;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllUsernames(username) {
    try {
      const response = await UserModel.findOne({ username });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getTopTen() {
    let users = await UserModel.aggregate([{ $project: { 'nft_detailes.created': 1, len: { $size: '$nft_detailes.created' }, followers: 1, username: 1 } }]);

    // eslint-disable-next-line no-nested-ternary
    users.sort((a, b) => (a.len > b.len ? -1 : b.len > a.len ? 1 : 0));
    users = users.slice(0, 8);
    // eslint-disable-next-line array-callback-return
    users = users.map((el) => this.modifyMongooseResponse(el));
    return users;
  }
};
