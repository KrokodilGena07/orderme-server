const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const unitsService = require('./units.service');

class UnitsController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await unitsService.create(name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const data = await unitsService.get();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {name, id} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await unitsService.update(id, name);
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

            await unitsService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UnitsController();