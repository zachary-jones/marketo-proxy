module.exports = function (subject, content, toAddress, ccAddress) {
    return {
        options: {
            from: '"marketo-proxy-app" <marketo-proxy-leads@bisk.com>',
            to: toAddress || (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com"),
            cc: ccAddress || (process.env.mode == 'local' ? 'zachary-jones@bisk.com; florence-davis@bisk.com' : undefined),
            subject: subject,
            text: content
        },
        transportOptions: {
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME || 'app64170564@heroku.com',
                pass: process.env.SENDGRID_PASSWORD || 'ofkjn9tt8241'
            }
        }
    }
}