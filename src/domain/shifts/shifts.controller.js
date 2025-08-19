const {validationResult} = require('express-validator');
const ApiError = require('../../error/api.error');
const shiftsService = require('./shifts.service');

class ShiftsController {
    async connectWorkerToShift(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await shiftsService.connectWorkerToShift(req.body);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ShiftsController();