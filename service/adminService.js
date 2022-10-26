const bcrypt = require('bcryptjs');
const adminModel = require('../model/admin');

module.exports = class admin {
  static async login(adminDetailes) {
    try {
      const response = await adminModel.findOne({ email: adminDetailes.email });
      console.log(response);

      const adminlog = await bcrypt.compare(
        adminDetailes.password,
        response.password
      );

      return { admin: adminlog, adminData: response };
    } catch (err) {
      console.log(err);
    }
  }
};
