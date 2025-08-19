const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const isImage = require('../../../validators/isImage');
const deliveryService = require('./delivery.service');

class DeliveryController {
    async create(req, res, next) {
        try {
            const {userId, storageId, pointId, data, networkId, workerId} = req.body;
            const files = req.files;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            if (files?.image) {
                if (!isImage(files.image)) {
                    return next(ApiError.badRequest('image error', errors.array()));
                }
            }

            const delivery = await deliveryService.create(
                userId, storageId, pointId, JSON.parse(data), files?.image, networkId, workerId
            );
            res.json(delivery);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DeliveryController();