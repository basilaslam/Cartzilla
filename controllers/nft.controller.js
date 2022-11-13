const fileUpload = require('express-fileupload');
const nftService = require('../service/NftService');
const orderService = require('../service/orderService');

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
      const createdNft = await nftService.createNft(req.body);
      const filename = createdNft.id;
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
    const newOrder = await orderService.newOrder(product, req.session.userData);
    console.log('stage-1');
    next();
  }
};
