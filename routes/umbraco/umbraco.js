var express = require('express');
var router = express.Router();
var umbracoRepo = require('../../repositories/umbraco/umbraco')();
var mktoLeadsRepo = require('../../repositories/mkto/leads')();

/**
 * Will match and replace incoming names with salesforce equivilant values from umbracoConfig
 * Names is an array
 */
router.get('/resolveNames/:names', function(req, res, next) {
    if (!req.params['names'] || req.params['names'] === ':names') res.send('');
    umbracoRepo.resolveNames(req.params['names'], function (data) {
        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify(data));
    });
});

/**
 * Means to push a lead with mkto Program association
 */
router.post('/umbracoForm/', function(req, res, next) {
    var postdata = umbracoRepo.replaceBody(req.body);
    mktoLeadsRepo.pushLead(postdata, function(data, postdata) {
        umbracoRepo.handleResponse(data, postdata, function(retUrl) {
            res.redirect(retUrl);
        });
    });
});

module.exports = router;
