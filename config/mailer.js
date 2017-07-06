module.exports = function (subject, content, toAddress, ccAddress) {
    return {
        options: {
            from: '"marketo-proxy-app" <marketo-proxy-leads@bisk.com>',
            to: toAddress || (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com"),
            cc: ccAddress || (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : undefined),
            subject: subject,
            text: content
        },
        transportOptions: {
            service: 'SendGrid',
            auth: {
                user: 'app64142458@heroku.com',
                pass: 'lyioxaxa6448'
            }
        }
    }
}