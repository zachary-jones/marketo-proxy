var mktoHelper = require('../mkto/helpers/mkto');
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

var mktoMigration = {
    getAllForms: function(callback) {
        mktoHelper.access_token_other(function(data) {
            getAllForms(data, callback);
        });
    }
};

module.exports = function() {
    return mktoMigration;
}