const {UAParser} = require('ua-parser-js');

class SessionsDto {
    constructor(model) {
        const {os, browser, device, engine} = UAParser(model.userAgent);

        this.id = model.id;
        this.date = model.date;
        this.userAgent = [browser.name, os.name, device.model].filter(Boolean);
    }
}

module.exports = SessionsDto;