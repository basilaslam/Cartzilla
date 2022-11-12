const bcrypt = require('bcryptjs');
const { millify } = require('millify');

const UserModel = require('../model/user');

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
        email: userdetailes.email,
        // eslint-disable-next-line new-cap
        followers: Math.floor(1000 + Math.random() * 9000),
        following: Math.floor(1000 + Math.random() * 9000),
        nft_detailes: nftDetails,
        social_media: socialMedia,
        password: hashedPassword,
        isBan: false,
      };
      const response = await new UserModel(newUser).save();
      console.log(response, '== response');
      const user = this.modifyMongooseResponse(response);
      console.log('stage-1');

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
      console.log(userDetailes.email, userDetailes);

      if (!userResult) throw new Error('no user found');

      const userlog = await bcrypt.compare(
        userDetailes.password,
        userResult.password
      );
      console.log(
        '🚀 ~ file: UserService.js ~ line 62 ~ UserService ~ loginUser ~ userlog',
        userlog
      );
      console.log(userlog);

      const user = this.modifyMongooseResponse(userResult);
      console.log(
        '🚀 ~ file: UserService.js ~ line 56 ~ UserService ~ loginUser ~ user',
        user
      );
      return { user: userlog, userData: user };
    } catch (err) {
      if (err.message === 'no user found') {
        return { user: false, userData: null };
      }
    }
  }

  static modifyMongooseResponse(obj) {
    const user = obj.toObject();
    // create Date
    const date = new Date(user.createdAt);

    const year = date.getFullYear();
    // 👇️ getMonth returns integer from 0(January) to 11(December)
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const newDate = [year, month, day].join('-');

    delete user.password;
    user.joined_date = newDate;
    user.followers = millify(user.followers);
    user.following = millify(user.following);

    console.log(user);

    return user;
  }

  static async getAllUsernames(username){
    try{
      let response = await UserModel.findOne({username})

      return response

    }catch(err){

    }

  }
};
