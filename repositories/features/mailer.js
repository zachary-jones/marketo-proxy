var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app63166551@heroku.com',
        pass: 'xudsbhq07414'
    }
});

module.exports = {
    sendMessage : function(options) {
        try {
            transporter.sendMail(options);
        } catch (error) {
            console.log("Error sending email...");
            console.log(error);
        }
    }
}