const {query} = require('express-validator');

const sessionsValidator = query('ids')
    .custom((value, {req}) => {
        let array;
        try {
            array = JSON.parse(value);
        } catch (e) {
            throw new Error('data is invalid');
        }
        if (!(array instanceof Array)) {
            throw new Error('data is invalid');
        }
        req.query.ids = array;
    });

module.exports = sessionsValidator;