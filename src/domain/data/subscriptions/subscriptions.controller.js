const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const subscriptionService = require('./subscriptions.service');

class SubscriptionsController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await subscriptionService.create(name);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const data = await subscriptionService.get();
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

            const data = await subscriptionService.update(id, name);
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

            await subscriptionService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SubscriptionsController();