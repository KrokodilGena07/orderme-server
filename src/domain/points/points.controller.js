const {validationResult} = require('express-validator');
const ApiError = require('../../error/api.error');
const pointsService = require('./points.service');
const {logger} = require('sequelize/lib/utils/logger');

class PointsController {
    async create(req, res, next) {
        try {
            const {userId, name, address, cafeTypeId, networkId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await pointsService.create(
                userId, name, address, cafeTypeId, networkId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.query;
            const data = await pointsService.getOne(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async getMany(req, res, next) {
        try {
            const {userId} = req.params;
            const data = await pointsService.getMany(userId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, cafe, address, type, networkId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await pointsService.update(id, cafe, address, type, networkId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await pointsService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new PointsController();