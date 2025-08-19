const {body} = require('express-validator');
const workersValidator = require('./workersValidator');

const createValidator = [
    body('id', 'ID is incorrect').isUUID(),
    ...workersValidator
];

module.exports = createValidator;