const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

const authMiddleware = async (req, res, next) => {
    console.log('Response Object:', res);
    
    try {
        // Initial validation for res
        if (!res || typeof res.status !== 'function' || typeof res.json !== 'function') {
            console.error('Malformed response object:', res);
            throw new Error('Response object is undefined or improperly formed.');
        }
        
        // Rest of the middleware logic
        const authorizationHeader = req.headers && req.headers['authorization'];
        if (!authorizationHeader) {
            console.error('Authorization header is missing');
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        console.log('Authorization header:', authorizationHeader);
        const token = authorizationHeader.replace('Bearer ', '');

        if (!token) {
            console.error('Token extraction failed');
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        console.error('Error in authMiddleware:', err);

        // Provide specific error if res is malformed
        if (!res || typeof res.status !== 'function' || typeof res.json !== 'function') {
            console.error('Response object is malformed:', res);
            throw new Error('Response object is undefined or improperly formed in middleware.');
        }

        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

module.exports = authMiddleware;
