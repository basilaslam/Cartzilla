const adminService = require('../service/adminService');

module.exports = class admin {
  static async login(req, res, next) {
    const response = await adminService.login(req.body);

    if (response.admin === true) {
      res.status(200).json({ response: 'admin logged in succesfully' });
    } else {
      res.send('admin not found');
    }
  }
};
