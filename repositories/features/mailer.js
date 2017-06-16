var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app64142458@heroku.com',
        pass: 'lyioxaxa6448'
    }
});

module.exports = {
    sendMessage : function(options) {
        console.log("Beginning email transmission process...");
        try {
            transporter.sendMail(options);
        } catch (error) {
            console.log("Error sending email...");
            console.log(error);
        }
    }
}