const rolesService = require('./roles.service');
const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');

class RolesController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await rolesService.create(name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const data = await rolesService.get();
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await rolesService.update(id, name);
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

            await rolesService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RolesController();