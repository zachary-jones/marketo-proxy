var mulesoftHelper = require('./helpers/mulesoft');

var legacySF = mulesoftHelper.legacy;

function getPrograms(ucid, env, callback) {
    api = mulesoftHelper.getConfig(env).programInfo;
    api.query.institutionid = ucid
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getLegacy() {
    return mulesoftHelper.legacy;
}

function getSFID(path) {
    return mulesoftHelper.legacy;
}

function determineSalesforceId(value, callback) {
    var sfid = '';
    var found = false;
    if (mulesoftHelper.domainSFIDMap) {
        sfid = mulesoftHelper.domainSFIDMap.find(function(item) {
            return (item[0].indexOf(value) > -1);
        })
    }
    callback(sfid[1]);    
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

function getAllUniversityProgramInformation(list) {
    var deferred = Promise.defer();
    options = {
        path: '/mulesoft/salesforce/getUniversityProgramsOfInterest/' + legacySF.shift() + '/',
        port: 3000,
        hostname: 'localhost'
    }
    http.get(options, function(response) {
        var responseBody = "";
        response.on('data', function(chunck) { responseBody += chunck });
        response.on('end', function() {
            var jsonResponse = JSON.parse(responseBody);
            list.push(data);
            if(ucid != ucid.length) {
                getAllUniversityProgramInformation(list)
                .then(function() {
                    deferred.resolve();
                });
            }
            else {
                deferred.resolve();
            }
        });
    });
    return deferred.promise;
}

var salesforce = { 
    getUniversityProgramInformation: getPrograms,
    getSalesforcePois: getSalesforcePois,
    determineSalesforceId: determineSalesforceId,
    getAllUniversityProgramInformation, getAllUniversityProgramInformation,
    getInstitutions: getUniversities,
    getSFID: getSFID,
    legacy: legacy
};

module.exports = function() {
    return salesforce;
}