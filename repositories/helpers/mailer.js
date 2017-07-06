var mailerOptions = require('../../config/mailer');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport(mailerOptions().transportOptions);

var mailOptions = function (subject, content, toAddress, ccAddress) {
    return mailerOptions(subject, content, toAddress, ccAddress).options;
};

module.exports = {
    sendMessage: function (subject, content, toAddress, ccAddress) {
        try {
            transporter.sendMail(mailOptions(subject, content, toAddress, ccAddress));
        } catch (error) {
            console.error(error);
        }
    }
}