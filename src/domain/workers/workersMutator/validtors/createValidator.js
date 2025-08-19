const {body} = require('express-validator');
const workersValidator = require('./workersValidator');

const createValidator = [
    body('userId', 'User ID is incorrect').isUUID(),
    ...workersValidator
];

module.exports = createValidator;