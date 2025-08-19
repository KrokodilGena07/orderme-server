const {validationResult} = require('express-validator');
const ApiError = require('../../../error/api.error');
const authService = require('./auth.service');

const cookieOptions = {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000
};

class AuthController {
    async registration(req, res, next) {
        try {
            const {fullName, email, cafe, subscriptionId, address, cafeTypeId} = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const data = await authService.registration(
                fullName, email, cafe, subscriptionId, address, cafeTypeId
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email} = req.body;
            const data = await authService.login(email);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userAgent = req.headers['user-agent'];
            await authService.logout(refreshToken, userAgent);
            res.clearCookie('refreshToken');
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userAgent = req.headers['user-agent'];
            const data = await authService.refresh(refreshToken, userAgent);
            console.log(123, refreshToken)
            res.cookie('refreshToken', data.refreshToken, cookieOptions);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();