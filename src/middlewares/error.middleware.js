const ApiError = require('../error/api.error');

function errorMiddleware(err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    res.status(500).json({message: 'Internal Server Error', errors: []});
}

module.exports = errorMiddleware;