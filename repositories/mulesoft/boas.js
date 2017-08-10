var mulesoftHelper = require('./helpers/mulesoft');

function getStudentStatus(domainid, email, env, callback) {
    api = mulesoftHelper.getConfig(env).getStudentStatus;
    api.query.domainid = domainid;
    api.query.email = email;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getDefaultOrganicCampaignId(domain) {
    if (domain.indexOf('floridatechonline.com') > -1) {
      return '70161000001CrgD'
    }
    if (domain.indexOf('jacksonvilleu.com') > -1) {
      return '70161000001CtDj'
    }
    if (domain.indexOf('newenglandcollegeonline.com') > -1) {
      return '70161000001Csxh'
    }
    if (domain.indexOf('villanovau.com') > -1) {
      return '70161000001CtDk'
    }    
    if (domain.indexOf('usfhealthonline.com') > -1) {
      return '70161000001CtDo'
    }  
    if (domain.indexOf('michiganstateuniversityonline.com') > -1) {
      return '70161000001CtDl'
    }  
    if (domain.indexOf('uscranton.com') > -1) {
      return '70161000001CtDm'
    }                
    if (domain.indexOf('valpoonline.com') > -1) {
      return '70161000001CtDn'
    }         
    return ""        
  }

var boas = { 
    getStudentAccountStatus: getStudentStatus,
    getDefaultOrganicCampaignId: getDefaultOrganicCampaignId
};

module.exports = function() {
    return boas;
}