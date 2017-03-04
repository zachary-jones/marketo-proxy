var express = require('express');
var router = express.Router();
var instapageApi = require('../../repositories/instapage/instapage')();

/**
 * 
 */
router.get('/determineSalesforceId/:host', function(req, res, next) {
    var host = req.params['host'].replace('explore.','');
    instapageApi.determineSalesforceId(host, function (data) {
        res.send(data);
    });
});

module.exports = router;
