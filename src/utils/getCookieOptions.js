function getCookieOptions() {
    return  {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    };
}

module.exports = getCookieOptions;