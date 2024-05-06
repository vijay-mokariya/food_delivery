const { validationResult } = require('express-validator');

// const validator = async (req, res, next) => {
//     const error = validationResult(req);

//     if (!error.isEmpty()) {
//         return res.status(400).json({ error: error.array() });
//     }
//     next();
// }

// module.exports = validator

const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            // if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};
module.exports = validate;