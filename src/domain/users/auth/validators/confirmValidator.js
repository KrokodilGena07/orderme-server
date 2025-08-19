const {body} = require('express-validator');

const confirmValidator = [
    body('id', 'id is invalid').isUUID(),
    body('code', 'code is invalid').isNumeric(),
];

module.exports = confirmValidator;