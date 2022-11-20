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
  static async createNft(data, id) {
    const NFT = {};
    NFT.creator = id;
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

    if (data.selling_type === 'auction') {
      NFT.current_bid_price = data.price;
      NFT.duration = getDuration(data.stating_date);

      NFT.history = {};
    }

    if (data.price[1]) {
      NFT.price = {
        old_price: 0,
        new_price: data.price[1],
        offers: null,
      };
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
      const response = await nftModel.find({ approval_status: 'approved', soft_delete: false }).sort({ _id: -1 });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  static async getNft(id) {
    try {
      const nft = await nftModel.findById(id);
      return nft;
    } catch (err) {
      console.log(err);
    }
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
