var mktoHelper = require('./helpers/mkto');

function reqObject(data) {
    this.protocol = 'https:',
    this.hostname = mktoHelper.munchkin_id + ".mktorest.com",
    this.path = "/rest/v1/lists" + (data.path === undefined ? "" : data.path + "/leads") + ".json",
    this.headers = {
        'Authorization': 'Bearer ' + data.access_token
    }
};

function getLists(data, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token
    });
    mktoHelper.makeRequest(reqObj, callback);
}

function associateLeadsToList(data, listid, leads, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "/" + listid
    });
    reqObj.method = 'POST'
    reqObj.path += '?id=' + leads
    reqObj.headers['Content-Type'] = 'application/json';
    mktoHelper.makeRequest(reqObj, callback);
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
    }
};

module.exports = function () {
    return mktolists;
}