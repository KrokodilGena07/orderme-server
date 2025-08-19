const fullNameValidator = require('../../validators/fullNameValidator');
const {body} = require('express-validator');

const updateValidator = [
    fullNameValidator,
    body('id', 'ID is incorrect').isUUID()
];

module.exports = updateValidator;