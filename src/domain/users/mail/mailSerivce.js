const nodemailer = require('nodemailer');

class MailService {
    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    async sendMail(to, code) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Authentication',
            html: `<h1>${code}</h1>`
        });
    }
}

module.exports = new MailService();