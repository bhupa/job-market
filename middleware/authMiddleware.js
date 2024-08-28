const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const blacklistedToken = await TokenBlacklist.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({ message: 'Token blacklisted, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.error('Error in authMiddleware:', err);
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

module.exports = authMiddleware;
