/**
 * Domain to Salesforce Institution ID map
 * 
 * The less the user needs to configure their pages the better. This allows us to take the hostname of a request and return the institution id needed by that request. No need for hidden variables, cookies, etc.
 */

var salesforceDomainMap = [
    ['essentialsofbusiness.ufexec.ufl.edu','0016100000TWZ9xAAH'],
    ['pmcertificate.success.ada.org/','0016100000TWZ9wAAH'],
    ['floridatechonline.com','0016100000TWYsZAAX'],
    ['jacksonvilleu.com','0016100000TWYsbAAH'],
    ['newenglandcollegeonline.com','0016100000TWYsYAAX'],
    ['villanovau.com','0016100000TWYsXAAX'],
    ['michiganstateuniversityonline.com','0016100000TWYsWAAX'],
    ['uscranton.com','0016100000TWZA0AAP'],
    ['notredameonline.com','0016100000TWYsVAAX'],
    ['usanfranonline.com','0016100000TWZ9zAAH'],
    ['usfhealthonline.com','0016100000TWZ9tAAH'],

    ['localhost','0016100000TWYsZAAX'],    
    ['bisk-marketo-proxy-staging.herokuapp.com','0016100000TWYsZAAX'],
    ['bisk-marketo-proxy.herokuapp.com','0016100000TWYsZAAX']    
]

module.exports = salesforceDomainMap;