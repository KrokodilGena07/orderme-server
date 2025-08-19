const {User, AuthType} = require('../../../models');
const ApiError = require('../../../error/api.error');
const tokenService = require('../token/tokenService');
const UserDto = require('../auth/dtos/UserDto');
const bcrypt = require('bcrypt');

class VerificationService {
    async confirm1Step(id, code, userAgent) {
        const user = await User.findByPk(
            id,
            {
                include: [
                    {model: AuthType, attributes: ['name']}
                ]
            }
        );

        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        if (user.activationCode !== Number(code)) {
            throw ApiError.badRequest('Code is wrong');
        }

        switch (user.authType.name) {
            case '1FA':
                return this.#finishVerification(user, userAgent, user.authType.name);
            case '2FA':
                return {
                    token: tokenService.generatePassToken({id: user.id, email: user.email}),
                    authType: user.authType.name
                };
        }
    }

    async confirm2Step(passToken, pass, userAgent) {
        const token = await tokenService.validatePassToken(passToken);
        if (!token) {
            throw ApiError.badRequest('Token is invalid');
        }

        const user = await User.findByPk(token.id);
        if (!user) {
            throw ApiError.badRequest('User wasn\'t found');
        }

        const isPassEqual = await bcrypt.compare(pass, user.pass);
        if (!isPassEqual) {
            throw ApiError.badRequest('Password error', [
                {msg: 'Password is wrong', path: 'pass'}
            ]);
        }

        return this.#finishVerification(user, userAgent);
    }

    async #finishVerification(user, userAgent, authType) {
        const tokens = tokenService.generateTokens({
            id: user.id, email: user.email
        });

        const session = await tokenService.saveToken(tokens.refreshToken, user.id, userAgent);
        const userDto = new UserDto(user);

        return {
            user: userDto,
            ...tokens,
            sessionId: session.id,
            authType
        };
    }
}

module.exports = new VerificationService();