const url = require('url');
const https = require('https');
const http = require('http');
var mulesoftConfig = require('../../../config/mulesoft')();
const querystring = require('querystring');


function getConfig(env) {
    if (env !== undefined) { 
        return mulesoftConfig[env].endpoints;
    } else if (env === 'enrollment') {
        mulesoftConfig.enrollment.endpoints;
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
        method: api.method || "GET", 
        protocol: url.parse(api.url).protocol,
        hostname: url.parse(api.url).hostname,
        path: buildPath(url.parse(api.url).path, querystring.stringify(api.query)),
        headers: api.headers,
        data: api.data
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
                callback(data);
            });
        });
        if (options.data) {
            var postData = JSON.stringify(options.data)
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(postData);
            req.write(postData);
        }
        req.end();
    } else {
        var req = http.request(options, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                callback(data);
            });
        });
        req.end();
    }
}

function simpleAssign(dest, src) {
   for (var key in src) {
       if (dest.hasOwnProperty(key)) {
           dest[key] = src[key];
       }
   }
   return dest;
}

var salesforce = {
    makeRequest: makeRequest,
    getConfig: getConfig,
    buildPath: buildPath,
    buildOptions: buildOptions,
    legacy: mulesoftConfig.legacy,
    simpleAssign: simpleAssign
}

module.exports = salesforce;


