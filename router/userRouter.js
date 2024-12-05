const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // JWT for authentication
const userCtrl = require('../controllers/userCtrl');
const authMiddleware = require('../middleware/auth');  // Authentication middleware
const roleMiddleware = require('../middleware/role');  // Role checking middleware
const User = require('../models/User');
const adminCtrl = require('../controllers/adminCtrl');

// User authentication routes
router.post('/signup', userCtrl.signup); // Handle user signup
router.post('/login', userCtrl.login);  // Handle user login
router.post('/logout', userCtrl.logout); // Handle user logout, clears cookies
router.get('/users',userCtrl.getAllUsers);

// Dashboard route: protected by auth middleware
router.get('/dashboard', async (req, res) => {
    console.log('Dashboard route hit');

    const token = req.cookies.auth_token; 

    if (!token) {
        console.log('No token found, redirecting to login...');
        return res.redirect('/login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'your_jwt_secret'); 
        
        // Render the dashboard and pass the 'users' and 'user' data to the template
        res.render('dashboard', { user: decoded, users });
    } catch (err) {
        console.error('Error verifying token or fetching users:', err.message);
        return res.redirect('/login'); // Redirect if any error occurs
    }
});

// Admin-related user routes (admin only)
// Update a user (Requires authentication and admin role)
router.put('/update/:id', authMiddleware, roleMiddleware, adminCtrl.updateUser);

// Ban a user (Requires authentication and admin role)
router.put('/:action/:userId', authMiddleware, roleMiddleware, adminCtrl.banUser);

// Delete a user (Requires authentication and admin role)
router.delete('/delete/:id', authMiddleware, roleMiddleware, adminCtrl.deleteUser);

// Fetch all users (Requires authentication and admin role)
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json(users); // Send users as JSON response
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router; // Export the router to use it in the main app
