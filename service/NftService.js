const { default: mongoose } = require('mongoose');
const userModel = require('./UserService');
const nftModel = require('../model/NFT');

const getDuration = (dates) => {
  dates = dates.split(' to ');
  const start = new Date(dates[0]);
  const end = new Date(dates[1]);
  const diff = Math.abs(end - start);
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diffDays;
};

module.exports = class NftService {
  static async createNft(data, userData) {
    console.log(userData._id);

    let price;
    if (Array.isArray(data.current_price) === true) {
      // eslint-disable-next-line prefer-destructuring
      price = data.current_price[0];
    } else {
      price = data.current_price;
    }
    console.log(price);

    const NFT = {};
    NFT.creatorId = mongoose.Types.ObjectId(userData._id);
    NFT.creator = userData.username;
    NFT.nft_name = data.name;
    NFT.category = data.category;
    NFT.collection_name = data.collection;

    NFT.created_date = new Date().toLocaleString();
    NFT.price_type = data.price_fix_currency;
    NFT.selling_type = data.selling_type;
    NFT.payment_type = data.payment_type;
    NFT.wallet_address_auction = data.wallet_address_auction;
    NFT.wallet_address_buy = data.wallet_address_buy;
    NFT.approval_status = 'Pending';
    NFT.soft_delete = false;
    NFT.current_price = price;
    NFT.description = data.description;

    if (data.selling_type === 'auction') {
      NFT.duration = data.ending_date;
      NFT.history = {};
    }

    try {
      const savedNFT = await nftModel(NFT).save();
      return savedNFT;
    } catch (err) {
      console.log(err.message);
    }
  }

  static async getAllNfts() {
    try {
      const response = await nftModel.find({ approval_status: 'approved', soft_delete: false }).sort({ _id: -1 }).populate('creatorId');
      response.map((element) => {
        delete element.password;
        return element;
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getNft(id) {
    try {
      let nft = await nftModel.findById(id).populate('creatorId');
      nft = nft.toObject();
      nft._id = nft._id.toString();
      delete nft.creator.password;

      return nft;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateBid(msg) {
    const { id, bid } = msg;
    const update = { current_price: bid };
    const result = await nftModel.findByIdAndUpdate(id, update);
  }

  static async softDelete(productId) {
    try {
      const filter = { _id: productId };
      const update = { soft_delete: true };
      const updatedProduct = await nftModel.findOneAndUpdate(filter, update);
      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  }
};
