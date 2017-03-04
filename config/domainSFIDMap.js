/**
 * Domain to Salesforce Institution ID map
 * 
 * The less the user needs to configure their pages the better. This allows us to take the hostname of a request and return the institution id needed by that request. No need for hidden variables, cookies, etc.
 */

var domainSFIDMap = [
    ['floridatechonline.com','0016100000TWYsZAAX'],
    ['jacksonvilleu.com','0016100000TWYsbAAH'],
    ['newenglandcollegeonline.com','0016100000TWYsYAAX'],
    ['villanovau.com','0016100000TWYsXAAX'],
    ['localhost','0016100000TWYsZAAX'],    
    ['bisk-marketo-proxy-staging.herokuapp.com','0016100000TWYsZAAX'],
    ['bisk-marketo-proxy.herokuapp.com','0016100000TWYsZAAX']    
]

module.exports = domainSFIDMap;