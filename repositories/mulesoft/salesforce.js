var mulesoftHelper = require('./helpers/mulesoft');
var mulesoftConfig = require('../../config/mulesoft');
const url = require('url');
const querystring = require('querystring');

function getConfig(env) {
    if (env) { 
        mulesoftConfig = mulesoftConfig[env].endpoints;
    } else { 
        mulesoftConfig = mulesoftConfig.prod.endpoints;
    };
    return { 
        env: mulesoftConfig
    }
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
        hostname: url.parse(api.url).hostname,
        path: buildPath(url.parse(api.url).path, querystring.stringify(api.query)),
        headers: api.headers
    }
}

function getPrograms(ucid, env, callback) {
    api = getConfig(env).env.programInfo;
    api.query.institutionid = ucid
    mulesoftHelper.makeRequest(buildOptions(api), callback);
}

var salesforce = { 
    universityProgramInformation: getPrograms
};

module.exports = function() {
    return salesforce;
}