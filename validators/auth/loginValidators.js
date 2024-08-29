const { body } = require('express-validator');
const User = require('../../models/User');

const loginValidators = [
    body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail()  // Optional: If you want to normalize the email
    .custom(async (email) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('Email is not register');
        }
    }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
];

module.exports = {
    loginValidators
};
