const { body } = require('express-validator');
const User = require('../models/User');

const registerUserValidators = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .normalizeEmail()  // Optional: If you want to normalize the email
    .custom(async (email) => {
        const user = await User.findOne({ email: email });
        if (user) {
            throw new Error('Email already in use');
        }
    }),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long')
];

module.exports = {
    registerUserValidators
};
