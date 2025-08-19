const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const workersService = require('./workerMutator.service');

class WorkersMutatorController {
    async create(req, res, next) {
        try {
            const {firstName, lastName, pinCode, userId, roleId, pointId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await workersService.create(
                firstName, lastName, pinCode, userId, roleId, pointId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, firstName, lastName, pinCode, roleId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await workersService.update(
                id, firstName, lastName, pinCode, roleId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            await workersService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new WorkersMutatorController();