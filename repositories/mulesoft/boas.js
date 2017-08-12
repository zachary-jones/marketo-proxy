var mulesoftHelper = require('./helpers/mulesoft');

function getStudentStatus(domainid, email, env, callback) {
    api = mulesoftHelper.getConfig(env).getStudentStatus;
    api.query.domainid = domainid;
    api.query.email = email;
    mulesoftHelper.makeRequest(mulesoftHelper.buildOptions(api), callback);
}

function getDefaultOrganicCampaignId(domain) {
    if ('floridatechonline.com'.indexOf(domain) > -1) {
      return '70161000001CrgD'
    }
    if ('jacksonvilleu.com'.indexOf(domain) > -1) {
      return '70161000001CtDj'
    }
    if ('newenglandcollegeonline.com'.indexOf(domain) > -1) {
      return '70161000001Csxh'
    }
    if ('villanovau.com'.indexOf(domain) > -1) {
      return '70161000001CtDk'
    }    
    if ('usfhealthonline.com'.indexOf(domain) > -1) {
      return '70161000001CtDo'
    }  
    if ('michiganstateuniversityonline.com'.indexOf(domain) > -1) {
      return '70161000001CtDl'
    }  
    if ('uscranton.com'.indexOf(domain) > -1) {
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