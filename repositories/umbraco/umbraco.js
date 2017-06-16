var customSFNames = require('../../config/umbracoConfig');
var mailer = require('../../repositories/features/mailer');

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
                    newObj[data[0][1]] = body[key];
                } else {
                    newObj[key] = body[key];                  
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

function handleResponse(data, postData, callback) {
    if (data) {
        try {
            var resultStatus = data.result[0].status;
            if (webToLeadStatus_IsSuccess(data)) {
                if (resultStatus === 'created') {
                    notifyWebToLeadCreated_orUpdated_ByEmail(data, postData, resultStatus, callback);
                } else if (resultStatus === 'updated')  {
                    notifyWebToLeadCreated_orUpdated_ByEmail(data, postData, resultStatus, callback);                    
                } else if (resultStatus === 'skipped')  {
                    notifyWebToLeadSkipped_orOther_ByEmail(data, postData, resultStatus, callback);
                } else {
                    notifyWebToLeadSkipped_orOther_ByEmail(data, postData, resultStatus, callback);
                }
            } else {
                handleError(data, postData, callback);
            }
        } catch (e) {
            mailer.sendMessage(sendMessage(data, "Marketo Proxy App System Failed - " + process.env.mode || 'local'));               
            callback(postData);
        }
    }
}

// helper functions
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

function handleError(data, postData, callback) {
    try {
        mailer.sendMessage(sendMessage(data, "Marketo HTTP Request Failed - " + process.env.mode || 'local'));   
        callback(postData);
    } catch (error) {
        console.log(error);
    }
}

function notifyWebToLeadCreated_orUpdated_ByEmail(data, postData, status, callback) {
        try {
            if (process.env.mode != 'production') {
                //primarially for testing purposes, send a confirmation email if not in prodiction
                mailer.sendMessage(sendMessage(JSON.stringify(data,null,2), "Lead " + data.result[0].status + " - " + process.env.mode || 'local'));
            }
        } catch (error) {
            console.log(error);
        }
        callback(postData);
}

function notifyWebToLeadSkipped_orOther_ByEmail(data, postData, status, callback) {
    try {
        mailer.sendMessage(sendMessage(JSON.stringify(data,null,2), "Lead " + resultStatus + " - " + process.env.mode || 'local'));                  
    } catch (error) {
        console.log(error);
    }
    callback(postData);
}

function webToLeadStatus_IsSuccess(responseObject) {
    return responseObject.success === true;
}
// / helper functions

var umbracoRepo = {
    resolveNames: resolveNames,
    replaceBody: replaceBody,
    handleResponse: handleResponse
}

module.exports = function() {
    return umbracoRepo;
}