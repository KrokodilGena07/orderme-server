const createValidator = require('../../validators/createValidator');
const {body} = require('express-validator');

module.exports = [
    createValidator,
    body('description', 'Use 1-255 characters').isLength({min: 1, max: 255})
];