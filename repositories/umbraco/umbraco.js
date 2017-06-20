var app = require('../../app');
var customSFNames = require('../../config/umbraco');

function resolveNames(nameArray, callback) {
    var found = [];
    found = (customSFNames.names.filter(function (item) {
        return (nameArray.indexOf(item[0]) === 0);
    }))
    callback(found);
}

function replaceBody(body) {
    var newObj = { save: {}};
    replaceSalesforceNameWithMarketoName(newObj, body);
    deleteInvalidProperties(newObj);
    removeNull(newObj);
    return newObj;
}

function handleResponse(data, postData, callback) {
    if (data) {
        try {
            var resultStatus = data.result[0].status;
            if (webToLeadStatus_IsSuccess(data)) {
                if (resultStatus === 'created' || resultStatus === 'updated') {
                    notifyWebToLeadCreated_orUpdated_ByEmail(data, postData, resultStatus, callback);
                } else {
                    notifyWebToLeadSkipped_orOther_ByEmail(data, postData, resultStatus, callback);
                }
            } else {
                handleError(data, postData, callback);
            }
        } catch (e) {
            app.locals.mailer.sendEmail("Marketo Proxy App System Error - " + process.env.mode || 'local', data._applicationError = e);
            callback(postData);
        }
    }
}

// helper functions
function replaceSalesforceNameWithMarketoName(newObj, body) {
    for (var key in body) {
        if (body.hasOwnProperty(key)) {
            resolveNames(key, function (data) {
                if (data.length) {
                    // new marketo name
                    newObj[data[0][1]] = body[key];
                } else {
                    // no match, persist for delete or save functions
                    newObj[key] = body[key];
                }
            })
        }
    }
}

function deleteInvalidProperties(newObj) {
    customSFNames.remove.forEach(function (currentVal, ind, arr) {
        if ((customSFNames.save.indexOf(currentVal) === -1)) {
            delete newObj[currentVal];
        } else {
            persistViaSaveObject(newObj, currentVal);
        }
    })
}

function persistViaSaveObject(newObj, currentVal) {
    newObj.save[currentVal] = newObj[currentVal];
    delete newObj[currentVal];
}

// helper functions
function removeNull(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === undefined || obj[key] === "" || obj[key] === null) {
                delete obj[key];
            }
        }
    }
    return obj;
}

function handleError(data, postData, callback) {
    try {
        app.locals.mailer.sendEmail("Marketo HTTP Request Failed - " + process.env.mode, data);
        callback(postData);
    } catch (error) {
        console.error(error);
    }
}

function notifyWebToLeadCreated_orUpdated_ByEmail(data, postData, status, callback) {
    try {
        if (process.env.mode != 'production') {
            //primarially for testing purposes, send a confirmation email if not in prodiction
            app.locals.mailer.sendEmail("Lead " + data.result[0].status + " - " + process.env.mode, JSON.stringify({ data: data, postData: postData }, null, 2));
        }
    } catch (error) {
        console.error(error);
    }
    callback(postData);
}

function notifyWebToLeadSkipped_orOther_ByEmail(data, postData, status, callback) {
    try {
        app.locals.mailer.sendEmail("Lead " + data.result[0].status + " - " + process.env.mode, JSON.stringify({ data: data, postData: postData }, null, 2));
    } catch (error) {
        console.error(error);
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

module.exports = function () {
    return umbracoRepo;
}