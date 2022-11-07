const adminService = require('../service/adminService');

module.exports = class admin {
  static async renderAdminPage(req, res, next) {
    console.log(req.session);
    res.render('admin/index', {
      adminData: req.session.adminData,
      admin: req.session.admin,
    });
  }

  static async renderAdminLogin(req, res, next) {
    res.render('admin/login', { message: false });
  }

  static async login(req, res, next) {
    const response = await adminService.login(req.body);

    if (response) {
      req.session.admin = true;
      req.session.adminData = response.adminData;
      res.redirect('/admin');
    } else {
      const message = 'These credentials do not match our records';
      res.render('admin/login', { message });
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await adminService.getUsers();
      res.render('admin/customers-list', { users });
    } catch (err) {
      console.log(err);
    }
  }

  static async getEditUser(req, res, next) {
    const { id } = req.params;
    const user = await adminService.getUser(id);
    res.render('admin/customer', { user });
  }

  static async banUser(req, res, next) {
    const { id } = req.params;
    const response = await adminService.banUser(id);

    res.redirect('/admin/users');
  }

  static async unBanUser(req, res, next) {
    const { id } = req.params;
    const response = await adminService.unBanUser(id);
    res.redirect('/admin/users');
  }

  static async getPendingRequests(req, res, next) {
    const pendingNFTs = await adminService.getPending();
    res.render('admin/NFT-requests', { nfts: pendingNFTs });
  }

  static async approveNft(req, res, next) {
    const { id } = req.params;

    const response = await adminService.approveNft(id);
    console.log(response);
    res.redirect('/admin/nft-requests');
  }

  static async cancelApprovalRequest(req, res, next) {
    const { id } = req.params;

    const response = await adminService.cancelApprovalRequest(id);
    res.redirect('/admin/nft-requests');
  }
};
