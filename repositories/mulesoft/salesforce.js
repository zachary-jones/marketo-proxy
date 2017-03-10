var mulesoftHelper = require('./helpers/mulesoft');

function getPrograms(ucid, env, callback) {
    api = mulesoftHelper.getConfig(env).programInfo;
    api.query.institutionid = ucid
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getAllSalesforceIds() {
    return mulesoftHelper.legacy;
}

function getUniversities(env, callback) {
    api = mulesoftHelper.getConfig(env).getInstitutions;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getSalesforcePois(institutionId, env, callback) {
    api = mulesoftHelper.getConfig(env).getSalesForcePois;
    api.data.institutionId = institutionId
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

var salesforce = { 
    getUniversityProgramInformation: getPrograms,
    getSalesforcePois: getSalesforcePois,
    getInstitutions: getUniversities,
    getAllSalesforceIds: getAllSalesforceIds,
    legacy: legacy
};

module.exports = function() {
    return salesforce;
}