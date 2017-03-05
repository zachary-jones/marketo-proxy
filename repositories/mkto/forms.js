var mktoHelper = require('./helpers/mkto');
const querystring = require('querystring');

function reqObject(data) {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/asset/v1/form" + data.path + ".json?" + querystring.stringify(data.query),
    this.headers = {
            'Authorization': 'Bearer ' + data.access_token
    }
};

function getAllForms(data, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "s",
        query: {
            maxReturn: 200
        }
    });
    mktoHelper.makeRequest(reqObj, callback);
}

function getFormByName(data, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "/byName",
        query: {
            name: decodeURIComponent(name)
        }
    });
    mktoHelper.makeRequest(reqObj, callback);
}

function getFormById(data, id, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "/" + id
    });
    mktoHelper.makeRequest(reqObj, callback);
}

var mktoforms = { 
    getAllForms: function(callback) {
        mktoHelper.access_token(function(data) {
            getAllForms(data, callback);
        });
    },
    getFormByName: function(name, callback) {
        mktoHelper.access_token(function(data) {
            getFormByName(data, name, callback);
        });
    },
    getFormById: function(id, callback) {
        mktoHelper.access_token(function(data) {
            getFormById(data, id, callback);
        });
    }    
};

module.exports = function() {
    return mktoforms;
}