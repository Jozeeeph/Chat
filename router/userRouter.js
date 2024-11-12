const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');

router.post('/signup',userCtrl.signup);
router.post('/login',userCtrl.login);
router.get('/users',userCtrl.getAllUsers);
router.put('/update/:id',userCtrl.updateUser);
router.put('/ban/:id',userCtrl.banUser);
router.delete('/delete/:id',userCtrl.deleteUser);

module.exports = router;