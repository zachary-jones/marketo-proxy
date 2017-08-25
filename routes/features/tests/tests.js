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
                if (JSON.parse(dataSet).length) {
                    response.push({ 
                        brand: element, 
                        programs: JSON.parse(dataSet), 
                        degreeTypes: _.map(_.uniqBy(JSON.parse(dataSet), 'subType'), 
                            function(obj) { if (obj.subType.length)  { return { subType: obj.subType } } else { return null } }) 
                        })   
                }
                done();
            });
        }, this);
        function respondAsync(params) {
            res.render('features/ProgramBuilderCorporate', { data: _.sortBy(response, 'brand.Name') });
        }
    })
});


router.get('/programBuilder/corporate2', function (req, res, next) {
    salesforceApi.getInstitutions(req.query.env, function (data) {
        var response = [];
        var jData = JSON.parse(data);
        var done = _.after(jData.length, respondAsync);
        jData.forEach(function (university) {
            ProgramBuilder.getPrograms(university.Id, req.query.env, function (dataSet) {
                var data = JSON.parse(dataSet);
                if (data.length) {
                    var universitySet = {
                        university: {
                            id: university.Id,
                            name: university.Name,
                            programSet: []
                        }
                    }
                    // get unique subTypes
                    var subTypeSets = _.uniqBy(data, v => [v.subType].join());
                    for (var i = 0; i < subTypeSets.length; i++) {
                        // get programs matching subtype
                        var subTypeSet = subTypeSets[i];
                        subTypePrograms = _.filter(data, { 'subType': subTypeSet.subType });
                        //add subtype
                        var degreesArray = [];
                        universitySet.university.programSet.push({
                            areas: {
                                name: subTypeSet.subType,
                                degrees: degreesArray
                            }
                        });                        
                        // for matching subtype programs, get unique degrees
                        var degreeSets = _.uniqBy(subTypePrograms, v => [v.type].join());
                        //foreach degree in subtype, add programs
                        for (var y = 0; y < degreeSets.length; y++) {
                            var degreeSet = degreeSets[y];
                            degreesArray.push({
                                name: degreeSet.type,
                                programs: _.filter(data, { 'type': degreeSet.type, 'subType': degreeSet.subType })
                            }); 
                        }

                    }
                    response.push(universitySet);                
                }
                done();
            });
        }, this);
        function respondAsync(params) {
            res.render('features/ProgramBuilderCorporateNew', { data: _.sortBy(response, 'university.name') });
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