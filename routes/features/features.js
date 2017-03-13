var express = require('express');
var router = express.Router();
var defaultCampaigns = require('../../config/campaigns');
var ProgramBuilder = require('../../repositories/features/programBuilder');
var _ = require('lodash');

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

/**
 * View to build custom program sets
 */
router.get('/programBuilder/:salesforceId', function (req, res, next) {
    if (!req.params['salesforceId'] || req.params['salesforceId'] === ':salesforceId') {
        req.params['salesforceId'] = '0016100000TWYsYAAX' //for now just default to a sfinstitution
    }
    ProgramBuilder.getPrograms(req.params['salesforceId'], req.query.env, function (dataSet) {
        try { 
            dataSet = JSON.parse(dataSet)
        } catch(e) {
            res.send(dataSet);
        }
        var verticals = []; degreeTypes = []; programs = [];
        dataSet.forEach(function(data) {
            verticals.push(data.subType);
            degreeTypes.push(data.type);
            programs.push(data);
        });

        res.render('features/ProgramBuilder', {
            programs: {
                areas: _.uniq(verticals),
                degrees: _.uniq(degreeTypes),
                programs: programs
            }
        });
    });
})

module.exports = router;