const UserService = require('../service/UserService');

module.exports = class User {
  static getHome(req, res, next) {
    let userData;
    if (req.userData) {
      userData = req.query.userData;
    } else {
      userData = req.session.userData;
      console.log(
        '🚀 ~ file: user.controller.js ~ line 10 ~ User ~ getHome ~ userData',
        userData
      );
    }
    res.render('home', {
      user: req.session.user,
      userData,
    });
  }

  static async createUser(req, res, next) {
    try {
      const createdUser = await UserService.createUser(req.body);
      console.log(
        '🚀 ~ file: user.controller.js ~ line 24 ~ User ~ createUser ~ createdUser',
        createdUser
      );
      if (createdUser.user === true) {
        delete createdUser.userData.password;

        req.session.user = true;
        req.session.userData = createdUser.userData;
        res.redirect(`/?userData=${createdUser.userData}`);
      }
    } catch (err) {
      res.json(err);
    }
  }

  static async checkUser(req, res, next) {
    try {
      const loggedUser = await UserService.loginUser(req.body);
      if (loggedUser.user === true) {
        delete loggedUser.userData.password;

        req.session.user = true;
        req.session.userData = loggedUser.userData;
        res.redirect(`/?userData=${req.session.userData}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static sessionCheck(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  static getProfile(req, res, next) {
    console.log(req.session.userData);
    res.render('nft-vendor', { userData: req.session.userData });
  }

  static logout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  }
};
