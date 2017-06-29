var mktoHelper = require('./helpers/mkto');
var querystring = require('querystring');

var allFields = [];

function getFormFieldsByFormId(data, id, callback) {
    data.query = {
        maxReturn: 200
    }
    var requestObject = mktoHelper.requestObject("/rest/asset/v1/form/" + id + "/fields.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);    
    mktoHelper.makeRequest(requestObject, callback);
}

function getFormFields(data, callback, offset) {
    data.query = {
        maxReturn: 200,
        offset: offset || 0
    }
    var requestObject = mktoHelper.requestObject("/rest/asset/v1/form/fields.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);    
    mktoHelper.makeRequest(requestObject, function(httpResult) {
        if (httpResult.result.length === 200) {
            pushFieldToAllFields(httpResult.result);
            getFormFields(data, callback, 200);
        } else {
            pushFieldToAllFields(httpResult.result);
            callback(allFields);
        }
    });
}

function pushFieldToAllFields(fields) {
    for (var i = 0; i < fields.length; i++) {
        allFields.push(fields[i]);        
    }
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