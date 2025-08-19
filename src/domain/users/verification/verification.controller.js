const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const confirmService = require('./verification.service');
const getCookieOptions = require('../../../utils/getCookieOptions');

class VerificationController {
    async confirm1Step(req, res, next) {
        try {
            const {id, code} = req.body;
            const userAgent = req.headers['user-agent'];

            if (!id || !userAgent) {
                return next(ApiError.badRequest('Data is empty'));
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error', errors.array()));
            }

            const data = await confirmService.confirm1Step(id, code, userAgent);
            if (data.authType === '1FA') {
                res.cookie('refreshToken', data.refreshToken, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async confirm2Step(req, res, next) {
        try {
            const {passToken, pass} = req.body;
            const userAgent = req.headers['user-agent'];

            if (!passToken || !pass) {
                return next(ApiError.badRequest('Data is empty'));
            }

            const data = await confirmService.confirm2Step(passToken, pass, userAgent);
            res.cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new VerificationController();