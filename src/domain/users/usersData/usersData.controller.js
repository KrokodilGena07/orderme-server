const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const usersService = require('./usersData.service');

class UsersDataController {
    async get(req, res, next) {
        try {
            const {id} = req.params;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await usersService.get(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const {id, fullName, email} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await usersService.update(id, fullName, email);
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

            await usersService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UsersDataController();