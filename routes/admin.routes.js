const express = require('express');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();

router.use((req, res, next) => {
  // changing layout for my admin panel
  req.app.set('layout', 'layouts/admin-layout');
  res.locals.admin = req.session.admin;
  res.locals.adminData = req.session.adminData;
  next();
});

router.get('/', adminCtrl.renderAdminPage);
router.get('/login', adminCtrl.renderAdminLogin);
router.post('/login', adminCtrl.login);
router.get('/users', adminCtrl.getUsers);
router.get('/users/user/:id', adminCtrl.getEditUser);
router.get('/users/user/ban/:id', adminCtrl.banUser);
router.get('/users/user/ban/:id', adminCtrl.banUser);
router.get('/users/user/unban/:id', adminCtrl.unBanUser);
router.get('/nft-requests', adminCtrl.getPendingRequests);
router.get('/nft/approve/:id', adminCtrl.approveNft);
router.get('/nft/cancelApprove/:id', adminCtrl.cancelApprovalRequest);
module.exports = router;
