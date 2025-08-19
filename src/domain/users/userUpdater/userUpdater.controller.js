const {validationResult} = require('express-validator');
const {badRequest} = require('../../../error/api.error');
const userUpdaterService = require('./userUpdater.service');

class UserUpdaterController {
    async updateAuthMethod(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(badRequest('Validation error', errors.array()));
            }

            const data = await userUpdaterService.updateAuthMethod(req.body);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserUpdaterController();