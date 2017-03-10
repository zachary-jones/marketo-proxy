var express = require('express');
var router = express.Router();
var umbracoRepo = require('../../repositories/umbraco/umbraco')();
var mktoLeadsRepo = require('../../repositories/mkto/leads')();

// router.get('/resolveNames/:names', function(req, res, next) {
//     umbracoRepo.resolveNames(req.params['names'], function (data) {
//         res.setHeader('Content-Type','application/json');
//         res.send(JSON.stringify(data));
//     });
// });

router.post('/umbracoForm/', function(req, res, next) {
    var postdata = umbracoRepo.replaceBody(req.body);
    mktoLeadsRepo.pushLead(postdata, function(data, postdata) {
        umbracoRepo.handleResponse(data, postdata, function(retUrl) {
            res.redirect(retUrl);
        });
    });
});

module.exports = router;
