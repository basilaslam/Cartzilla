const nftService = require('../service/NftService');

module.exports = class Nft {
  static renderCreateNft(req, res, next) {
    res.render('nft-create-item.ejs', { userData: req.session.userData });
  }

  static createNft() {}
};
