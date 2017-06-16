var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app64142458@heroku.com',
        pass: 'lyioxaxa6448'
    }
});

//sendGridHerokueAddon
function sendGridHerokuAddon(mailer) {
    console.log("Beginning email transmission sendGridHerokuAddon..." + process.env.SENDGRID_API_KEY);
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    console.log(mailer.toJSON());
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mailer.toJSON(),
    });
    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });    
}


module.exports = {
    sendMessage : function(options) {
        console.log("Beginning email transmission process...");
        console.log(options);
        if (process.env.mode != 'local') {
            this.sendGridHerokuAddon('test', 'test email');
        } else {
            try {
                transporter.sendMail(options);
            } catch (error) {
                console.log("Error sending email...");
                console.log(error);
            }
        }
    }, sendGridHerokuAddon: function(emailContent, emailSubject) {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('marketo-proxy-leads@bisk.com');
        var to_email = new helper.Email((process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com"));
        var subject = emailSubject;
        var content = new helper.Content('text/plain', emailContent);
        var mail = new helper.Mail(from_email, subject, to_email, content);        
        sendGridHerokuAddon(mail);
    }
}