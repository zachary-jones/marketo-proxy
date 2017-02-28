var express = require('express');
var router = express.Router();

router.get('/programBuilder/', function(req, res, next) {
    res.render('features/ProgramBuilder');
});

router.get('/API/programBuilder/:id', function(req, res, next) {
    res.render('features/ProgramBuilder');
});

router.get('/MarketoMigration/', function(req, res, next) {
    res.render('features/MarketoMigration');
});

module.exports = router;
