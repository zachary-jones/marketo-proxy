var mulesoftHelper = require('./helpers/mulesoft');
var mulesoftConfig = require('../../config/mulesoft')();
const url = require('url');
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

function getPrograms(ucid, env, callback) {
    api = getConfig(env).programInfo;
    api.query.institutionid = ucid
    mulesoftHelper.makeRequest(buildOptions(api), callback);
}

function getUniversities(env, callback) {
    api = getConfig(env).getInstitutions;
    mulesoftHelper.makeRequest(buildOptions(api), callback);
}

var salesforce = { 
    universityProgramInformation: getPrograms,
    universities: getUniversities
};

module.exports = function() {
    return salesforce;
}