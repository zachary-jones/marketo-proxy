var mulesoftHelper = require('./helpers/mulesoft');
var enrollment = 'enrollment';

function GetAccountIdDivisionIdByStudentId(studentId, callback) {
    api = mulesoftHelper.getConfig(enrollment).GetAccountIdDivisionIdByStudentId;
    api.query.studentId = studentId;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function GetGreatPlainsIdByContactId(contactId, callback) {
    api = mulesoftHelper.getConfig(enrollment).GetGreatPlainsIdByContactId;
    api.query.contactId = contactId;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function UpsertRegistration(registration, callback) {
    api = mulesoftHelper.getConfig(enrollment).UpsertRegistration;
    api.data = mulesoftHelper.simpleAssign(api.data, registration)
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

var salesforce = { 
    GetAccountIdDivisionIdByStudentId: GetAccountIdDivisionIdByStudentId,
    GetGreatPlainsIdByContactId: GetGreatPlainsIdByContactId,
    UpsertRegistration: UpsertRegistration
};

module.exports = function() {
    return salesforce;
}