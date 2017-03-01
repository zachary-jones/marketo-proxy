const url = require('url');
const http = require('https');

function makeRequest(options, callback) {
    var req = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(JSON.parse(data));
        });
    });
    req.end();
}

var salesforce = {
    makeRequest: makeRequest
}

module.exports = salesforce;


