const express = require('express');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('hello Admin').json();
});
router.get('/login', (req, res) => {
  res.send({ res: 'okok' });
});

router.post('/login', adminCtrl.login);
module.exports = router;
