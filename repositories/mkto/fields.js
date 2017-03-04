var mktoHelper = require('./helpers/mkto');
const querystring = require('querystring');


function reqObject(data) {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/asset/v1/form" + data.path + "/fields.json?" + querystring.stringify(data.query),
    this.headers = {
            'Authorization': 'Bearer ' + data.access_token
    }
};

function getFormFieldsByFormId(data, id, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "/" + id,
        query: {
            maxReturn: 200
        }
    });
    mktoHelper.makeRequest(reqObj, callback);
}

var mktofields = { 
    getFormFieldsByFormId: function(id, callback) {
        mktoHelper.access_token(function(data) {
            getFormFieldsByFormId(data, id, callback);
        });
    }    
};

module.exports = function() {
    return mktofields;
}