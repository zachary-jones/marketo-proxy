var express = require('express');
var router = express.Router();

router.get('/checkStudent/', function(req, res, next) {
    res.render('mulesoft/tests/CheckStudent');
});

module.exports = router;
