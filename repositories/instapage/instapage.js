var domainSFIDMap = require('../../config/domainSFIDMap');
var instapageConfig = require('../../config/instapage');

function determineSalesforceId(value, callback) {
    var sfid = '';
    var found = false;
    if (domainSFIDMap) {
        sfid = domainSFIDMap.find(function(item) {
            return (item[0].indexOf(value) > -1);
        })
    }
    callback(sfid[1]);    
}

function getPrepopOptions() {
    return instapageConfig.standardOptions;
}

var instapage = { 
    determineSalesforceId: determineSalesforceId,
    standardOptions: getPrepopOptions
};

module.exports = function() {
    return instapage;
}