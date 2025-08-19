const {body} = require('express-validator');

module.exports = body('name', 'Invalid length. Use 1–255 characters.')
    .isLength({min: 1, max: 255});