const url = require('url');
const https = require('https');
const http = require('http');
var mulesoftConfig = require('../../../config/mulesoft')();
const querystring = require('querystring');


function getConfig(env) {
    if (env) { 
        return mulesoftConfig[env].endpoints;
    } else {
        return mulesoftConfig.prod.endpoints;
    };
}

function buildPath(path, query) {
    if (query) {
        return path = path + '?' + query;
    } else {
        return path;
    }
}

function buildOptions(api) {
    return {
        method: 'GET', 
        protocol: url.parse(api.url).protocol,
        hostname: url.parse(api.url).hostname,
        path: buildPath(url.parse(api.url).path, querystring.stringify(api.query)),
        headers: api.headers
    }
}

function makeRequest(options, callback) {
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
    makeRequest: makeRequest,
    getConfig: getConfig,
    buildPath: buildPath,
    buildOptions: buildOptions,
    legacy: mulesoftConfig.legacy
}

module.exports = salesforce;


