var express = require('express');
var router = express.Router();


router.get('/prepop/', function(req, res, next) {
    res.render('mkto_test/mktoCookiePrepop');
});

router.get('/upsertLead/', function(req, res, next) {
    res.render('mkto_test/mktoUpsertLead');
});

module.exports = router;
