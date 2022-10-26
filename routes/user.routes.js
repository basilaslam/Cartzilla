const express = require('express');

const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const nftCtrl = require('../controllers/nft.controller');

router.get('/', userCtrl.getHome);
router.get('/user/logout', userCtrl.logout);
router.get('/user/profile', userCtrl.sessionCheck, userCtrl.getProfile);
router.get('/user/create-nft', userCtrl.sessionCheck, nftCtrl.renderCreateNft);
router.post('/user/create-nft', nftCtrl.createNft);
router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.checkUser);
module.exports = router;
