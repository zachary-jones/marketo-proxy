var express = require('express');
var router = express.Router();
var mktoLeads = require('../../repositories/mkto/leads')();

/**
 * Gets lead information by ID, cookie, email. Defaul returned properties set in repository
 */
router.get('/getLeadsBy/:type/:value', function(req, res, next) {
  if((!req.params.type || req.params.type === ':type') || (!req.params.value || req.params.value === ':value')) { res.send('type, value required'); } else {
    mktoLeads.getLeadsBy(req.params.type, req.params.value, req.query.fields, function (data) {
        res.header("Content-Type",'application/json');            
        res.send(JSON.stringify(data,null,4));
    });
  }
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

/**
 * removes leads in array passed in body
 */
router.post('/removeLead/', function(req, res, next) {
  mktoLeads.removeLead(req.body, function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});

module.exports = router;
