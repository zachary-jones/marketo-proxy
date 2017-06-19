var mktoHelper = require('./helpers/mkto');
var querystring = require('querystring');

function getAllForms(data, callback) {
    data.query = {
        maxReturn: 200
    };
    var reqObj = mktoHelper.requestObject("/rest/asset/v1/forms.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);
    mktoHelper.makeRequest(reqObj, callback);
}

function getFormByName(data, name, callback) {
    data.query = {
        name: decodeURIComponent(name)
    };
    var reqObj = mktoHelper.requestObject("/rest/asset/v1/form/byName.json?" + querystring.stringify(data.query), "GET", 'Bearer' + data.access_token);
    mktoHelper.makeRequest(reqObj, callback);
}

function getFormById(data, id, callback) {
    var reqObj = mktoHelper.requestObject("/rest/asset/v1/form/" + id + ".json", "GET", 'Bearer' + data.access_token);
    mktoHelper.makeRequest(reqObj, callback);
}

var mktoforms = {
    getAllForms: function (callback) {
        mktoHelper.access_token(function (data) {
            getAllForms(data, callback);
        });
    },
    getFormByName: function (name, callback) {
        mktoHelper.access_token(function (data) {
            getFormByName(data, name, callback);
        });
    },
    getFormById: function (id, callback) {
        mktoHelper.access_token(function (data) {
            getFormById(data, id, callback);
        });
    }
};

module.exports = function () {
    return mktoforms;
};