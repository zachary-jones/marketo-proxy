var app = require('../../../app');
var http = require('../../helpers/http');
var marketo = require('../../../config/marketo')(app.locals.IsProduction()).default;

function reqObject(path, httpMethod, authorization) {
    this.method = httpMethod;
    this.protocol = 'https:';
    this.hostname = marketo.munchkin_id + ".mktorest.com";
    this.pathname = path;
    this.headers = {
        Authorization: authorization,
        'Content-Type': 'application/json'
    };
    this.query = {
        fields: "firstName,lastName,email,updatedAt,id,phone,status"
    };
    if (authorization === '' || authorization === undefined) {
        delete this.headers.Authorization;
    }
    return this;
}

function access_token(environment, callback) {
    var requestObject = new reqObject("identity/oauth/token", "GET");
    requestObject.query = {
            munchkin_id: environment.munchkin_id,
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            grant_type: environment.grant_type
        };
    http.get(requestObject, callback);
}

var mkto = {
    munchkin_id: marketo.munchkin_id,
    access_token: function(callback) {
        access_token(marketo, callback);
    },
    access_token_other: function(callback) {
        access_token(require('../../../config/marketo')(app.locals.IsProduction()).other, callback);
    },
    makeRequest: function(options, callback) {
        http.request(options, callback);
    },
    requestObject: function(path, httpMethod, authorization) {
        return new reqObject(path, httpMethod, authorization);
    }
};

module.exports = mkto;