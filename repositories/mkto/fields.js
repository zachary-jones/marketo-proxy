var mktoHelper = require('./helpers/mkto');
var querystring = require('querystring');

function getFormFieldsByFormId(data, id, callback) {
    data.query = {
        maxReturn: 200
    }
    var requestObject = mktoHelper.requestObject("/rest/asset/v1/form/" + id + "/fields.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);    
    mktoHelper.makeRequest(requestObject, callback);
}

function getFormFields(data, callback) {
    data.query = {
        maxReturn: 200
    }
    var requestObject = mktoHelper.requestObject("/rest/asset/v1/form/fields.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);    
    mktoHelper.makeRequest(requestObject, callback);
}

var mktofields = { 
    getFormFieldsByFormId: function(id, callback) {
        mktoHelper.access_token(function(data) {
            getFormFieldsByFormId(data, id, callback);
        });
    },
    getFormFields: function(id, callback) {
        mktoHelper.access_token(function(data) {
            getFormFields(data, id, callback);
        });
    }   
};

module.exports = function() {
    return mktofields;
}