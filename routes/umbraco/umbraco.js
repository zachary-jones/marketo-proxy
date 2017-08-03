var express = require('express');
var router = express.Router();
var umbracoRepo = require('../../repositories/umbraco/umbraco')();
var mktoLeadsRepo = require('../../repositories/mkto/leads')();
var mktoListsRepo = require('../../repositories/mkto/lists')();
var validation = require('../../repositories/umbraco/validation')();

var app = require('../../app');

/**
 * Will match and replace incoming names with salesforce equivilant values from umbraco config
 * Names is an array
 */
router.get('/resolveNames/:names', function (req, res, next) {
    if (!req.params['names'] || req.params['names'] === ':names') {
        res.send('names required');
    } else {
        umbracoRepo.resolveNames(req.params['names'], function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        });
    }
});

/**
 * Means to push a lead with mkto Program or list association
 * If I remember correctly, we started with program association, then switched to list
 * with list intending to take priority, ergo the if list else program logic
 */
router.post('/umbracoForm/', function (req, res, next) {
    validation.validate(req.body, function (isValidObject) {
        if (!isValidObject.isValid) {
            res.sendStatus(400);			
            res.send(isValidObject);
        } else {
            var returnUrl = req.body.retURL;
            umbracoRepo.replaceBody(req.body, function (postdata) {
                if (postdata.save.List) {
                    mktoLeadsRepo.upsertLead_AndAssociateWithList(postdata, mktoListsRepo, function (data) {
                        res.redirect(returnUrl);
                    });
                } else if (postdata.save.Program) {
                    mktoLeadsRepo.pushLead(postdata, function (data, postdata) {
                        umbracoRepo.handleResponse(data, postdata, function (retUrl) {
                            res.redirect(retUrl);
                        });
                    });
                } else {
                    mktoLeadsRepo.upsertLead(postdata, function (data) {
                        umbracoRepo.handleResponse(data, postdata, function (retUrl) {
                            if (data.success) {
                                app.locals.mailer.sendEmail("Umbraco lead submitted to Marketo without List or Program association", data);
                                res.redirect(returnUrl);
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;