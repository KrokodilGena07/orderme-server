const {body} = require('express-validator');

const authMethodValidator = [
    body('userId', 'User ID is incorrect').isUUID(),
    body('authTypeId', 'Auth type ID is incorrect').isUUID(),
    body('pass', 'Password is sick').optional().isStrongPassword({
        minSymbols: 1,
        minLowercase: 2,
        minUppercase: 2,
        minLength: 10,
        minNumbers: 2
    })
];

module.exports = authMethodValidator;