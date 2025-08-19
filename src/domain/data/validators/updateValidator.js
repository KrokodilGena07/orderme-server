const createValidator = require('./createValidator');
const {body} = require('express-validator');

const updateValidator = [
    createValidator,
    body('id', 'Id is incorrect').isUUID()
];

module.exports = updateValidator;