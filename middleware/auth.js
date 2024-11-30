const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;  // Use cookie-parser to parse cookies

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed, no token provided.' });
        }

        // Verify token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        // Attach userId to request object for further processing
        req.auth = {
            userId: userId
        };

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed', error });
    }
};
