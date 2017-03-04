var domainSFIDMap = require('../../config/domainSFIDMap');

/**
 * returns the sfid from the value passed by map to the domainSFIDMap
 */
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

var instapage = { 
    determineSalesforceId: determineSalesforceId,
};

module.exports = function() {
    return instapage;
}