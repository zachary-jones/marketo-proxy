var fs = require("fs");

var customSFNames = {
    names: [
        ['00N6100000DVxWP','abc'],
        ['00N6100000DVxXC','qwe'],
        ['00N6100000F1VS0','zxc'],
        ['00N6100000DVxXg','asd'],
        ['00N6100000DVxVd','123']
    ]  
};

function resolveNames(nameArray, callback) {
    var found = [];
    found = (customSFNames.names.filter(function(item) {
        return (nameArray.indexOf(item[0]) > -1);
    }))
    callback(found);   
}

function replaceBody(body) {
    var newObj = {};
    for(var key in body) {
        if(body.hasOwnProperty(key)){
            resolveNames(key, function (data) {
                if (data.length) {
                    newObj[data[0][1]] = body[key]
                } else {
                    newObj[key] = body[key]                    
                }
            })
        }
    }
    return removeNull(newObj);
}

function removeNull(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)){
            if (obj[key] === undefined || obj[key] === "" || obj[key] === null) {
                delete obj[key];
            }
        }
    }
    return obj;
}

function handleResponse(data, postData, callback) {
    if (data) {
        try {
            if (data.success) {
                if (data.result[0].success === 'success') {
                    fs.appendFileSync("data/successLeads.txt", JSON.stringify(data) + ',', "utf8");                    
                } else {
                    fs.appendFileSync("data/failedLeads.txt", JSON.stringify(data) + ',', "utf8");
                }
            } else {
                fs.appendFileSync("data/failedRequests.txt", JSON.stringify(data) + ',', "utf8");                
            }
        } catch (e) {
            console.log(e);
        }
        callback(postData);
    }
}

var lib = {
    resolveNames: resolveNames,
    replaceBody: replaceBody,
    handleResponse: handleResponse
}

module.exports = lib;