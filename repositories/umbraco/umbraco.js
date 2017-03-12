var customSFNames = require('../../config/umbracoConfig');

function resolveNames(nameArray, callback) {
    var found = [];
    found = (customSFNames.names.filter(function(item) {
        return (nameArray.indexOf(item[0]) === 0);
    }))
    callback(found);   
}

function replaceBody(body) {
    var newObj = {};
        newObj.save = {};   
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
    
    customSFNames.remove.forEach(function(val,ind,arr) {
        var currentVal = val[0];
        if ((currentVal !== 'retURL' && currentVal !== 'Program' && currentVal !== 'List')) {
            delete newObj[currentVal];
        } else {
            newObj.save[currentVal] = newObj[currentVal];
            delete newObj[currentVal];            
        }
    }) 
    newObj = removeNull(newObj);
    return newObj;
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

function sendMessage(message, subject) {
    let mailOptions = {
        from: '"marketo-proxy-leads" <marketo-proxy-leads@bisk.com>',
        to: (process.env.mode == 'local' ? 'zachary-jones@bisk.com' : "Marketing-Developers@bisk.com"),
        subject: subject,
        text: message,
    };
    return mailOptions;
}

function handleResponse(data, postData, callback) {
    if (data) {
        try {
            if (data.success) {
                if (data.result[0].status === 'created') {
                    callback(postData)                    
                } else if (data.result[0].status === 'skipped')  {
                    try {
                        mailer.sendMessage(sendMessage(JSON.stringify(data,null,2), "Lead Skipped - " + process.env.mode || 'local'));                    
                        callback(postData)
                    } catch (error) {
                        console.log(e);
                    }
                } else if (data.result[0].status === 'updated')  {
                    callback(postData)
                } else {
                    try {
                        mailer.sendMessage(sendMessage(JSON.stringify(data,null,2), "Lead Failed - " + process.env.mode || 'local'));
                        callback(postData)
                    } catch (error) {
                        console.log(e);
                    }
                }
            } else {
                try {
                    mailer.sendMessage(sendMessage(data, "Marketo HTTP Request Failed - " + process.env.mode || 'local'));   
                    callback(postData)
                } catch (error) {
                    console.log(e);
                }
            }
        } catch (e) {
            mailer.sendMessage(sendMessage(data, "Marketo Proxy App System Failed - " + process.env.mode || 'local'));               
            callback(postData)
        }
    }
}

var umbracoRepo = {
    resolveNames: resolveNames,
    replaceBody: replaceBody,
    handleResponse: handleResponse
}

module.exports = function() {
    return umbracoRepo;
}