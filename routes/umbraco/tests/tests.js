var express = require('express');
var router = express.Router();

router.get('/UmbracoListAssociation/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoListAssociation');
});

router.get('/UmbracoProgramAssociation/', function(req, res, next) {
    res.render('umbraco/tests/UmbracoProgramAssociation');
});

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
