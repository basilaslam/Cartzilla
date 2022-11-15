const bcrypt = require('bcryptjs');
const { millify } = require('millify');
const adminModel = require('../model/admin');
const UserModel = require('../model/user');
const nftModel = require('../model/NFT');

module.exports = class admin {
  static async login(adminDetailes) {
    try {
      const response = await adminModel.findOne({ email: adminDetailes.email });
      console.log(response);
      if (response === null) {
        return false;
      }

      const adminlog = await bcrypt.compare(adminDetailes.password, response.password);

      const adminData = this.modifyMongooseResponse(response);

      return { admin: adminlog, adminData };
    } catch (err) {
      console.log(err);
    }
  }

  static modifyMongooseResponse(obj) {
    const user = obj.toObject();
    // create Date

    delete user.password;

    console.log(user);

    return user;
  }

  static async getAll() {
    try {
      const response = await adminModel.find();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getUsers() {
    let users = await UserModel.find({}).select('-password');
    users = users.map((user) => {
      user = this.editUser(user);
      return user;
    });
    return users;
  }

  static async getUser(id) {
    const user = await UserModel.findById(id);
    return this.editUser(user);
  }

  static async banUser(id) {
    const filter = { _id: id };
    const update = { isBan: true };

    const response = await UserModel.findOneAndUpdate(filter, update);
    console.log(response);
    return response;
  }

  static async unBanUser(id) {
    const filter = { _id: id };
    const update = { isBan: false };

    const response = await UserModel.findOneAndUpdate(filter, update);
    console.log(response);
    return response;
  }

  static async getPending() {
    try {
      const response = await nftModel.find({ approval_status: 'Pending' });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async approveNft(id) {
    const filter = { _id: id };
    const update = { approval_status: 'approved' };
    try {
      const response = await nftModel.findOneAndUpdate(filter, update);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async cancelApprovalRequest(id) {
    const response = await nftModel.remove({ _id: id });
    return response;
  }

  static editUser(user) {
    user = user.toObject();
    // create Date
    const date = new Date(user.joined_date);

    const year = date.getFullYear();
    // 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDate = [year, month, day].join('-');

    delete user.password;
    user.joined_date = newDate;
    user.followers = millify(user.followers);
    user.following = millify(user.following);
    user._id = user._id.toString();

    return user;
  }
};
