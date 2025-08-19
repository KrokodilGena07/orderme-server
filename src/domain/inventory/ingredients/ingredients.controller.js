const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const ingredientService = require('./ingredients.service');
const isImage = require('../../../validators/isImage');

class IngredientsController {
    async create(req, res, next) {
        try {
            const {name, unitId, pricePerUnit, userId, pointId, networkId, minStock} = req.body;
            const files = req.files;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            if (files?.image) {
                if (!isImage(files.image)) {
                    return next(ApiError.badRequest('image error'));
                }
            }

            const data = await ingredientService.create(
                name, unitId, pricePerUnit, userId, pointId, minStock, files?.image, networkId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const {userId, pointId, networkId} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await ingredientService.get(userId, pointId, networkId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, unit, pricePerUnit, networkId, minStock} = req.body;
            const files = req.files;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            if (files?.image) {
                if (!isImage(files.image)) {
                    return next(ApiError.badRequest('image error'));
                }
            }

            const data = await ingredientService.update(
                id, name, unit, pricePerUnit, minStock, files?.image, networkId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const error = validationResult(req);
            if (!error.isEmpty()) {
                return next(ApiError.badRequest('validation error', error.array()));
            }

            const data = await ingredientService.delete(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new IngredientsController();