const jwt = require('jsonwebtoken');
const {Session} = require('../../../models');
const uuid = require('uuid');

class TokenService {
    generateTokens(payload) {
        return {
            accessToken: jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: '30m'}),
            refreshToken: jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'}),
        };
    }

    generatePassToken(payload) {
        return jwt.sign(payload, process.env.PASSWORD_SECRET_KEY, {expiresIn: '5m'})
    }

    async saveToken(token, userId, userAgent) {
        const session = await Session.findOne({where: {userId, userAgent}});
        if (!session) {
            const id = uuid.v4();
            return Session.create({id, refreshToken: token, userId, userAgent});
        }
        session.refreshToken = token;
        session.date = new Date();
        return await session.save();
    }

    async validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }

    async validatePassToken(token) {
        try {
            return jwt.verify(token, process.env.PASSWORD_SECRET_KEY);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();