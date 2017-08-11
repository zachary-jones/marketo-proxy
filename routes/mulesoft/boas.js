var express = require('express');
var router = express.Router();
var boasApi = require('../../repositories/mulesoft/boas')();

/**
 * Returns data on if an account exists in boas with the provided email address
 */
router.get('/getStudentAccountStatus/:domain/:email', function(req, res, next) {
    boasApi.getStudentAccountStatus(req.params['domain'], req.params['email'], req.query.env, function(data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    })
});

router.get('/getDefaultOrganicCampaignId/', function(req, res, next) {
    var data = {
        campaign: ""
    }
    data.campaign = boasApi.getDefaultOrganicCampaignId(req.headers.referer);
    res.header("Content-Type",'application/json');        
    res.send(JSON.stringify(data,null,4));
});

module.exports = router;
