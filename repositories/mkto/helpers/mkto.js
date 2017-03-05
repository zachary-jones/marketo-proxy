const url = require('url');
const https = require('https');
const http = require('http');
var mktoConfig = require('../../../config/mkto')().default;
var mktoConfigOther = require('../../../config/mkto')().other;

function get_access_token(callback) {
    var urlObject = {
        protocol: 'https:',
        host: mktoConfig.munchkin_id +'.mktorest.com/',
        pathname: "identity/oauth/token",
        query: {
            munchkin_id: mktoConfig.munchkin_id,
            client_id: mktoConfig.client_id,
            client_secret: mktoConfig.client_secret,
            grant_type: mktoConfig.grant_type
        }
    };
    console.dir(urlObject)    
    https.get(encodeURI(url.format(urlObject)), function(response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(data));
        });
    }).end();
}

function get_access_token_other(callback) {
    var urlObject = {
        protocol: 'https:',
        host: mktoConfigOther.munchkin_id +'.mktorest.com/',
        pathname: "identity/oauth/token",
        query: {
            munchkin_id: mktoConfigOther.munchkin_id,
            client_id: mktoConfigOther.client_id,
            client_secret: mktoConfigOther.client_secret,
            grant_type: mktoConfigOther.grant_type
        }
    };
    console.dir(urlObject)
    https.get(encodeURI(url.format(urlObject)), function(response) {
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(data));
        });
    }).end();
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
                response = data;
                try {
                    response = JSON.parse(data, null, 4)
                } catch (e) {
                    console.log(e)
                }
                callback(response);
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
                callback(JSON.parse(data, null, 4));
            });
        });
        req.end();
    }
}

var mkto = {
    munchkin_id: mktoConfig.munchkin_id,
    access_token: get_access_token,
    access_token_other: get_access_token_other,
    makeRequest: makeRequest
}

module.exports = mkto;


