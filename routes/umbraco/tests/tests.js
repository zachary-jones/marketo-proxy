var express = require('express');
var router = express.Router();

router.get('/resolveNames/', function(req, res, next) {
    res.render('umbraco/tests/resolveNames');
});

router.get('/resolveNamesUmbracoPage/', function(req, res, next) {
    res.render('umbraco/tests/resolveNamesUmbracoPage');
});

router.get('/upsertLeadUmbracoPage/', function(req, res, next) {
    res.render('umbraco/tests/upsertLeadUmbracoPage');
});

module.exports = router;
