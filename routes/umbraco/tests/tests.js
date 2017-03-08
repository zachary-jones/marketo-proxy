var express = require('express');
var router = express.Router();

router.get('/UmbracoToMarketoLeadJU/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadJU');
});

router.get('/UmbracoToMarketoLeadNEC/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadNEC');
});

router.get('/UmbracoToMarketoLeadMSU/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadMSU');
});

router.get('/UmbracoToMarketoLeadFTUO/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoToMarketoLeadFTUO');
});


module.exports = router;
