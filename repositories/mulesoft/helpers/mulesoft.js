const url = require('url');
const https = require('https');
const http = require('http');

function makeRequest(options, callback) {
    console.log(options)
    if (options.protocol === "https:") {
        var req = https.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                callback(JSON.parse(data));
            });
        });
        req.end();
    } else {
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
}

var salesforce = {
    makeRequest: makeRequest
}

module.exports = salesforce;


