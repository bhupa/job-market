// userRoutes.js
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const userController = require('../controllers/userController');
const { registerUserValidators } = require('../validators/userValidators');
const {loginValidators } = require('../validators/loginValidators');
const authMiddleware = require('../middleware/authMiddleware');
const TokenBlacklist = require('../models/TokenBlacklist');
const jwt = require('jsonwebtoken');

router.post('/register', validate(registerUserValidators), userController.registerUser);
router.post('/login',validate(loginValidators), userController.loginUser);

router.get('/user/:email',authMiddleware, userController.getUserByEmail);
router.get('/user/id/:id',authMiddleware, userController.getUserById);  // Ensure this is the correct route

router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const expirationDate = new Date(decoded.exp * 1000);  // Convert exp from seconds to milliseconds

            await TokenBlacklist.create({ token, expirationDate });
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Error in logout:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});



module.exports = router;
