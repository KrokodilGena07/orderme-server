const updateValidator = require('../../validators/updateValidator');
const {body} = require('express-validator');

module.exports = [
    updateValidator,
    body('description', 'Use 1-255 characters').isLength({min: 1, max: 255})
];