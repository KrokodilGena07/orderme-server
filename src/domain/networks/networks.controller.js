const {validationResult} = require('express-validator');
const ApiError = require('../../error/api.error');
const networksService = require('./networks.service');

class NetworksController {
    async create(req, res, next) {
        try {
            const {name, userId, points} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await networksService.create(name, userId, points);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.query;
            const data = await networksService.getOne(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getMany(req, res, next) {
        try {
            const {userId} = req.params;
            const data = await networksService.getMany(userId);
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
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await networksService.update(id, name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await networksService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new NetworksController();