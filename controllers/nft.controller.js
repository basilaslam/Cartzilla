const fileUpload = require('express-fileupload');
const nftService = require('../service/NftService');

module.exports = class Nft {
  static renderCreateNft(req, res, next) {
    res.render('nft-create-item.ejs', { userData: req.session.userData });
  }

  static async createNft(req, res, nest) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.filetoupload;

    try {
      const createdNft = await nftService.createNft(req.body);
      const filename = createdNft.id;
      const path = `${__dirname}/../public/img/NFTs/approval_pending/${filename}.jpg`;

      file.mv(path, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('file saved');
      });

      res.status(200).send({ message: 'file uploaded' });
    } catch (error) {
      console.log(error);
    }
  }
};
