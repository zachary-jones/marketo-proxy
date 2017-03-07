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

function handleResponse(data) {
    if (data) {
        try {
            console.dir(data)            
            if (data.success) {
                console.dir(JSON.stringify(data.result))
                if (data.result.success != 'success') {
                    //success
                } else {
                    //hit server, upsert rejected
                }
            } else {
                //server failed
                console.dir(data.status)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

var lib = {
    resolveNames: resolveNames,
    replaceBody: replaceBody,
    handleResponse: handleResponse
}

module.exports = lib;