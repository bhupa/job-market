const { validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        if (!Array.isArray(validations)) {
            return next(new Error('Validations must be an array.'));
        }

        try {
            await Promise.all(validations.map(validation => {
                if (typeof validation.run === 'function') {
                    return validation.run(req);
                } else if (typeof validation === 'function') {
                    return validation(req, res, next);
                } else {
                    throw new Error('Validation object lacks a run method');
                }
            }));

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const extractedErrors = errors.array().reduce((acc, err) => {
                    acc[err.path] = err.msg;
                    return acc;
                }, {});

                return res.status(400).json({ errors: extractedErrors });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = validate;
