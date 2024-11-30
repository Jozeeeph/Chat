const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/auth');  // Import the auth middleware

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);  // Add logout route to clear the cookie

// Protect routes that require authentication
router.get('/users', authMiddleware, userCtrl.getAllUsers);
router.put('/update/:id', authMiddleware, userCtrl.updateUser);
router.put('/ban/:id', authMiddleware, userCtrl.banUser);
router.delete('/delete/:id', authMiddleware, userCtrl.deleteUser);

module.exports = router;