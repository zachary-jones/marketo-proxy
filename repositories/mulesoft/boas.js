var mulesoftHelper = require('./helpers/mulesoft');

function getStudentStatus(domain, email, env, callback) {
    api = mulesoftHelper.getConfig(env).getStudentStatus;
    api.query.domain = domain;
    api.query.email = email;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

var boas = { 
    getStudentAccountStatus: getStudentStatus
};

module.exports = function() {
    return boas;
}