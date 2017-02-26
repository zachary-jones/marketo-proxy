var express = require('express');
var router = express.Router();

router.get('/prepop/', function(req, res, next) {
    res.render('mkto/tests/CookiePrepop');
});

router.get('/upsertLead/', function(req, res, next) {
    res.render('mkto/tests/UpsertLead');
});

router.get('/multisteppedForm/', function(req, res, next) {
    res.render('mkto/tests/MultisteppedForm');
});

router.get('/associateCampaign/', function(req, res, next) {
    res.render('mkto/tests/AssociateCampaign');
});

router.get('/UTMCapture/', function(req, res, next) {
    res.render('mkto/tests/UTMCapture');
});

router.get('/MarketoUmbraco/', function(req, res, next) {
    res.render('mkto/tests/MarketoUmbraco');
});

router.get('/Marketo/', function(req, res, next) {
    res.render('mkto/tests/Marketo');
});

module.exports = router;
