const User = require('../models/User');

module.exports = (req, res, next) => {
    // Assuming req.auth.userId contains the decoded user information after authentication
    const userId = req.user.id;

    // Check if the userId exists and if the user has the "admin" role
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            next(); // Proceed to the next middleware or route handler if the user is an admin
        })
        .catch(error => res.status(500).json({ message: 'Error checking role', error }));
};
