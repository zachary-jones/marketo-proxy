var salesforceDomainMap = require('../../config/salesforceDomainMap');
var instapageConfig = require('../../config/instapage');

function determineSalesforceId(hostname, callback) {
    var salesforceInstitutionId = getSalesforceInstitutionId(hostname);
    callback(salesforceInstitutionId);    
}

function getPrepopOptions() {
    return instapageConfig.standardOptions;
}

// private functions
function getSalesforceInstitutionId(hostname) {
    var found = salesforceDomainMap.find(function(dictionaryItem_OfHostname_AndSalesforceId) {
        return (dictionaryItem_OfHostname_AndSalesforceId[0].indexOf(hostname) > -1);
    });
    return found[1];
}
// / private functions

var instapage = { 
    determineSalesforceId: determineSalesforceId,
    standardOptions: getPrepopOptions
};

module.exports = function() {
    return instapage;
}