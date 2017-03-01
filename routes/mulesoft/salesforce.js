var express = require('express');
var router = express.Router();
var salesforceApi = require('../../repositories/mulesoft/salesforce')();
const https = require('http');

var host = require('os').hostname();
const url = require('url');

router.get('/getUniversityProgramInformation/:UCID', function(req, res, next) {
    salesforceApi.getUniversityProgramInformation(req.params['UCID'], req.query.env, function (data) {
        res.send(JSON.stringify(data, null, 2));
    });
});

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
    fvmk(function(data) {
        console.log(data)
        res.send(data);
    });
});

function fvmk(callback) {
    var obj = [];
    for (var i = 0; i < salesforceApi.legacy.length;) {
        var element = legacy[i];
        options = {
            path: '/mulesoft/salesforce/getUniversityProgramsOfInterest/' + element.id + '/',
            port: 3000,
            hostname: 'localhost'
        }
        //console.log(options)
        var req = https.request(options, function (response) {
            var data = '';
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                console.log(data)
                obj.push(data)
                i++
                if (i === salesforceApi.legacy.length) {
                    console.log('y')
                    callback(obj);                
                }
            });
        });
        req.end();        
    }
}

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
