var express = require('express');
var router = express.Router();
var mktoLeads = require('../../repositories/mkto/leads')();

router.get('/getLeadsBy/:type/:value', function(req, res, next) {
  mktoLeads.getLeadsBy(req.params['type'], req.params['value'], function (data) {
      res.send(data);
  });
});
router.post('/upsertLead/', function(req, res, next) {
  mktoLeads.upsertLead(req.body, function (data) {
      res.send(data);
  });
});


module.exports = router;
