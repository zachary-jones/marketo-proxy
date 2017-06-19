var url = require('url');
var https = require('https');
var http = require('http');

// get is a help function provided by node as most requests are get requests
function get(urlObject, callback) {
    https.get(encodeURI(url.format(urlObject)), function(res) { readResponse(res, callback); });
}

// standard http request
function request(options, callback) {
    var req;
    options.path = options.pathname || options.path;

    if (options.protocol === "https:") {
        req = https.request(options, function(res) { readResponse(res, callback); });
        if (options.data) {
            options.data = JSON.stringify(options.data);
            options.headers['Content-Length'] = Buffer.byteLength(options.data);
            req.write(options.data);
        }
        req.end();
    } else {
        req = http.request(options, function(res) { readResponse(res, callback); });
        req.end();
    }
}

function readResponse(res, callback) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        callback(parseJSON(data === "" ? null : data));
    });
}

function parseJSON(data) {
    try {
        return JSON.parse(data, null, 4);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    get: function (urlObject, callback) {
        get(urlObject, callback);
    },
    request: function(options, callback) {
        request(options, callback);
    }
};