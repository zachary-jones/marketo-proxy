var express = require('express');
var router = express.Router();
var salesforceApi = require('../../repositories/mulesoft/salesforce')();

router.get('/getUniversityProgramInformation/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        res.send(data);
    });
});

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
