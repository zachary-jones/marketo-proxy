var mulesoftHelper = require('./helpers/mulesoft');

function getStudentStatus(domainid, email, env, callback) {
    api = mulesoftHelper.getConfig(env).getStudentStatus;
    api.query.domainid = domainid;
    api.query.email = email;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

var boas = { 
    getStudentAccountStatus: getStudentStatus
};

module.exports = function() {
    return boas;
}