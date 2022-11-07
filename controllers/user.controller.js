const UserService = require('../service/UserService');
const nftService = require('../service/NftService');
const walletService = require('../service/WalletService');

module.exports = class User {
  static getHome(req, res, next) {
    try {
      let userData;
      const nfts = nftService.getAllNfts();
      if (req.userData) {
        userData = req.query.userData;
      } else {
        userData = req.session.userData;
      }
      res.render('home', {
        user: req.session.user,
        userData,
        nfts,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const createdUser = await UserService.createUser(req.body);

      if (createdUser.user === true) {
        const wallet = await walletService.createWallet(createdUser.userData);

        delete createdUser.userData.password;

        req.session.user = true;
        req.session.userData = createdUser.userData;
        res.json({ redirect: '/' });
      } else {
        res.json({ err: true, errMessage: createdUser.error });
      }
    } catch (err) {
      console.log(err);
      res.json({ err: true, errMessage: 'error' });
    }
  }

  static async checkUser(req, res, next) {
    try {
      const loggedUser = await UserService.loginUser(req.body);
      if (loggedUser.user === true) {
        delete loggedUser.userData.password;

        req.session.user = true;
        req.session.userData = loggedUser.userData;
        res.json({ redirect: '/' });
      } else {
        res.json({ err: true, errMessage: 'No User' });
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

  static async getProfile(req, res, next) {
    try {
      const id = req.session.userData._id;
      const wallet = await walletService.getWallet(id);
      console.log(wallet._id);

      res.render('nft-vendor', { userData: req.session.userData, wallet });
    } catch (err) {
      console.log(err);
    }
  }

  static async renderMarketplace(req, res, next) {
    try {
      const data = await nftService.getAllNfts();

      res.render('catalog', { data });
    } catch (err) {
      console.log(err);
    }
  }

  static async showSigleNft(req, res, next) {
    const { id } = req.params;

    const nft = await nftService.getNft(id);
    console.log(nft);
    res.render('nft-single-buy', { nft });
  }

  static logout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  }
};
