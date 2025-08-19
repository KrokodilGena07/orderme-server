const {param} = require('express-validator');

module.exports = param('id', 'ID is invalid').isUUID();