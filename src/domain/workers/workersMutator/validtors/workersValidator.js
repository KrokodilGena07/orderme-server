const {body} = require('express-validator');

const workersValidator = [
    body('firstName', 'Use 1–255 characters')
        .isLength({min: 1, max: 255}),
    body('lastName', 'Use 1–255 characters')
        .isLength({min: 1, max: 255}),
    body('pinCode', 'Use 4 numbers')
        .isLength({min: 4, max: 4})
        .custom(value => {
            for (const sym of value) {
                if (!Number.isInteger(Number(sym))) {
                    throw new Error('Pin code is incorrect')
                }
            }
            return true;
        }),
    body('pointId', 'Select point, please').isUUID(),
    body('roleId', 'Select role, please').isUUID()
];

module.exports = workersValidator;