var express = require('express');
var router = express.Router();
var salesforceApi = require('../../../repositories/mulesoft/salesforce')();
var boasApi = require('../../../repositories/mulesoft/boas')();

/**
 * Returns a quick reference view for manually getting the salesforce institution id
 */
router.get("/getAllSalesforceIds/", function(req, res, next){
    res.render("mulesoft/salesforce/getAllSalesforceIds", { data: salesforceApi.getAllSalesforceIds() });
})

/**
 * Returns means to verify BOAS account via email
 */
router.get("/checkBoasAccountStatusByEmail/", function(req, res, next){
    res.render('mulesoft/tests/CheckStudentAccount');
})

module.exports = router;