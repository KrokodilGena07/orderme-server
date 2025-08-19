const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const storageItemsService = require('./storageItems.service');

class StorageItemsController {
    async get(req, res, next) {
        try {
            const {userId, pointId, networkId} = req.query;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Data is incorrect', errors.array()));
            }

            const data = await storageItemsService.get(userId, pointId, networkId);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new StorageItemsController();