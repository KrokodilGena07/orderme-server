const {User, Session, Point, AuthType, Subscription, CafeType} = require('../../../models');
const ApiError = require('../../../error/api.error');
const uuid = require('uuid');
const mailService = require('../mail/mailSerivce');
const tokenService = require('../token/tokenService');
const UserDto = require('./dtos/UserDto');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

class AuthService {
    async registration(fullName, email, cafe, subscriptionId, address, cafeTypeId) {
        const id = uuid.v4();
        const activationCode = crypto.randomInt(0, 1000000).toString().padStart(6, '0');

        const subscription = await Subscription.findByPk(subscriptionId);
        if (!subscription) {
            throw ApiError.badRequest('Subscription wasn\'t found');
        }

        const cafeType = await CafeType.findByPk(cafeTypeId);
        if (!cafeType) {
            throw ApiError.badRequest('Cafe type wasn\'t found');
        }

        const authType = await AuthType.findOne({where: {name: '1FA'}});

        const newUser = await User.create({
            id, fullName, email, activationCode, subscriptionId, authTypeId: authType.id
        });
        await mailService.sendMail(email, activationCode);

        const pointId = uuid.v4();
        await Point.create({name: cafe, address, id: pointId, cafeTypeId, userId: id});

        return {id: newUser.id};
    }

    async login(email) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Email error', [
                {msg: 'User with this email wasn\'t found', path: 'email'}
            ]);
        }

        const activationCode = crypto.randomInt(0, 1000000).toString().padStart(6, '0');

        const code = activationCode.length === 6 ? activationCode : activationCode + '0'
        user.activationCode = code;
        await user.save();
        await mailService.sendMail(email, code);

        return {id: user.id};
    }

    async logout(refreshToken, userAgent) {
        if (!refreshToken || !userAgent) {
            throw ApiError.badRequest('Data is empty');
        }

        const session = await Session.findOne({where: {refreshToken, userAgent}});
        if (!session) {
            throw ApiError.badRequest('Session wasn\'t found');
        }

        await session.destroy();
    }

    async refresh(refreshToken, userAgent) {
        if (!refreshToken) {
            throw ApiError.unauthorized();
        }

        const tokenFromDB = await Session.findOne({where: {refreshToken, userAgent}});
        const decodedToken = tokenService.validateRefreshToken(refreshToken);

        if (!tokenFromDB || !decodedToken) {
            throw ApiError.unauthorized();
        }

        const user = await User.findByPk(tokenFromDB.userId, {
            include: [
                {model: Subscription, attributes: ['name']}
            ]
        });
        if (!user) {
            throw ApiError.badRequest('user wasn\'t found');
        }

        const tokens = tokenService.generateTokens({
            id: user.id, email: user.email
        });
        const session = await tokenService.saveToken(tokens.refreshToken, user.id, userAgent);
        const userDto = new UserDto(user);
        return {
            user: userDto,
            ...tokens,
            sessionId: session.id
        };
    }
}

module.exports = new AuthService();