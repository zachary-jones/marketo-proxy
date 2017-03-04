var express = require('express');
var router = express.Router();
var salesforceApi = require('../../repositories/mulesoft/salesforce')();

/**
 * API used to get program infromation including relavent content per program
 */
router.get('/getUniversityProgramInformation/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        res.send(data);
    });
});

/**
 * Gets all salesforce programs of interest and transforms it to build a programs list and conditional branching
 */
router.get('/getSalesforcePois/:salesforceId', function(req, res, next) {
    salesforceApi.getSalesforcePois(req.params['salesforceId'], req.query.env, function (data) {
        var payload = [];
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            var payloadItem = {
                program_id: element.id,
                program_type: element.type,
                program_subType: element.subType,
                marketing_program_name: element.name
            };
            payload.push(payloadItem);
        }
        res.send(payload);
    });
});

/**
 * Returns a quick reference view for manually getting the salesforce institution id
 */
router.get("/getAllSalesforceIds/", function(req, res, next){
    res.render("mulesoft/salesforce/getAllSalesforceIds", { data: salesforceApi.getAllSalesforceIds(req.params['path']) });
})

//WIP
router.get('/getAllUniversityProgramsOfInterest/', function(req, res, next) {
    salesforceApi.getAllUniversityProgramInformation(data).then(function(data) {
        console.log(data);
    });
});

/**
 * Returns [{institutionName:salesforceInstitutionID}]
 */
router.get('/getInstitutions/', function(req, res, next) {
    salesforceApi.getInstitutions(req.query.env, function (data) {
        res.send(data);
    });
});

router.get('/getTCPA/:institution', function(req, res, next) {
    res.render('');
});

router.post('/createLead/', function(req, res, next) {
    res.render('');
});

module.exports = router;
