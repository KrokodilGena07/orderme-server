const {validationResult} = require('express-validator');
const ApiError = require('../../error/api.error');
const isImage = require('../../validators/isImage');
const productsService = require('./products.service');

class ProductsController {
    async create(req, res, next) {
        try {
            const {name, price, markup, userId, pointId, parentId, unitId, unitCount, ingredients} = req.body;
            const files = req.files;
            const allErrors = [];

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                allErrors.push(...errors.array());
            }

            if (files?.image) {
                if (!isImage(files.image)) {
                    allErrors.push({msg: 'Image is incorrect', path: 'image'});
                }
            }

            if (allErrors.length) {
                return next(ApiError.badRequest('Validation error', allErrors));
            }

            const data = await productsService.create(
                name, price, markup, userId, pointId, parentId, files?.image, unitId, unitCount, ingredients
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const {userId, pointId, networkId, parentId} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await productsService.get(userId, pointId, networkId, parentId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {

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

            await productsService.delete(id);
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ProductsController();