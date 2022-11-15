const UserService = require('../service/UserService');
const nftService = require('../service/NftService');
const walletService = require('../service/WalletService');
const paymentService = require('../service/paymentService');

module.exports = class User {
  static socketTest(req, res, next) {
    const io = req.app.get('socketio');

    // playing with socket

    io.of('/test').on('connection', (socket) => {
      socket.emit('connected', { message: 'connected' });

      socket.on('updateVal', (msg) => {
        console.log(msg, 'from client');

        socket.broadcast.emit('bid', { message: 'updateVal' });
      });

      console.log('connected...');
    });

    res.render('user/nft-single-auction-live');
  }

  static getHome(req, res, next) {
    try {
      console.log(req.headers.host);
      let userData;
      // const nfts = nftService.getAllNfts();
      if (req.userData) {
        userData = req.query.userData;
      } else {
        userData = req.session.userData;
      }
      res.render('user/home', {
        user: req.session.user,
        userData,
        // nfts,
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
        console.log(req.session.userData);
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

      res.render('user/nft-vendor', { wallet });
    } catch (err) {
      console.log(err);
    }
  }

  static async renderMarketplace(req, res, next) {
    try {
      const data = await nftService.getAllNfts();

      res.render('user/catalog', { data });
    } catch (err) {
      console.log(err);
    }
  }

  static async showSingleNft(req, res, next) {
    const { id, type } = req.query;
    const nft = await nftService.getNft(id);
    if (type === 'auction') {
      res.render('user/nft-single-auction-live', { nft });
    } else {
      res.render('user/nft-single-buy', { nft });
    }
  }

  static renderPayment(req, res, next) {
    req.session.price = 0;
    console.log(req.session.price);
    res.render('user/payment', {
      user: req.session.user,
      userData: req.session.userData,
    });
  }

  static async makePayment(req, res, next) {
    const { plan } = req.body.product;
    console.log(plan);
    const response = await paymentService.makePayment(plan, req.headers.host);
    const { session, price } = response;
    req.session.price = price;
    res.json({ id: session.id });
    next();
  }

  static async addMoneyToWallet(req, res, next) {
    const { price } = req.session;
    console.log('🚀 ~ file: user.controller.js ~ line 125 ~ User ~ addMoneyToWallet ~ price', req.session.userData);
    const user = req.session.userData;
    const status = await walletService.addMoneyToWallet(Number(price), user);
    res.redirect('/user/profile');
  }

  static async getWalletBalance(req, res, next) {
    const user = req.session.userData;
    const balance = await walletService.getWalletBalance(user);
    res.json({ balance });
  }

  static async buyProduct(req, res, next) {
    const { price } = req.query;
    // reduce money from users wallet
    const reducedStatus = await walletService.reduceaMoney(price, req.session.userData);
  }

  static async getAllUsernames(req, res, next) {
    const { username } = req.body;

    const idExist = await UserService.getAllUsernames(username);

    if (idExist) {
      res.json({ response: true });
    } else {
      res.json({ response: false });
    }
  }

  static async placbid(req, res, next) {
    const io = req.app.get('socketio');
    const { id, price } = req.body;
  }

  static logout(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  }
};
