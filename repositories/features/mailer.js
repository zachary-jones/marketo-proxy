'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app63166551@heroku.com',
        pass: 'xudsbhq07414'
    }
});

module.exports = {
    sendMessage : function(options) {
        transporter.sendMail(options)
    }
}