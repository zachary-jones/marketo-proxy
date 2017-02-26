const url = require('url');
const http = require('https');
var mulesoftConfig = require('../../../config/mulesoft')();

function get_access_token(callback) {
    var urlObject = {
        protocol: 'https:',
        host: mulesoftConfig.munchkin_id +'.mktorest.com/',
        pathname: "identity/oauth/token",
        query: {
            client_id: mulesoftConfig.client_id,
            client_secret: mulesoftConfig.client_secret
        }
    };
    
    http.get(encodeURI(url.format(urlObject)), function(response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(data));
        });
    }).end();
}

var mkto = {
    access_token: get_access_token
}

module.exports = mkto;


