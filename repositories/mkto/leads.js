var mktoHelper = require('./helpers/mkto')
const url = require('url');
const http = require('https');

function reqObject() {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/v1/leads.json",
    this.headers = {},
    this.query = {
        fields: "firstName,lastName,email,updatedAt,id,phone"
    }
};

function reqPushObject() {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/v1/leads/push.json",
    this.headers = {},
    this.query = {
        fields: "firstName,lastName,email,updatedAt,id,phone"
    }
};

function upsertLead(data, callback) {
    var requestObject = new reqObject();
    var retURL = undefined;
    if (data && data.body.save && data.body.save.hasOwnProperty('retURL')) {
        retURL = data.body.save['retURL']; 
        delete data.body.save;
        delete data.body[''];
    }
    var postData = JSON.stringify({   
        "action": "createOrUpdate",
        "lookupField": "email",
        "input":[data.body]
    });

    requestObject.method = 'POST';
    requestObject.headers['Authorization'] = 'Bearer ' + data.access_token;
    requestObject.headers['Content-Type'] = 'application/json';
    requestObject.headers['Content-Length'] = Buffer.byteLength(postData);

    var req = http.request(requestObject, function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(str), retURL);
        });       
    });
    req.write(postData);
    req.end();
}

function pushLead(data, callback) {
    var requestObject = new reqPushObject();
    var postData = {   
        lookupField: "email"
    };    
    var retURL = undefined;
    retURL = data.body.save['retURL']; 
    postData.programName = data.body.save.Program;
    delete data.body.save;    
    delete data.body[''];    
    postData.input = []
    postData.input.push(data.body);
    postData = JSON.stringify(postData)

    requestObject.method = 'POST';
    requestObject.headers['Authorization'] = 'Bearer ' + data.access_token;
    requestObject.headers['Content-Type'] = 'application/json';
    requestObject.headers['Content-Length'] = Buffer.byteLength(postData);

    var req = http.request(requestObject, function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(str), retURL);
        });       
    });
    //console.dir(req)
    console.dir(postData)
    req.write(postData);
    req.end();
}

function getLeadsBy(data, filterType, filterValue, callback) {
    var requestObject = new reqObject();
    
    requestObject.query.filterType = filterType;
    requestObject.query.filterValues = filterValue;
    requestObject.headers['Authorization'] = 'Bearer ' + data.access_token;
    if (data.customFields) {
        for (var index = 0; index < data.customFields.length; index++) {
            var field = customFields[index];
            urlObject.query.fields += ',' + field;
        }
    }

    var parsedUrl = url.parse(url.format(requestObject));
    requestObject.path += parsedUrl.path;
    var req = http.request(requestObject, function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            callback(JSON.parse(str));
        });
    })
    req.end();
} 

var mkto = {
    getLeadsBy: function(type, value, callback) {
        mktoHelper.access_token(function(data) {
            getLeadsBy(data, type, value, callback);
        });
    },
    upsertLead: function(body, callback){
        mktoHelper.access_token(function(data) {
            data.body = body;
            upsertLead(data, callback);
        });
    },
    pushLead: function(body, callback){
        mktoHelper.access_token(function(data) {
            data.body = body;
            pushLead(data, callback);
        });
    }    
}

module.exports = function() {
    return mkto;
}
