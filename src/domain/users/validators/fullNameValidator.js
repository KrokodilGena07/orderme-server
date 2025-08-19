const {body} = require('express-validator');

module.exports = body('fullName')
    .isLength({min: 1, max: 255})
    .custom((value, {req}) => {
        const data = value.split(/\s+/).filter(Boolean);
        if (data.length === 3) {
            return req.body.fullName = data.join(' ');
        }
        throw new Error('FullName is incorrect');
    });