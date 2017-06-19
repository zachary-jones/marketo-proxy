var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: 'app64142458@heroku.com',
        pass: 'lyioxaxa6448'
    }
});

//sendGridHerokueAddon
function sendGridHerokuAddon(mail) {
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });
    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });    
}


module.exports = {
    sendMessage : function(options) {
        if (process.env.mode != 'local') {
            this.sendGridHerokuAddon(options.text,options.subject);
        } else {
            try {
                transporter.sendMail(options);
            } catch (error) {
                console.log(error);
            }
        }
    }, sendGridHerokuAddon: function(emailContent, emailSubject) {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('marketo-proxy-leads@bisk.com');
        var toEmail = (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com");
        var to_email = new helper.Email(toEmail);
        var subject = emailSubject;
        var content = new helper.Content('text/plain', emailContent);
        var mail = new helper.Mail(from_email, subject, to_email, content);        
        sendGridHerokuAddon(mail);
    }
}