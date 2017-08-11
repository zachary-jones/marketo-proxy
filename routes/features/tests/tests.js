var express = require('express');
var router = express.Router();
var defaultCampaigns = require('../../../config/campaigns');
var salesforceApi = require('../../../repositories/mulesoft/salesforce')();
var _ = require('lodash');
var ProgramBuilder = require('../../../repositories/features/programBuilder');

router.get('/defaultCampaign', function (req, res, next) {
    res.render('features/tests/defaultCampaign');
})

router.get('/programAutoSelect', function (req, res, next) {
    res.render('features/ProgramAutoSelect');
})

router.get('/programBuilder/corporate', function (req, res, next) {
    salesforceApi.getInstitutions(req.query.env, function (data) {
        var response = [];
        var jData = JSON.parse(data);
        var done = _.after(jData.length, respondAsync);
        jData.forEach(function (element) {
            ProgramBuilder.getPrograms(element.Id, req.query.env, function (dataSet) {
                response.push({ brand: element, programs: JSON.parse(dataSet) })
                done();
            });
        }, this);
        function respondAsync(params) {
            res.render('features/ProgramBuilderCorporate', { data: response });
        }
    })
});

/**
 * View to build custom program sets
 */
router.get('/programBuilder/:salesforceId', function (req, res, next) {
    if (!req.params['salesforceId'] || req.params['salesforceId'] === ':salesforceId') {
        res.send('salesforceId required');
    } else {
        ProgramBuilder.getPrograms(req.params['salesforceId'], req.query.env, function (dataSet) {
            try {
                dataSet = JSON.parse(dataSet)
            } catch (e) {
                res.send(dataSet);
            }
            var verticals = []; degreeTypes = []; programs = [];
            dataSet.forEach(function (data) {
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
    }
})

/**
 * View to build custom program sets
 */
router.get('/programBuilder/', function (req, res, next) {
    salesforceApi.getInstitutions(req.query.env, function (data) {
        res.render('features/ProgramBuilderList', { data: JSON.parse(data) });
    });
})

module.exports = router;