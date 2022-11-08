const orderModal = require('../model/order');

module.exports = {
  newOrder: async (product, user) => {
    console.log('🚀 ~ file: orderService.js ~ line 5 ~ newOrder: ~ product', product);

    try {
      const orderDetailes = {
        user,
        product,
      };

      const order = await orderModal(orderDetailes).save();
      return order;
    } catch (err) {
      console.log(err);
    }
  },
};
