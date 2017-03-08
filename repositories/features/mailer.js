'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.sendgriduser,
        pass: process.env.sendgridpw
    }
});

module.exports = {
    sendMessage : function(options) {
        transporter.sendMail(options)
    }
}