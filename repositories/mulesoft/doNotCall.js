var app = require('../../app');
var http = require('../helpers/http');


function sendConfirmation(options, callback) {
    //send confimartion email
    app.locals.mailer.sendEmail("Confirm", "<a href='http://localhost:3000/unsubscribe/confirmation?key="+ Math.random() +"'>please confirm</a>", options.email, "florence-davis@bisk.com");
    callback();
}

function getUnsubscribeConfirmationURL() {
    return  'https://dnc-sf-sync-qa.cloudhub.io/updatednc';
}   

var lib = { 
    sendConfirmation: sendConfirmation,
    unsubscribe: function (options, callback) {
        http.request(
        { 
            protocol: 'https:',
            hostname: 'dnc-sf-sync-qa.cloudhub.io',
            path: 'updatednc',
            method: "POST", 
            data: options
        }, callback);            
    }
};

module.exports = function() {
    return lib;
}