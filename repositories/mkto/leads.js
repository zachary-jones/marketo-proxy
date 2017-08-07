var marketoHelper = require('./helpers/mkto');
var umbracoHelper = require('../umbraco/umbraco')();
var querystring = require('querystring');

function upsertLead(data, callback) {
    var requestObject = marketoHelper.requestObject("/rest/v1/leads.json", 'POST', 'Bearer ' + data.access_token);
    var returnURL = getReturnURL(data);
    sanitizeRequestBody(data);

    requestObject.data = {
        action: "createOrUpdate",
        lookupField: "email",
        input: [data.body]
    };

    marketoHelper.makeRequest(requestObject, function (response) {
        callback(response, returnURL);
    });
}

function pushLead(data, callback) {
    var requestObject = marketoHelper.requestObject("/rest/v1/leads/push.json", 'POST', 'Bearer ' + data.access_token);
    var returnURL = getReturnURL(data);
    sanitizeRequestBody(data);

    requestObject.data = {
        lookupField: "email",
        programName: getProgramName(data),
        input: [data.body]
    };

    marketoHelper.makeRequest(requestObject, function (response) {
        callback(response, returnURL);
    });
}

function removeLead(data, callback) {
    var requestObject = marketoHelper.requestObject("/rest/v1/leads/delete.json", 'POST', 'Bearer ' + data.access_token);
    requestObject.data = {
        input: [data.body]
    };
    marketoHelper.makeRequest(requestObject, function (response) {
        callback(response);
    });
}

function getLeadsBy(data, filterType, filterValue, callback) {
    data.query = {};
    setQueryStringFilters(data, filterType, filterValue);
    setCustomFieldsToQueryString(data, requestObject);
    var requestObject = marketoHelper.requestObject("/rest/v1/leads.json?" + querystring.stringify(data.query), 'GET', 'Bearer ' + data.access_token);
    marketoHelper.makeRequest(requestObject, callback);
}

// private methods
function getReturnURL(data) {
    if (data && data.body && data.body.save && data.body.save.retURL) {
        return data.body.save.retURL;
    }
    return undefined;
}

function getProgramName(data) {
    if (data && data.body && data.body.save && data.body.save.Program) {
        return data.body.save.Program;
    }
    return undefined;
}

function setCustomFieldsToQueryString(data) {
    if (data.customFields) {
        for (var index = 0; index < data.customFields.length; index++) {
            var field = data.customFields[index];
            if (index != 0) {
                data.query.fields += ',' + field;
            } else {
                data.query.fields += field;
            }
        }
    }
}

function setQueryStringFilters(data, filterType, filterValue) {
    data.query.filterType = filterType;
    data.query.filterValues = filterValue;
}

function sanitizeRequestBody(data) {
    // and now delete the save object as marketo will reject leads with inputs it does not recognize
    delete data.body.save;
    // sometimes the umbraco forms have an empty name/input, lets remove it as well
    delete data.body[''];
}

// / private methods

var mkto = {
    getLeadsBy: function (type, value, callback) {
        marketoHelper.access_token(function (data) {
            getLeadsBy(data, type, value, callback);
        });
    },
    upsertLead: function (body, callback) {
        marketoHelper.access_token(function (data) {
            data.body = body;
            upsertLead(data, callback);
        });
    },
    pushLead: function (body, callback) {
        marketoHelper.access_token(function (data) {
            data.body = body;
            pushLead(data, callback);
        });
    },
    upsertLead_AndAssociateWithList: function (postdata, mktoListsRepo, callback) {
        var list = postdata.save.List;
        this.upsertLead(postdata, function (data) {
            var leadid = data.result[0].id;
            umbracoHelper.handleResponse(data, postdata, function (retUrl) {
                if (data.success) {
                    mktoListsRepo.associateLeadsToList(list, leadid, function (data) {
                        callback(retUrl);
                    });
                }
            });
        });
    }, 
    removeLead: function (body, callback) {
        marketoHelper.access_token(function (data) {
            data.body = body;
            removeLead(data, callback);
        });
    }
};

module.exports = function () {
    return mkto;
};