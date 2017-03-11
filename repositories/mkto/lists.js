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

function associateLeadsToListBy(data, type, value, leads, callback) {
    var reqObj = new reqObject({
        access_token: data.access_token,
        path: "/" + value
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
    associateLeadsToListBy: function (type, value, leads, callback) {
        mktoHelper.access_token(function (data) {
            // if (type === 'name') {
            //     getLists(data, function(lists) {
            //         var match = lists.result.filter(function(entry) { return entry.name === value })
            //         associateLeadsToListBy(data, type, match.id, leads, callback);
            //     })
            // } else {
                associateLeadsToListBy(data, type, value, leads, callback);
            // }
        });
    }
};

module.exports = function () {
    return mktolists;
}