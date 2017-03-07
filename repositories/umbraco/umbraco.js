var umbracoConfig = require('../../config/umbracoConfig');

var umbracoRepo = {
    resolveNames: umbracoConfig.resolveNames,
    replaceBody: umbracoConfig.replaceBody,
    handleResponse: umbracoConfig.handleResponse
}

module.exports = function() {
    return umbracoRepo;
}