var mktoHelper = require('./helpers/mkto');

function getLists(data, callback) {
    var requestObject = mktoHelper.requestObject("/rest/v1/lists.json", "GET", 'Bearer' + data.access_token);        
    mktoHelper.makeRequest(requestObject, callback);
}

function associateLeadsToList(data, listid, leads, callback) {
    var requestObject = mktoHelper.requestObject("/rest/v1/lists/" + (listid || "") + "/leads.json" + "?id=" + leads, "POST", 'Bearer' + data.access_token);        
    mktoHelper.makeRequest(requestObject, callback);
}

function getLeadsOnList_ByListId(data, listid, callback) {
    var requestObject = mktoHelper.requestObject("/rest/v1/lists/" + (listid || "") + "/leads.json", "GET", 'Bearer' + data.access_token);        
    mktoHelper.makeRequest(requestObject, callback);
}

var mktolists = {
    getLists: function (callback) {
        mktoHelper.access_token(function (data) {
            getLists(data, callback);
        });
    },
    associateLeadsToList: function (listid, leads, callback) {
        mktoHelper.access_token(function (data) {
            associateLeadsToList(data, listid, leads, callback);
        });
    },
    getLeadsOnList_ByListId: function (listid, callback) {
        mktoHelper.access_token(function (data) {
            getLeadsOnList_ByListId(data, listid, callback);
        });
    }
};

module.exports = function () {
    return mktolists;
}