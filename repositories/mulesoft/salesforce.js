var mulesoftHelper = require('./helpers/mulesoft');

function getPrograms(ucid, env, callback) {
    api = mulesoftHelper.getConfig(env).programInfo;
    api.query.institutionid = ucid
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getUniversities(env, callback) {
    api = mulesoftHelper.getConfig(env).getInstitutions;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

var salesforce = { 
    getUniversityProgramInformation: getPrograms,
    getInstitutions: getUniversities
};

module.exports = function() {
    return salesforce;
}