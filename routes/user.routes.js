const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const nftCtrl = require('../controllers/nft.controller');

router.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.userData = req.session.userData;
  console.log('used');
  next();
});

router.get('/', userCtrl.getHome);
router.get('/user/logout', userCtrl.logout);
router.get('/user/profile', userCtrl.sessionCheck, userCtrl.getProfile);
router.get('/user/create-nft', userCtrl.sessionCheck, nftCtrl.renderCreateNft);
router.get('/marketplace', userCtrl.renderMarketplace);
router.post('/user/create-nft', nftCtrl.createNft);
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.checkUser);
router.get('/marketplace/show-nft', userCtrl.showSigleNft);
router.get('/wallet/addMoney', userCtrl.renderPayment);
router.post('/wallet/addMoney/stripe', userCtrl.makePayment);
router.get('/wallet/addMoney/stripe/payment', userCtrl.addMoneyToWallet);
router.post('/user/walletBalance', userCtrl.getWalletBalance);
router.get('/user/product/buy', nftCtrl.makeOrder, userCtrl.buyProduct);
// router.post('/test', (req, res) => {
//   const { plan } = req.body.product;
//   console.log(plan);
// });
module.exports = router;
