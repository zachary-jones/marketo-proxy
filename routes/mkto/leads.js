var express = require('express');
var router = express.Router();
var mktoLeads = require('../../repositories/mkto/leads')();

/**
 * 
 */
router.get('/getLeadsBy/:type/:value', function(req, res, next) {
  mktoLeads.getLeadsBy(req.params['type'], req.params['value'], function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});

/**
 * 
 */
router.post('/upsertLead/', function(req, res, next) {
  mktoLeads.upsertLead(req.body, function (data) {
      res.header("Content-Type",'application/json');            
      res.send(JSON.stringify(data,null,4));
  });
});


module.exports = router;
