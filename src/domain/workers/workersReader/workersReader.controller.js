const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const workersReaderService = require('./workersReader.service');

class WorkersReaderController {
    async getOne(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await workersReaderService.getOne(req.query);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getMany(req, res, next) {
        try {
            const {userId, pointId, networkId} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await workersReaderService.getMany(userId, pointId, networkId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new WorkersReaderController();