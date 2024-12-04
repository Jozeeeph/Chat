const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.auth_token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed, no token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret_key");
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
