var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app64142458@heroku.com',
        pass: 'lyioxaxa6448'
    }
});

var mailOptions = function (subject, content, toAddress, ccAddress) {
    return {
        from: '"marketo-proxy-app" <marketo-proxy-leads@bisk.com>',
        to: toAddress || (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com"),
        cc: ccAddress || 'zachary-jones@bisk.com',
        subject: subject,
        text: content,
    };
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