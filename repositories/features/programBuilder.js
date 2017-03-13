var salesforce = require('../mulesoft/salesforce')();

var builder = {
    getPrograms: salesforce.getSalesforcePois,
    LoadProgramSet: undefined,
    saveProgramSet: undefined
};

module.exports = builder;