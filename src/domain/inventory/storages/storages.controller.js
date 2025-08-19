const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const storagesService = require('./storages.service');
const isImage = require('../../../validators/isImage');

class StoragesController {
    async create(req, res, next) {
        try {
            const {name, pointId, userId} = req.body;
            const files = req.files;
            const errors = validationResult(req);
            const resultErrors = [];

            if (!errors.isEmpty()) {
                resultErrors.push(...errors.array());
            }

            if (files?.image) {
                if (!isImage(files.image)) {
                    resultErrors.push({path: 'image', msg: 'Image is incorrect'});
                }
            }

            if (resultErrors.length >= 1) {
                return next(ApiError.badRequest('Image error', resultErrors));
            }

            const data = await storagesService.create(name, pointId, userId, files?.image);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async get(req, res, next) {
        try {
            const {userId, networkId, pointId} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await storagesService.get(userId, networkId, pointId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        const files = req.files;
        const errors = validationResult(req);
        const resultErrors = [];

        if (!errors.isEmpty()) {
            resultErrors.push(...errors.array());
        }

        if (files?.image) {
            if (!isImage(files.image)) {
                resultErrors.push({path: 'image', msg: 'Image is incorrect'});
            }
        }

        if (resultErrors.length >= 1) {
            return next(ApiError.badRequest('Image error', resultErrors));
        }

        const data = await storagesService.update({
            ...req.body, image: files?.image
        });
        res.json(data);
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await storagesService.delete(id);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new StoragesController();