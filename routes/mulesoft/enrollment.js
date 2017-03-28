var express = require('express');
var router = express.Router();
var enrollmentApi = require('../../repositories/mulesoft/enrollment')();

router.get('/GetAccountIdDivisionIdByStudentId/:studentId', function(req, res, next) {
    if (!req.params['studentId'] || req.params['studentId'] === ':studentId') { res.send('studentId required'); } else {
        enrollmentApi.GetAccountIdDivisionIdByStudentId(req.params['studentId'],  function (data) {
            res.header("Content-Type",'application/json');        
            res.send(data);
        });
    }
});

router.get('/GetGreatPlainsIdByContactId/:contactId', function(req, res, next) {
    if (!req.params['contactId'] || req.params['contactId'] === ':contactId') { res.send('contactId required'); } else {
        enrollmentApi.GetGreatPlainsIdByContactId(req.params['contactId'], function (data) {
            res.header("Content-Type",'application/json');        
            res.send(data);
        });
    }
});

router.post('/UpsertRegistration/', function(req, res, next) {
    enrollmentApi.UpsertRegistration(req.body, function (data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

module.exports = router;
