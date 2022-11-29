const fileUpload = require('express-fileupload');
const UserService = require('../service/UserService');

const nftService = require('../service/NftService');
const orderService = require('../service/orderService');
const { registerCreated } = require('../service/UserService');

module.exports = class Nft {
  static renderCreateNft(req, res, next) {
    res.render('user/nft-create-item', { userData: req.session.userData });
  }

  static async createNft(req, res, nest) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.filetoupload;

    try {
      const createdNft = await nftService.createNft(req.body, req.session.userData);
      const filename = createdNft._id;

      // Register in User Details
      const registerEntry = await UserService.registerCreated(filename, req.session.userData);

      const path = `${__dirname}/../public/img/NFTs/${filename}.jpg`;

      file.mv(path, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file saved');
      });

      res.redirect('/');
    } catch (error) {
      console.log(error);
    }
  }

  static async makeOrder(req, res, next) {
    const { product } = req.query;

    const deletedProduct = await nftService.softDelete(product);
    const registerPurchase = await UserService.registerPurchase(product);
    const newOrder = await orderService.newOrder(product, req.session.userData);
    next();
  }
};
