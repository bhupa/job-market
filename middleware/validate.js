const { validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Map over errors and return only messages
        const extractedErrors = errors.array().map(err => ({ msg: err.msg }));

        return res.status(400).json({ errors: extractedErrors });
    };
};

module.exports = validate;
