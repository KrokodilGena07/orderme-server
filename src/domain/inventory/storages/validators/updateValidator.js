const {body} = require('express-validator');

const updateValidator = [
    body('id', 'ID is invalid').isUUID(),
    body('name', 'Use 1-255 characters').isLength({min: 1, max: 255})
];

module.exports = updateValidator;