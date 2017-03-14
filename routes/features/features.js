var express = require('express');
var router = express.Router();
var defaultCampaigns = require('../../config/campaigns');
var ProgramBuilder = require('../../repositories/features/programBuilder');

/**
 * Returns all default campaigns
 */
router.get('/defaultCampaigns', function (req, res, next) {
    res.json(defaultCampaigns);
})

/**
 * Returns a particular default campaign by host
 */
router.get('/defaultCampaign', function (req, res, next) {
    var host = req.hostname.replace('explore.', '');
    var x = ''
    defaultCampaigns.default.forEach(function (val, ind, arr) {
        if (val[0].indexOf(host) > -1) x = val[1];
        return;
    })
    res.json(x);
})


module.exports = router;