/**
 * Returns list of default campaign ids. Has a separate object for instapage if we decide to use different default campaign ids for instapage.
 */

//var defaultCompaignUF = '70161000001CnVMAA0'; // University of FLorida | essentialsofbusiness.ufexec.ufl.edu
//var defaultCompaignFT = '70161000001CnVCAA0'; // FLorida Tech | www.floridatechonline.com
//var defaultCompaignADA = '70161000001CrywAAC'; // American Dental Association | pmcertificate.success.ada.org
//var defaultCompaignMSU = '70161000001CnVIAA0'; // Michigan State University | www.michiganstateuniversityonline.com
//var defaultCompaignJU = '70161000001CnVDAA0'; // Jacksonville University | www.jacksonvilleu.com
//var defaultCompaignNEC = '70161000001CnVEAA0'; // New England College | www.newenglandcollegeonline.com
//var defaultCompaignND = '70161000001CnVKAA0'; // University of Notre Dame | www.notredameonline.com
//var defaultCompaignSF = '70161000001CnVJAA0'; // University of San Francisco | www.usanfranonline.com
//var defaultCompaignUSF = '70161000001CmEYAA0'; // University of South Florida | www.usfhealthonline.com
//var defaultCompaignSC = '70161000001CnVFAA0'; // The University of Scranton | www.uscranton.com
//var defaultCompaignVal = '70161000001CoNiAAK'; // Valparaiso University | www.valpoonline.com
//var defaultCompaignVU = '70161000001Cqz6AAC'; // Villanova University | www.villanovau.com

var campaigns = {
    default: [    
        ['essentialsofbusiness.ufexec.ufl.edu','70161000001CnVMAA0'],
        ['floridatechonline.com','70161000001CnVCAA0'],
        ['pmcertificate.success.ada.org','70161000001CrywAAC'],
        ['michiganstateuniversityonline.com','70161000001CnVIAA0'],
        ['jacksonvilleu.com','70161000001CnVDAA0'],
        ['newenglandcollegeonline.com','70161000001CnVEAA0'],
        ['notredameonline.com','70161000001CnVKAA0'],
        ['usanfranonline.com','70161000001CnVJAA0'],
        ['usfhealthonline.com','70161000001CnVFAA0'],
        ['uscranton.com','70161000001CnVMAA0'],
        ['valpoonline.com','70161000001CoNiAAK'],
        ['villanovau.com','70161000001Cqz6AAC'],
        ['localhost','1234567890']
    ],
    instapageDefaults : [

    ]
}

module.exports = campaigns;