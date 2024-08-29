const { body } = require('express-validator');
const User = require('../../models/User');

const companyValidators = [
    body('company_name').notEmpty().withMessage('Company name is required'),
    body('about_company').optional({ checkFalsy: true }).isString().withMessage('About company should be a string'),
    body('address').optional({ checkFalsy: true }).isString().withMessage('Address should be a string'),
    body('logo').optional({ checkFalsy: true }).isString().withMessage('Logo should be a string'),
    body('is_verify').optional({ checkFalsy: true }).isInt().withMessage('Is verify should be an integer'),
    body('status').isInt().withMessage('Status is required and should be an integer')
];

module.exports = { companyValidators };
