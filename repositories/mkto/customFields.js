var mktoHelper = require('./helpers/mkto')
const url = require('url');
const http = require('https');

function reqObject() {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/v1/customobjects.json",
    this.headers = {},
    this.query = {
        names: ""
    }
};

function getCustomFields(data, callback) {
    var reqObj = new reqObject();
    reqObj.headers['Authorization'] = 'Bearer ' + data.access_token;
    reqObj.headers['Content-Type'] = 'application/json';
    mktoHelper.makeRequest(reqObj, callback);
}

var customFields = {
    getCustomFields: function(callback) {
        mktoHelper.access_token(function(data) {
            getCustomFields(data, callback);
        })
    }
}

module.exports = function() {
  return customFields;
};