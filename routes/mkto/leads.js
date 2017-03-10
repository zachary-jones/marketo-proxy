var express = require('express');
var router = express.Router();
var mktoLeads = require('../../repositories/mkto/leads')();

/**
 * Gets lead information by ID, cookie, email. Defaul returned properties set in repository
 */
router.get('/getLeadsBy/:type/:value', function(req, res, next) {
  mktoLeads.getLeadsBy(req.params['type'], req.params['value'], function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});

/**
 * Allows leads to be generated and sent to Marketo without using embedded forms
 */
router.post('/upsertLead/', function(req, res, next) {
  mktoLeads.upsertLead(req.body, function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});

/**
 * Same as upsert lead but permits program/list association
 */
router.post('/pushLead/', function(req, res, next) {
  mktoLeads.upsertLead(req.body, function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});


module.exports = router;
