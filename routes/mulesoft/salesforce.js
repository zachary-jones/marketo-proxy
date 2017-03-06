var express = require('express');
var router = express.Router();
var salesforceApi = require('../../repositories/mulesoft/salesforce')();

/**
 * API used to get program infromation including relavent content per program
 */
router.get('/getUniversityProgramInformation/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

/**
 * Gets all salesforce programs of interest and transforms it to build a programs list and conditional branching
 */
router.get('/getSalesforcePois/:salesforceId', function(req, res, next) {
    salesforceApi.getSalesforcePois(req.params['salesforceId'], req.query.env, function (data) {
        var payload = [];
        data = JSON.parse(data);
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
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(payload,null,4));
    });
});

//WIP
// router.get('/getAllUniversityProgramsOfInterest/', function(req, res, next) {
//     salesforceApi.getAllUniversityProgramInformation(data).then(function(data) {
//         console.log(data);
//     });
// });

/**
 * Returns [{institutionName:salesforceInstitutionID}]
 */
router.get('/getInstitutions/', function(req, res, next) {
    salesforceApi.getInstitutions(req.query.env, function (data) {
        res.header("Content-Type",'application/json');                
        res.send(JSON.stringify(data,null,4));
    });
});

//WIP
router.get('/getTCPA/:institution', function(req, res, next) {
    res.send('');
});

//WIP
router.post('/createLead/', function(req, res, next) {
    res.send('');
});

module.exports = router;
