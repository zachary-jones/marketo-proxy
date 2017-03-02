var express = require('express');
var router = express.Router();
var salesforceApi = require('../../repositories/mulesoft/salesforce')();
const https = require('http');

var host = require('os').hostname();
const url = require('url');

router.get('/determineSalesforceId/', function(req, res, next) {
    salesforceApi.determineSalesforceId(req.hostname, function (data) {
        res.send(data);
    });
});

router.get('/getUniversityProgramInformation/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        res.send(data);
    });
});

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

router.get("/getSFID/", function(req, res, next){
    res.render("mulesoft/salesforce/getSFIDs", { data: salesforceApi.getSFID(req.params['path']) });
})

router.get('/getUniversityProgramsOfInterest/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        var payload = [];
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            var payloadItem = {
                program_id: element.program_id,
                program_type: element.program_type,
                program_subType: element.program_subType,
                marketing_program_name: element.marketing_program_name
            };
            payload.push(payloadItem);
        }
        res.send(payload);
    });
});

router.get('/getAllUniversityProgramsOfInterest/', function(req, res, next) {
    //WIP
    salesforceApi.getAllUniversityProgramInformation(data).then(function(data) {
        console.log(data);
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
