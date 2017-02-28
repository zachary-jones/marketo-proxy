var express = require('express');
var router = express.Router();

router.get('/getProgramInformation/:programOfInterest', function(req, res, next) {
    res.send('');
});

router.get('/getInstitutions/', function(req, res, next) {
    res.render('');
});

router.get('/getTCPA/:institution', function(req, res, next) {
    res.render('');
});

router.post('/createLead/', function(req, res, next) {
    res.render('');
});

module.exports = router;
