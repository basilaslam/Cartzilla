const express = require('express');
const moment = require('moment');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const nftCtrl = require('../controllers/nft.controller');
const userValidation = require('../utils/joi');

router.use((req, res, next) => {
  req.app.set('layout', 'layouts/layout');
  res.locals.user = req.session.user;
  res.locals.userData = req.session.userData;
  res.locals.moment = moment;

  next();
});

router.get('/', userCtrl.getHome);
router.get('/user/logout', userCtrl.logout);
router.get('/user/profile', userCtrl.sessionCheck, userCtrl.getProfile);
router.get('/user/create-nft', userCtrl.sessionCheck, nftCtrl.renderCreateNft);
router.get('/marketplace', userCtrl.sessionCheck, userCtrl.renderMarketplace);
router.post('/user/create-nft', nftCtrl.createNft);
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.checkUser);
router.get('/marketplace/show-nft', userCtrl.sessionCheck, userCtrl.showSingleNft);
router.get('/wallet/addMoney', userCtrl.sessionCheck, userCtrl.renderPayment);
router.post('/wallet/addMoney/stripe', userCtrl.makePayment);
router.get('/wallet/addMoney/stripe/payment', userCtrl.sessionCheck, userCtrl.addMoneyToWallet);
router.post('/user/walletBalance', userCtrl.getWalletBalance);
router.get('/user/product/buy', userCtrl.sessionCheck, nftCtrl.makeOrder, userCtrl.buyProduct);
router.post('/getUsernames', userCtrl.getAllUsernames);
router.get('/test', userCtrl.socketTest);
router.get('/vendor/profile', userCtrl.getVendor);
router.post('/palce-bid', userCtrl.placbid);
router.post('/user/getOtp', userCtrl.getOtp);
router.post('/user/verifyOtp', userCtrl.verifyOtp);
router.post('/user/validate', userValidation);
module.exports = router;
