const User = require('../models/User');

module.exports = (req, res, next) => {

    const userId = req.user.id;

    
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied. Admins only.' });
            }
            next();
        })
        .catch(error => res.status(500).json({ message: 'Error checking role', error }));
};
