var mktoHelper = require('./helpers/mkto');

function getCustomFields(data, callback) {
    var requestObject = mktoHelper.requestObject("/rest/v1/customobjects.json", "GET", 'Bearer ' + data.access_token);
    requestObject.query.names = "";
    mktoHelper.makeRequest(requestObject, callback);
}

var customFields = {
    getCustomFields: function(callback) {
        mktoHelper.access_token(function(data) {
            getCustomFields(data, callback);
        });
    }
};

module.exports = function() {
  return customFields;
};