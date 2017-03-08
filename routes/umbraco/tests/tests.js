var express = require('express');
var router = express.Router();

router.get('/resolveNamesUmbracoPage/', function(req, res, next) {
    res.render('umbraco/tests/resolveNamesUmbracoPage');
});

router.get('/upsertLeadUmbracoPageJU/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadJU');
});

router.get('/resolveNamesUmbracoPageNEC/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadNEC');
});

router.get('/resolveNamesUmbracoPageMSU/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadMSU');
});

router.get('/resolveNamesUmbracoPageFTUO/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadFTUO');
});


module.exports = router;
