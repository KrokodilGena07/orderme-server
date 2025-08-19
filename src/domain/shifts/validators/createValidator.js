const {body} = require('express-validator');

const createValidator = [
    body('money', 'Value is invalid').isFloat(),
    body('workerId', 'Worker ID is invalid').isUUID(),
    body('pointId', 'Point ID is incorrect').isUUID(),
    body('userId', 'User ID is incorrect').isUUID(),
];

module.exports = createValidator;